<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import QuarterlyPayments from '$src/components/app/QuarterlyPayments.svelte'
  import QuarterlyPay from '$src/components/app/QuarterlyPay.svelte'
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
  import { createBlankPayment } from '$src/utilities/database'  
  import Confirmation from '$src/components/app/Confirmation.svelte'
  import { getAllPaymentValues } from '$src/utilities/database' 
  import { getLocalStorage, setLocalStorage } from '$src/utilities/utilities'
  import { payment } from '$src/data/payment.svelte'
  import { safePostHog } from '$src/utilities/posthog'
  import ReferralBanner from '$src/components/app/ReferralBanner.svelte'

  let headingText = $state()  
  let showExplanation = $state(false)
  let viewText = $state('VIEW DETAILS')
  let pdfContainer = $state(null)
  let showPdf = $state(false)
  let loading = $state(true)
  let showReferralBanner = $state(false)
  
  let federalThisQuarterPayment = $state(0)
  let stateThisQuarterPayment = $state(0)
  
  let taxYear = $state()
  let federalDue = $state()
  let federalPaid = $state()
  let federalRemaining = $state()
  let currentState = $state()
  let stateDue = $state()
  let statePaid = $state()
  let stateRemaining = $state() 
  let federalPayment1 = $state()
  let federalPayment2 = $state()
  let federalPayment3 = $state()
  let federalPayment4 = $state()
  let statePayment1 = $state()
  let statePayment2 = $state()
  let statePayment3 = $state()
  let statePayment4 = $state()
  let explanation = $state()
  let payPreference = $state()
  let quarterName = $state()
  let isFederalPaid = $state()
  let isStatePaid = $state()

  let livingInCurrentStateAllThisYear = $state()
  let q1State = $state()
  let q2State = $state()
  let q3State = $state()
  let q4State = $state()
  let otherStatesToPay = $state()

  onMount(async () => {
    loading = true
    if (!global.loggedIn) {
      setLocalStorage('loginLocation', 'dashboard')
      goto('/login')
    } 
    else { 
      global.makeButtonActive = true

      const paymentValues = await getAllPaymentValues(global.email, currentTaxYear)

      taxYear = paymentValues?.taxYear
      federalDue = paymentValues?.singleFederalDue
      federalPaid = paymentValues?.singleFederalPaid
      federalRemaining = paymentValues?.singleFederalRemaining
      currentState = paymentValues?.currentState

      stateDue = paymentValues?.singleStateDue
      statePaid = paymentValues?.singleStatePaid
      stateRemaining = paymentValues?.singleStateRemaining
      federalPayment1 = paymentValues?.q1federalQuarterlyPayment
      federalPayment2 = paymentValues?.q2federalQuarterlyPayment
      federalPayment3 = paymentValues?.q3federalQuarterlyPayment
      federalPayment4 = paymentValues?.q4federalQuarterlyPayment
      statePayment1 = paymentValues?.q1StateQuarterlyPayment
      statePayment2 = paymentValues?.q2StateQuarterlyPayment
      statePayment3 = paymentValues?.q3StateQuarterlyPayment
      statePayment4 = paymentValues?.q4StateQuarterlyPayment
      explanation = paymentValues?.explanation
      payPreference = paymentValues?.payPreference

      livingInCurrentStateAllThisYear = paymentValues?.livingInCurrentStateAllThisYear
      q1State = paymentValues?.q1State
      q2State = paymentValues?.q2State
      q3State = paymentValues?.q3State
      q4State = paymentValues?.q4State
      otherStatesToPay = paymentValues?.otherStatesToPay
      if (!livingInCurrentStateAllThisYear) {
        if (currentTaxQuarter == 'Q1') {
          currentState = q1State
        }
        else if (currentTaxQuarter == 'Q2') {
          currentState = q2State
        }
        else if (currentTaxQuarter == 'Q3') {
          currentState = q3State
        }
        else if (currentTaxQuarter == 'Q4') {
          currentState = q4State
        }
      }
      global.showPaidDates = paymentValues?.showPaidDates 
      global.q1FederalPaidDate = paymentValues?.q1FederalPaidDate
      global.q2FederalPaidDate = paymentValues?.q2FederalPaidDate
      global.q3FederalPaidDate = paymentValues?.q3FederalPaidDate
      global.q4FederalPaidDate = paymentValues?.q4FederalPaidDate
      global.q1StatePaidDate = paymentValues?.q1StatePaidDate
      global.q2StatePaidDate = paymentValues?.q2StatePaidDate
      global.q3StatePaidDate = paymentValues?.q3StatePaidDate
      global.q4StatePaidDate = paymentValues?.q4StatePaidDate
      global.singleFederalPaidDate = paymentValues?.singleFederalPaidDate
      global.singleStatePaidDate = paymentValues?.singleStatePaidDate

      if (payPreference == 'single') {
        headingText = `Your remaining payment for ${currentTaxYear}`
        isFederalPaid = paymentValues?.singleFederalMarkPaid
        isStatePaid = paymentValues?.singleStateMarkPaid
      }
      else { 
        headingText = `Your quarterly payments for ${currentTaxYear}`
        if (currentTaxQuarter == 'Q1') {
          quarterName = 'April' 
          isFederalPaid = paymentValues?.q1FederalMarkPaid
          isStatePaid = paymentValues?.q1StateMarkPaid
          federalThisQuarterPayment = federalPayment1
          stateThisQuarterPayment = statePayment1
        } 
        else if (currentTaxQuarter == 'Q2') {
          quarterName = 'June'
          isFederalPaid = paymentValues?.q2FederalMarkPaid
          isStatePaid = paymentValues?.q2StateMarkPaid
          federalThisQuarterPayment = federalPayment2
          stateThisQuarterPayment = statePayment2
        } 
        else if (currentTaxQuarter == 'Q3') {    
          quarterName = 'September'
          isFederalPaid = paymentValues?.q3FederalMarkPaid
          isStatePaid = paymentValues?.q3StateMarkPaid
          federalThisQuarterPayment = federalPayment3
          stateThisQuarterPayment = statePayment3
        }
        else if (currentTaxQuarter == 'Q4') {
          quarterName = 'January'
          isFederalPaid = paymentValues?.q4FederalMarkPaid
          isStatePaid = paymentValues?.q4StateMarkPaid 
          federalThisQuarterPayment = federalPayment4
          stateThisQuarterPayment = statePayment4
        }
      }
      loading = false
      showReferralBanner = await user.getValue('showReferralBanner')
      await user.setValue('currentPage', 'dashboard')
      if (getLocalStorage('sendDashboardEmail')) {
        await sendDashboardEmail()
        setLocalStorage('sendDashboardEmail', false)
      }
      safePostHog.capture('flow_dashboard_viewed', {
        pay_preference: payPreference,
      })
    }
  })

  const sendDashboardEmail = async () => {
      await axios.post('/api/email', {
        to: global.email,
        subject: `Your ${currentTaxYear} quarterly taxes are ready`,
        template: 'dashboard'
      })
  }

  const handleEditClick = async () => {
    safePostHog.capture('edit_inputs_clicked')
    goto('/0.5')
    await user.setValue('currentPage', '0.5')
  }

  const handleDownloadClick = async () => {
    safePostHog.capture('download_pdf_clicked')
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
    if (!showExplanation) {
      safePostHog.capture('view_details_clicked')
    }
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
    goto('/1')
    await user.setValue('currentPage', '1')
  }

  const getFederalPayment = () => {
    if (currentTaxQuarter == 'Q1') {
      return federalPayment1
    }
    else if (currentTaxQuarter == 'Q2') {
      return federalPayment2
    }
    else if (currentTaxQuarter == 'Q3') {
      return federalPayment3
    }
    else {
      return federalPayment4
    }
  }

  const getStatePayment = () => {
    if (currentTaxQuarter == 'Q1') {
      return statePayment1
    }
    else if (currentTaxQuarter == 'Q2') {
      return statePayment2
    }
    else if (currentTaxQuarter == 'Q3') {
      return statePayment3
    }
    else {
      return statePayment4
    }
  }

  const handleFederalPaidDateChange = (date) => {
    global.singleFederalPaidDate = date
    payment.setValueByYear(currentTaxYear, 'singleFederalPaidDate', date)
  }

  const handleStatePaidDateChange = (date) => {
    global.singleStatePaidDate = date
    payment.setValueByYear(currentTaxYear, 'singleStatePaidDate', date)
  }

  const handleQ1FederalPaidDateChange = (date) => {
    global.q1FederalPaidDate = date
    payment.setValueByYear(currentTaxYear, 'q1FederalPaidDate', date)
  }

  const handleQ2FederalPaidDateChange = (date) => {
    global.q2FederalPaidDate = date
    payment.setValueByYear(currentTaxYear, 'q2FederalPaidDate', date)
  }

  const handleQ3FederalPaidDateChange = (date) => {
    global.q3FederalPaidDate = date
    payment.setValueByYear(currentTaxYear, 'q3FederalPaidDate', date)
  }

  const handleQ4FederalPaidDateChange = (date) => {
    global.q4FederalPaidDate = date
    payment.setValueByYear(currentTaxYear, 'q4FederalPaidDate', date)
  }

  const handleQ1StatePaidDateChange = (date) => {
    global.q1StatePaidDate = date
    payment.setValueByYear(currentTaxYear, 'q1StatePaidDate', date)
  }

  const handleQ2StatePaidDateChange = (date) => {
    global.q2StatePaidDate = date
    payment.setValueByYear(currentTaxYear, 'q2StatePaidDate', date)
  }

  const handleQ3StatePaidDateChange = (date) => {
    global.q3StatePaidDate = date
    payment.setValueByYear(currentTaxYear, 'q3StatePaidDate', date)
  }

  const handleQ4StatePaidDateChange = (date) => {
    global.q4StatePaidDate = date
    payment.setValueByYear(currentTaxYear, 'q4StatePaidDate', date)
  }

  const handleShowPaidDatesChange = () => {
    global.showPaidDates = !global.showPaidDates
    payment.setValueByYear(currentTaxYear, 'showPaidDates', global.showPaidDates)
  }

  const handleCloseReferralBanner = async () => {
    showReferralBanner = false
    await user.setValue('showReferralBanner', false)
  }

