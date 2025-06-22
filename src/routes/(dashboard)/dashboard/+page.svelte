<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import QuarterlyPayments from '$src/components/app/QuarterlyPayments.svelte'
  import QuarterlyPay from '$src/components/app/QuarterlyPay.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import Spacer from '$src/components/app/Spacer.svelte'
  import Options from '$src/components/app/Options.svelte'
  import Explanation from '$src/components/app/Explanation.svelte'
  import { fade } from 'svelte/transition'
  import Pdf from '$src/components/app/Pdf.svelte'
  import { tick } from 'svelte'
  import html2canvas from 'html2canvas'
  import { jsPDF } from 'jspdf'
  import SinglePayments from '$src/components/app/SinglePayments.svelte'
  import SinglePay from '$src/components/app/SinglePay.svelte'
  import axios from 'axios'
  import { currentTaxYear, currentTaxQuarter } from '$src/settings/settings'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { user } from '$src/data/user.svelte'  
  import Loading from '$src/components/app/Loading.svelte'  
  import { clearLocalStorage } from '$src/utilities/utilities'
  import { createBlankPayment } from '$src/utilities/database'

  let headingText = $state()
  let showExplanation = $state(false)
  let viewText = $state('VIEW DETAILS')
  let pdfContainer = $state(null)
  let showPdf = $state(false)
  let loading = $state(true)
  
  let federalThisQuarterPayment = $state(0)
  let stateThisQuarterPayment = $state(0)
  
  let taxYear = $state()
  let singleFederalDue = $state()
  let singleFederalPaid = $state()
  let singleFederalRemaining = $state()
  let stateSupported = $state()
  let currentState = $state()
  let singleStateDue = $state()
  let singleStatePaid = $state()
  let singleStateRemaining = $state() 
  let q1federalQuarterlyPayment = $state()
  let q2federalQuarterlyPayment = $state()
  let q3federalQuarterlyPayment = $state()
  let q4federalQuarterlyPayment = $state()
  let q1StateQuarterlyPayment = $state()
  let q2StateQuarterlyPayment = $state()
  let q3StateQuarterlyPayment = $state()
  let q4StateQuarterlyPayment = $state()
  let explanation = $state()
  let payPreference = $state()
  let quarterName = $state()
  let isFederalPaid = $state()
  let isStatePaid = $state()
  
  onMount(async () => {
    loading = true
    clearLocalStorage()
    user.setValue('currentPage', 'dashboard')
    global.makeButtonActive = true

    taxYear = await payment.getValue('taxYear')
    singleFederalDue = await payment.getValue('singleFederalDue')
    singleFederalPaid = await payment.getValue('singleFederalPaid')
    singleFederalRemaining = await payment.getValue('singleFederalRemaining')
    stateSupported = await payment.getValue('stateSupported')
    currentState = await payment.getValue('currentState')
    singleStateDue = await payment.getValue('singleStateDue')
    singleStatePaid = await payment.getValue('singleStatePaid')
    singleStateRemaining = await payment.getValue('singleStateRemaining')
    q1federalQuarterlyPayment = await payment.getValue('q1federalQuarterlyPayment')
    q2federalQuarterlyPayment = await payment.getValue('q2federalQuarterlyPayment')
    q3federalQuarterlyPayment = await payment.getValue('q3federalQuarterlyPayment')
    q4federalQuarterlyPayment = await payment.getValue('q4federalQuarterlyPayment')
    q1StateQuarterlyPayment = await payment.getValue('q1StateQuarterlyPayment')
    q2StateQuarterlyPayment = await payment.getValue('q2StateQuarterlyPayment')
    q3StateQuarterlyPayment = await payment.getValue('q3StateQuarterlyPayment')
    q4StateQuarterlyPayment = await payment.getValue('q4StateQuarterlyPayment')
    explanation = await payment.getValue('explanation')
    payPreference = await payment.getValue('payPreference')

    if (payPreference == 'single') {
      isFederalPaid = await payment.getValue('singleFederalMarkPaid')
      isStatePaid = await payment.getValue('singleStateMarkPaid')
    }
    else { 
      if (currentTaxQuarter == 'Q1') {
        quarterName = 'April' 
        isFederalPaid = await payment.getValue('q1FederalMarkPaid')
        isStatePaid = await payment.getValue('q1StateMarkPaid')
      } 
      else if (currentTaxQuarter == 'Q2') {
        quarterName = 'June'
        isFederalPaid = await payment.getValue('q2FederalMarkPaid')
        isStatePaid = await payment.getValue('q2StateMarkPaid')
      } 
      else if (currentTaxQuarter == 'Q3') {    
        quarterName = 'September'
        isFederalPaid = await payment.getValue('q3FederalMarkPaid')
        isStatePaid = await payment.getValue('q3StateMarkPaid')
      }
      else if (currentTaxQuarter == 'Q4') {
        quarterName = 'January'
        isFederalPaid = await payment.getValue('q4FederalMarkPaid')
        isStatePaid = await payment.getValue('q4StateMarkPaid')
      }
    }

    if (payPreference == 'single') {
      headingText = `Your remaining payment for ${currentTaxYear}`
    }
    else {
      headingText = `Your quarterly payments for ${currentTaxYear}`
      if (currentTaxQuarter == 'Q1') {
        federalThisQuarterPayment = q1federalQuarterlyPayment
        stateThisQuarterPayment = q1StateQuarterlyPayment
      }
      else if (currentTaxQuarter == 'Q2') {
        federalThisQuarterPayment = q2federalQuarterlyPayment
        stateThisQuarterPayment = q2StateQuarterlyPayment
      } 
      else if (currentTaxQuarter == 'Q3') {
        federalThisQuarterPayment = q3federalQuarterlyPayment
        stateThisQuarterPayment = q3StateQuarterlyPayment
          }
      else {
        federalThisQuarterPayment = q4federalQuarterlyPayment
        stateThisQuarterPayment = q4StateQuarterlyPayment
      }
    }
    loading = false
    if (await user.getValue('sendDashboardEmail')) {
      sendDashboardEmail()
      await user.setValue('sendDashboardEmail', false)
    }
  })

  const sendDashboardEmail = async () => {
      await axios.post('/api/email', {
        to: global.email,
        subject: `Your ${currentTaxYear} quarterly taxes are ready`,
        template: 'dashboard'
      })
  }

  const handleEditClick = () => {
    user.setValue('currentPage', '0.5')
    goto('/0.5')
  }

  const handleDownloadClick = async () => {
    showPdf = true
    await tick()
    const canvas = await html2canvas(pdfContainer, {scale: 2})
    const imageData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({orientation: 'portrait',unit: 'pt', format: 'letter' })    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`Quarterly Payments for ${currentTaxYear}.pdf`)
    showPdf = false
  }

  const handleViewClick = () => {
    showExplanation = !showExplanation
    if (showExplanation) {
      viewText = 'HIDE DETAILS'
    }
    else {
      viewText = 'VIEW DETAILS'
    }
  }

  const handleCloseClick = () => {
    showExplanation = false
    viewText = 'VIEW DETAILS'
  }

  const handleStart = async () => {
    await createBlankPayment()
    user.setValue('currentPage', '1')
    goto('/1')
  }

  const getFederalPayment = () => {
    if (currentTaxQuarter == 'Q1') {
      return q1federalQuarterlyPayment
    }
    else if (currentTaxQuarter == 'Q2') {
      return q2federalQuarterlyPayment
    }
    else if (currentTaxQuarter == 'Q3') {
      return q3federalQuarterlyPayment
    }
    else {
      return q4federalQuarterlyPayment
    }
  }

  const getStatePayment = () => {
    if (currentTaxQuarter == 'Q1') {
      return q1StateQuarterlyPayment
    }
    else if (currentTaxQuarter == 'Q2') {
      return q2StateQuarterlyPayment
    }
    else if (currentTaxQuarter == 'Q3') {
      return q3StateQuarterlyPayment
    }
    else {
      return q4StateQuarterlyPayment
    }
  }

