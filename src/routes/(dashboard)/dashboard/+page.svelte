<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import QuarterlyPayments from '$src/components/app/QuarterlyPayments.svelte'
  import QuarterlyPay from '$src/components/app/QuarterlyPay.svelte'
  import { store } from '$src/stores/store.svelte'
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
  import { saveDatabaseToLocalStorage } from '$src/utilities/database'
  import { currentYear } from '$src/settings/settings'

  let headingText = $state()
  let showExplanation = $state(false)
  let viewText = $state('VIEW DETAILS')
  let pdfContainer = $state(null)
  let showPdf = $state(false)
  
  let federalThisQuarterPayment = $state(0)
  let stateThisQuarterPayment = $state(0)

  let singleFederalDue = $state(store.singleFederalDue)
  let singleFederalPaid = $state(store.singleFederalPaid)
  let singleFederalRemaining = $state(store.singleFederalRemaining)
  let showState = $state(store.stateSupported)
  let stateName = $state(store.currentState)
  let singleStateDue = $state(store.singleStateDue)
  let singleStatePaid = $state(store.singleStatePaid)
  let singleStateRemaining = $state(store.singleStateRemaining) 
  let q1federalQuarterlyPayment = $state(store.q1federalQuarterlyPayment)
  let q2federalQuarterlyPayment = $state(store.q2federalQuarterlyPayment)
  let q3federalQuarterlyPayment = $state(store.q3federalQuarterlyPayment)
  let q4federalQuarterlyPayment = $state(store.q4federalQuarterlyPayment)
  let q1StateQuarterlyPayment = $state(store.q1StateQuarterlyPayment)
  let q2StateQuarterlyPayment = $state(store.q2StateQuarterlyPayment)
  let q3StateQuarterlyPayment = $state(store.q3StateQuarterlyPayment)
  let q4StateQuarterlyPayment = $state(store.q4StateQuarterlyPayment)
  let explanation = $state(store.explanation)
  import { currentQuarter } from '$src/settings/settings'

  onMount(async () => {
    store.active = true
    if (store.payPreference == 'single') {
      headingText = `Your remaining payment for ${currentYear}`
    }
    else {
      headingText = `Your quarterly payments for ${currentYear}`
      if (currentQuarter == 'Q1') {
        federalThisQuarterPayment = store.q1federalQuarterlyPayment
        stateThisQuarterPayment = store.q1StateQuarterlyPayment
      }
      else if (currentQuarter == 'Q2') {
        federalThisQuarterPayment = store.q2federalQuarterlyPayment
        stateThisQuarterPayment = store.q2StateQuarterlyPayment
      } 
      else if (currentQuarter == 'Q3') {
        federalThisQuarterPayment = store.q3federalQuarterlyPayment
        stateThisQuarterPayment = store.q3StateQuarterlyPayment
          }
      else {
        federalThisQuarterPayment = store.q4federalQuarterlyPayment
        stateThisQuarterPayment = store.q4StateQuarterlyPayment
      }
    }
    if (store.sendDashboardEmail) {
      store.sendDashboardEmail = false
      sendDashboardEmail()
    }
    await saveDatabaseToLocalStorage()
    singleFederalDue = store.singleFederalDue
    singleFederalPaid = store.singleFederalPaid
    singleFederalRemaining = store.singleFederalRemaining
    showState = store.stateSupported
    stateName = store.currentState
    singleStateDue = store.singleStateDue
    singleStatePaid = store.singleStatePaid
    singleStateRemaining = store.singleStateRemaining
    q1federalQuarterlyPayment = store.q1federalQuarterlyPayment
    q2federalQuarterlyPayment = store.q2federalQuarterlyPayment
    q3federalQuarterlyPayment = store.q3federalQuarterlyPayment
    q4federalQuarterlyPayment = store.q4federalQuarterlyPayment
    q1StateQuarterlyPayment = store.q1StateQuarterlyPayment
    q2StateQuarterlyPayment = store.q2StateQuarterlyPayment
    q3StateQuarterlyPayment = store.q3StateQuarterlyPayment
    q4StateQuarterlyPayment = store.q4StateQuarterlyPayment
    explanation = store.explanation
  })

  const sendDashboardEmail = async () => {
      await axios.post('/api/email', {
        to: store.email,
        subject: `Your ${currentYear} quarterly taxes are ready`,
        template: 'dashboard'
      })
  }

  const handleEditClick = () => {
    store.currentPage = '0.5'
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
    pdf.save(`Quarterly Payments for ${currentYear}.pdf`)
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
</script>

<Header hideBack={true} hideReset={true} showDashboardOption={true} />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilewidth="275px" />
{#if store.payPreference == 'single'}
  <SinglePayments 
    federalDue={singleFederalDue} 
    federalPaid={singleFederalPaid} 
    federalRemaining={singleFederalRemaining} 
    showState={showState} 
    stateName={stateName} 
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
    showState={showState} 
    stateName={stateName} 
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

{#if store.payPreference == 'single'}
  {#if store.stateSupported && store.currentState}
    <SinglePay federalSingleAmount={singleFederalRemaining} showState={true} stateName={stateName} stateSingleAmount={singleStateRemaining} />
  {:else}
    <SinglePay federalSingleAmount={singleFederalRemaining} showState={false} />
  {/if}
  <Spacer />
{:else}
  {#if store.stateSupported && store.currentState}
    <QuarterlyPay federalQuarterAmount={q1federalQuarterlyPayment} showState={true} stateName={stateName} stateQuarterAmount={q1StateQuarterlyPayment} />
  {:else}
    <QuarterlyPay federalQuarterAmount={q1federalQuarterlyPayment} showState={false} />
  {/if}     
  <Spacer />
{/if}

{#if showPdf}
<div class="pdfcontainer" bind:this={pdfContainer}>
  <Pdf 
    federalDue={singleFederalDue} 
    federalPaid={singleFederalPaid} 
    federalRemaining={singleFederalRemaining} 
    showState={showState} 
    stateName={stateName} 
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

<style>
  .pdfcontainer {
    position: absolute;
    top: -9999px;
    left: 0;
    width: 800px;
  }
</style>