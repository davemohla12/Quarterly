<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import QuarterlyPayments from '$src/components/app/QuarterlyPayments.svelte'
  import QuarterlyPay from '$src/components/app/QuarterlyPay.svelte'
  import { global } from '$src/data/global.svelte'
  import { onMount } from 'svelte'
  import Spacer from '$src/components/app/Spacer.svelte'
  import Options from '$src/components/app/Options.svelte'
  import Explanation from '$src/components/app/Explanation.svelte'
  import { fade } from 'svelte/transition'
  import Pdf from '$src/components/app/Pdf.svelte'
  import { tick } from 'svelte'
  import html2canvas from 'html2canvas'
  import { jsPDF } from 'jspdf'
  import { currentTaxYear } from '$src/settings/settings'
  import { safePostHog } from '$src/utilities/posthog'
  import ExampleBanner from '$src/components/app/ExampleBanner.svelte'

  let headingText = `Your quarterly payments for ${currentTaxYear}`
  let showExplanation = $state(false)
  let viewText = $state('VIEW DETAILS')
  let pdfContainer = $state(null)
  let showPdf = $state(false)
  
  let stateSupported = $state(true)
  let currentState = $state('california')
  let federalPayment1 = $state(1200)
  let federalPayment2 = $state(1200)
  let federalPayment3 = $state(1200)
  let federalPayment4 = $state(1200)
  let statePayment1 = $state(600)
  let statePayment2 = $state(600)
  let statePayment3 = $state(340)
  let statePayment4 = $state(660)
  let explanation = $state(`For your federal payments, we can use federal safe harbor rules to minimize the quarterly taxes you pay while preventing penalties. Since your income is expected to increase this year, we can use the amount you paid in taxes last year to determine your quarterly payments this year. Per federal tax rules, given your income, you can pay $4,800 in total quarterly payments with no penalty, which is 100% of $4,800, which is what you paid last year in taxes. You've paid $1,200 in April and $1,200 in June. For September, federal tax rules require you to have paid 75% of your total payment and if we subtract your April and June payments, we get a September payment of $1,200. For January, federal tax rules require you to have paid 100% of your total payment and if we subtract your April, June, and September payments, we get a January payment of $1,200. Note that the federal payments assume you are not a farmer, fisherman, or subject to annualized income installment rules. Special payment schedules may apply in those cases. \n \n For your California payments, we can use California safe harbor rules to minimize the quarterly taxes you pay while preventing penalties. Since your income is expected to increase this year and California supports it, we can use the amount you paid in taxes last year to determine your quarterly payments this year. Per California tax rules, given your income, you can pay $2,200 in total quarterly payments with no penalty, which is 100% of $2,200, which is what you paid last year in California taxes. You've paid $600 in April and $600 in June. For September, California tax rules require you to have paid 70% of your total payment and if we subtract your April and June payments, we get a September payment of $340. For January, California tax rules require you to have paid 100% of your total payment and if we subtract your April, June, and September payments, we get a January payment of $660.`)
  let payPreference = $state('quarterly')
  let quarterName = $state('September')
  let isFederalPaid = $state(false)
  let isStatePaid = $state(false)
  let livingInCurrentStateAllThisYear = $state(true)

  onMount(async () => {
    global.showPaidDates = true
    global.q1FederalPaidDate = '2025-04-12'
    global.q2FederalPaidDate = '2025-06-14'
    global.q1StatePaidDate = '2025-04-12'
    global.q2StatePaidDate = '2025-06-14'
  })

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

  const getFederalPayment = () => {
    return federalPayment3
  }

  const getStatePayment = () => {
    return statePayment3
  }

  const handleQ1FederalPaidDateChange = (date) => {
    global.q1FederalPaidDate = date
  }

  const handleQ2FederalPaidDateChange = (date) => {
    global.q2FederalPaidDate = date
  }

  const handleQ3FederalPaidDateChange = (date) => {
    global.q3FederalPaidDate = date
  }

  const handleQ4FederalPaidDateChange = (date) => {
    global.q4FederalPaidDate = date
  }

  const handleQ1StatePaidDateChange = (date) => {
    global.q1StatePaidDate = date
  }

  const handleQ2StatePaidDateChange = (date) => {
    global.q2StatePaidDate = date
  }

  const handleQ3StatePaidDateChange = (date) => {
    global.q3StatePaidDate = date
  }

  const handleQ4StatePaidDateChange = (date) => {
    global.q4StatePaidDate = date
  }

  const handleShowPaidDatesChange = () => {
    global.showPaidDates = !global.showPaidDates
  }

</script>
<Header hideBack={true} hideReset={true} showAccountIcon={true} />
<Avatar /> 
<ExampleBanner />
<Heading text={headingText} desktopwidth="550px" mobilewidth="275px" />
  <QuarterlyPayments 
    federalPayment1={federalPayment1} 
    federalPayment2={federalPayment2} 
    federalPayment3={federalPayment3} 
    federalPayment4={federalPayment4} 
    stateSupported={stateSupported} 
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
  />
<Options hideEdit={true} onDownloadClick={handleDownloadClick} onViewClick={handleViewClick} viewText={viewText} />
{#if showExplanation}
  <div transition:fade={{ duration: 300 }}>
    <Explanation explanation={explanation} onCloseClick={handleCloseClick}  />
  </div>
{/if}
<QuarterlyPay federalQuarterAmount={getFederalPayment()} stateSupported={true} currentState={currentState} stateQuarterAmount={getStatePayment()} quarterName={quarterName} isFederalPaid={isFederalPaid} isStatePaid={isStatePaid} />  
<Spacer />

  
{#if showPdf}
  <div class="pdfcontainer" bind:this={pdfContainer}>
    <Pdf 
      taxYear={currentTaxYear}
      showBanner={true}
      payPreference={payPreference}
      currentState={currentState} 
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
      q1FederalPaidDate={global.q1FederalPaidDate}
      q2FederalPaidDate={global.q2FederalPaidDate}
      q3FederalPaidDate={global.q3FederalPaidDate}
      q4FederalPaidDate={global.q4FederalPaidDate}
      q1StatePaidDate={global.q1StatePaidDate}  
      q2StatePaidDate={global.q2StatePaidDate}
      q3StatePaidDate={global.q3StatePaidDate}
      q4StatePaidDate={global.q4StatePaidDate}
      livingInCurrentStateAllThisYear={livingInCurrentStateAllThisYear}
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