</script>
<Header hideBack={true} hideReset={true} showAccountIcon={true} />
<Avatar /> 
{#if loading}
  <Loading />
{:else}
  {#if taxYear == currentTaxYear}
    <Heading text={headingText} desktopwidth="550px" mobilewidth="275px" />
    {#if payPreference == 'single'}
      <SinglePayments 
        federalDue={singleFederalDue} 
        federalPaid={singleFederalPaid} 
        federalRemaining={singleFederalRemaining} 
        showState={stateSupported} 
        stateName={currentState} 
        stateDue={singleStateDue} 
        statePaid={singleStatePaid} 
        stateRemaining={singleStateRemaining} 
      />
    {:else}
      <QuarterlyPayments 
        federalPayment1={q1federalQuarterlyPayment} 
        federalPayment2={q2federalQuarterlyPayment} 
        federalPayment3={q3federalQuarterlyPayment} 
        federalPayment4={q4federalQuarterlyPayment} 
        showState={stateSupported} 
        stateName={currentState} 
        statePayment1={q1StateQuarterlyPayment} 
        statePayment2={q2StateQuarterlyPayment} 
        statePayment3={q3StateQuarterlyPayment} 
        statePayment4={q4StateQuarterlyPayment} 
      />
    {/if}
    <Options onEditClick={handleEditClick} onDownloadClick={handleDownloadClick} onViewClick={handleViewClick} viewText={viewText} />
    {#if showExplanation}
      <div transition:fade={{ duration: 300 }}>
        <Explanation explanation={explanation} onCloseClick={handleCloseClick}  />
      </div>
    {/if}
    {#if payPreference == 'single'}
      {#if stateSupported && currentState}
        <SinglePay federalSingleAmount={singleFederalRemaining} showState={true} stateName={currentState} stateSingleAmount={singleStateRemaining} isFederalPaid={isFederalPaid} isStatePaid={isStatePaid} />
      {:else}
        <SinglePay federalSingleAmount={singleFederalRemaining} showState={false} isFederalPaid={isFederalPaid} isStatePaid={isStatePaid} />
      {/if}
      <Spacer />
    {:else}
      {#if stateSupported && currentState}
        <QuarterlyPay federalQuarterAmount={getFederalPayment()} showState={true} stateName={currentState} stateQuarterAmount={getStatePayment()} quarterName={quarterName} isFederalPaid={isFederalPaid} isStatePaid={isStatePaid} />
      {:else}
        <QuarterlyPay federalQuarterAmount={getFederalPayment()} showState={false} quarterName={quarterName} isFederalPaid={isFederalPaid} isStatePaid={isStatePaid} />
      {/if}     
      <Spacer />
    {/if}
    {#if showPdf}
    <div class="pdfcontainer" bind:this={pdfContainer}>
      <Pdf 
        federalDue={singleFederalDue} 
        federalPaid={singleFederalPaid} 
        federalRemaining={singleFederalRemaining} 
        showState={stateSupported} 
        stateName={currentState} 
        stateDue={singleStateDue} 
        statePaid={singleStatePaid} 
        stateRemaining={singleStateRemaining} 
        federalPayment1={q1federalQuarterlyPayment} 
        federalPayment2={q2federalQuarterlyPayment} 
        federalPayment3={q3federalQuarterlyPayment} 
        federalPayment4={q4federalQuarterlyPayment} 
        statePayment1={q1StateQuarterlyPayment} 
        statePayment2={q2StateQuarterlyPayment} 
        statePayment3={q3StateQuarterlyPayment} 
        statePayment4={q4StateQuarterlyPayment} 
        explanation={explanation}
      /> 
    </div>
    {/if}
  {:else}
    <Heading text={`Let's get your tax payments for ${currentTaxYear}`} desktopwidth="600px" mobilewidth="275px" />
    <Subheading text={`I'll guide you through the whole process`} desktopwidth="600px" mobilewidth="275px" />
      <Button text={'START NOW'} onclick={handleStart} />
  {/if}   
{/if}

<style>
  .pdfcontainer {
    position: absolute;
    top: -9999px;
    left: 0;
    width: 800px;
  }
</style>