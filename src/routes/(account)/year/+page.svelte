<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'  
  import { global } from '$src/data/global.svelte'  
  import { goto } from '$app/navigation'  
  import { onMount, tick } from 'svelte'
  import { page } from '$app/stores'
  import PriorYear from '$src/components/app/PriorYear.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import Pdf from '$src/components/app/Pdf.svelte'
  import html2canvas from 'html2canvas'
  import { jsPDF } from 'jspdf'
  import { getAllPaymentValues } from '$src/utilities/database'
  import { payment } from '$src/data/payment.svelte'

  let headingText = $state('')
  global.makeButtonActive = false
  let loading = $state(true)
  let showPdf = $state(false)
  let pdfContainer = $state(null)

  let year = $state('')
  let payPreference = $state('')
  let federalDue = $state(0)
  let federalPaid = $state(0)
  let federalRemaining = $state(0)
  let stateSupported = $state(false)
  let currentState = $state('')
  let stateDue = $state(0)
  let statePaid = $state(0) 
  let stateRemaining = $state(0)
  let federalPayment1 = $state(0)
  let federalPayment2 = $state(0)
  let federalPayment3 = $state(0)
  let federalPayment4 = $state(0)
  let statePayment1 = $state(0) 
  let statePayment2 = $state(0)
  let statePayment3 = $state(0)
  let statePayment4 = $state(0)
  let explanation = $state('')

  let showPaidDates = $state(false)
  let q1FederalPaidDate = $state('')
  let q2FederalPaidDate = $state('')
  let q3FederalPaidDate = $state('')
  let q4FederalPaidDate = $state('')
  let q1StatePaidDate = $state('')
  let q2StatePaidDate = $state('')
  let q3StatePaidDate = $state('')
  let q4StatePaidDate = $state('')
  let singleFederalPaidDate = $state('')
  let singleStatePaidDate = $state('')

  onMount(async () => {
    loading = true
    if (!global.loggedIn) {
      goto('/')
    } 
    year = $page.url.searchParams.get('year')
    const paymentValues = await getAllPaymentValues(global.email, year)
    payPreference = paymentValues?.payPreference
    if (payPreference == 'single') {
      headingText = `Your single payments for ${year}` 
    }
    else { 
      headingText = `Your quarterly payments for ${year}` 
    }
    federalDue = paymentValues?.singleFederalDue
    federalPaid = paymentValues?.singleFederalPaid
    federalRemaining = paymentValues?.singleFederalRemaining
    stateSupported = paymentValues?.stateSupported
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

    showPaidDates = paymentValues?.showPaidDates
    q1FederalPaidDate = paymentValues?.q1FederalPaidDate  
    q2FederalPaidDate = paymentValues?.q2FederalPaidDate
    q3FederalPaidDate = paymentValues?.q3FederalPaidDate
    q4FederalPaidDate = paymentValues?.q4FederalPaidDate
    q1StatePaidDate = paymentValues?.q1StatePaidDate
    q2StatePaidDate = paymentValues?.q2StatePaidDate
    q3StatePaidDate = paymentValues?.q3StatePaidDate
    q4StatePaidDate = paymentValues?.q4StatePaidDate
    singleFederalPaidDate = paymentValues?.singleFederalPaidDate
    singleStatePaidDate = paymentValues?.singleStatePaidDate      

    loading = false
  })

  const handleFederalPaidDateChange = (date) => {
    singleFederalPaidDate = date
    payment.setValueByYear(year, 'singleFederalPaidDate', date)
  }

  const handleStatePaidDateChange = (date) => {
    singleStatePaidDate = date
    payment.setValueByYear(year, 'singleStatePaidDate', date)
  }

  const handleQ1FederalPaidDateChange = (date) => {
    q1FederalPaidDate = date
    payment.setValueByYear(year, 'q1FederalPaidDate', date)
  }

  const handleQ2FederalPaidDateChange = (date) => {
    q2FederalPaidDate = date
    payment.setValueByYear(year, 'q2FederalPaidDate', date)
  }

  const handleQ3FederalPaidDateChange = (date) => {
    q3FederalPaidDate = date
    payment.setValueByYear(year, 'q3FederalPaidDate', date)
  }

  const handleQ4FederalPaidDateChange = (date) => {
    q4FederalPaidDate = date
    payment.setValueByYear(year, 'q4FederalPaidDate', date)
  }

  const handleQ1StatePaidDateChange = (date) => {
    q1StatePaidDate = date
    payment.setValueByYear(year, 'q1StatePaidDate', date)
  }

  const handleQ2StatePaidDateChange = (date) => {
    q2StatePaidDate = date
    payment.setValueByYear(year, 'q2StatePaidDate', date)
  }

  const handleQ3StatePaidDateChange = (date) => {
    q3StatePaidDate = date
    payment.setValueByYear(year, 'q3StatePaidDate', date)
  }

  const handleQ4StatePaidDateChange = (date) => {
    q4StatePaidDate = date
    payment.setValueByYear(year, 'q4StatePaidDate', date)
  }

  const handleShowPaidDatesChange = () => {
    showPaidDates = !showPaidDates
    payment.setValueByYear(year, 'showPaidDates', showPaidDates)
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
    pdf.save(`Quarterly Payments for ${year}.pdf`)
    showPdf = false
  }