</script>
<Header hideBack={true} hideReset={true} showAccountIcon={true} />
<Avatar /> 
{#if loading}
  <Loading />
{:else}
  {#if global.showConfirmationBanner}
    <Confirmation />
  {/if}
  {#if showReferralBanner}
    <ReferralBanner onclose={handleCloseReferralBanner} />
  {/if}
  {#if taxYear == currentTaxYear}
    <Heading text={headingText} desktopwidth="550px" mobilewidth="275px" />
    {#if payPreference == 'single'}
      <SinglePayments 
        federalDue={federalDue} 
        federalPaid={federalPaid} 
        federalRemaining={federalRemaining} 
        currentState={currentState} 
        stateDue={stateDue} 
        statePaid={statePaid} 
        stateRemaining={stateRemaining} 
        showPaidDates={global.showPaidDates}
        singleFederalPaidDate={global.singleFederalPaidDate}
        singleStatePaidDate={global.singleStatePaidDate}
        onFederalPaidDateChange={handleFederalPaidDateChange}
        onStatePaidDateChange={handleStatePaidDateChange}
        onShowPaidDatesChange={handleShowPaidDatesChange}
      />
    {:else}
      <QuarterlyPayments 
        federalPayment1={federalPayment1} 
        federalPayment2={federalPayment2} 
        federalPayment3={federalPayment3} 
        federalPayment4={federalPayment4} 
        currentState={currentState} 
        statePayment1={statePayment1} 
        statePayment2={statePayment2} 
        statePayment3={statePayment3} 
        statePayment4={statePayment4} 
        showPaidDates={global.showPaidDates}
        q1FederalPaidDate={global.q1FederalPaidDate}
        q2FederalPaidDate={global.q2FederalPaidDate}
        q3FederalPaidDate={global.q3FederalPaidDate}
        q4FederalPaidDate={global.q4FederalPaidDate}
        q1StatePaidDate={global.q1StatePaidDate}
        q2StatePaidDate={global.q2StatePaidDate}
        q3StatePaidDate={global.q3StatePaidDate}
        q4StatePaidDate={global.q4StatePaidDate}
        onQ1FederalPaidDateChange={handleQ1FederalPaidDateChange}
        onQ2FederalPaidDateChange={handleQ2FederalPaidDateChange}
        onQ3FederalPaidDateChange={handleQ3FederalPaidDateChange}
        onQ4FederalPaidDateChange={handleQ4FederalPaidDateChange}
        onQ1StatePaidDateChange={handleQ1StatePaidDateChange}
        onQ2StatePaidDateChange={handleQ2StatePaidDateChange}
        onQ3StatePaidDateChange={handleQ3StatePaidDateChange}
        onQ4StatePaidDateChange={handleQ4StatePaidDateChange}
        onShowPaidDatesChange={handleShowPaidDatesChange}
        livingInCurrentStateAllThisYear={livingInCurrentStateAllThisYear}
        q1State={q1State}
        q2State={q2State}
        q3State={q3State}
        q4State={q4State}
      />
    {/if}
    <Options onEditClick={handleEditClick} onDownloadClick={handleDownloadClick} onViewClick={handleViewClick} viewText={viewText} />
    {#if showExplanation}
      <div transition:fade={{ duration: 300 }}>
        <Explanation explanation={explanation} onCloseClick={handleCloseClick}  />
      </div>
    {/if}
    {#if payPreference == 'single'}
      <SinglePay federalSingleAmount={federalRemaining} currentState={currentState} stateSingleAmount={stateRemaining} isFederalPaid={isFederalPaid} isStatePaid={isStatePaid} />
      <Spacer />
    {:else}
      <QuarterlyPay federalQuarterAmount={getFederalPayment()} currentState={currentState} stateQuarterAmount={getStatePayment()} quarterName={quarterName} isFederalPaid={isFederalPaid} isStatePaid={isStatePaid} otherStatesToPay={otherStatesToPay} />
      <Spacer />
    {/if}
    
    {#if showPdf}
      <div class="pdfcontainer" bind:this={pdfContainer}>
        <Pdf 
          taxYear={currentTaxYear}
          payPreference={payPreference}
          federalDue={federalDue} 
          federalPaid={federalPaid} 
          federalRemaining={federalRemaining} 
          currentState={currentState} 
          stateDue={stateDue} 
          statePaid={statePaid} 
          stateRemaining={stateRemaining} 
          federalPayment1={federalPayment1} 
          federalPayment2={federalPayment2} 
          federalPayment3={federalPayment3} 
          federalPayment4={federalPayment4} 
          statePayment1={statePayment1} 
          statePayment2={statePayment2} 
          statePayment3={statePayment3} 
          statePayment4={statePayment4} 
          explanation={explanation}
          showPaidDates={global.showPaidDates}
          singleFederalPaidDate={global.singleFederalPaidDate}
          singleStatePaidDate={global.singleStatePaidDate}
          q1FederalPaidDate={global.q1FederalPaidDate}
          q2FederalPaidDate={global.q2FederalPaidDate}
          q3FederalPaidDate={global.q3FederalPaidDate}
          q4FederalPaidDate={global.q4FederalPaidDate}
          q1StatePaidDate={global.q1StatePaidDate}  
          q2StatePaidDate={global.q2StatePaidDate}
          q3StatePaidDate={global.q3StatePaidDate}
          q4StatePaidDate={global.q4StatePaidDate}
          livingInCurrentStateAllThisYear={livingInCurrentStateAllThisYear}
          q1State={q1State}
          q2State={q2State}
          q3State={q3State}
          q4State={q4State}
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