</script>
<Header showAccountIcon={true} showDownload={true} ondownloadclick={handleDownloadClick} />
<Avatar />
{#if loading}
  <Loading />
{:else}
  <Heading text={headingText} desktopwidth="550px" mobilewidth="250px" />
  <PriorYear 
    payPreference={payPreference} 
    federalDue={federalDue} 
    federalPaid={federalPaid} 
    federalRemaining={federalRemaining} 
    stateSupported={stateSupported} 
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
    showPaidDates={showPaidDates}
    q1FederalPaidDate={q1FederalPaidDate}
    q2FederalPaidDate={q2FederalPaidDate}
    q3FederalPaidDate={q3FederalPaidDate}
    q4FederalPaidDate={q4FederalPaidDate}
    q1StatePaidDate={q1StatePaidDate}
    q2StatePaidDate={q2StatePaidDate}
    q3StatePaidDate={q3StatePaidDate}
    q4StatePaidDate={q4StatePaidDate}
    singleFederalPaidDate={singleFederalPaidDate}
    singleStatePaidDate={singleStatePaidDate}
    onFederalPaidDateChange={handleFederalPaidDateChange}
    onStatePaidDateChange={handleStatePaidDateChange}
    onQ1FederalPaidDateChange={handleQ1FederalPaidDateChange}
    onQ2FederalPaidDateChange={handleQ2FederalPaidDateChange}
    onQ3FederalPaidDateChange={handleQ3FederalPaidDateChange}
    onQ4FederalPaidDateChange={handleQ4FederalPaidDateChange}
    onQ1StatePaidDateChange={handleQ1StatePaidDateChange}
    onQ2StatePaidDateChange={handleQ2StatePaidDateChange}
    onQ3StatePaidDateChange={handleQ3StatePaidDateChange} 
    onQ4StatePaidDateChange={handleQ4StatePaidDateChange}
    onShowPaidDatesChange={handleShowPaidDatesChange}
  />    
{/if}

{#if showPdf}
<div class="pdfcontainer" bind:this={pdfContainer}>
  <Pdf 
    payPreference={payPreference}
    federalDue={federalDue} 
    federalPaid={federalPaid} 
    federalRemaining={federalRemaining} 
    stateSupported={stateSupported} 
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
    showPaidDates={showPaidDates}
    q1FederalPaidDate={q1FederalPaidDate}
    q2FederalPaidDate={q2FederalPaidDate}
    q3FederalPaidDate={q3FederalPaidDate}
    q4FederalPaidDate={q4FederalPaidDate}
    q1StatePaidDate={q1StatePaidDate}
    q2StatePaidDate={q2StatePaidDate}
    q3StatePaidDate={q3StatePaidDate}
    q4StatePaidDate={q4StatePaidDate}
    singleFederalPaidDate={singleFederalPaidDate}
    singleStatePaidDate={singleStatePaidDate}
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