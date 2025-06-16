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

  let headingText = $state()
  let showExplanation = $state(false)
  let viewText = $state('VIEW DETAILS')
  let pdfContainer = $state(null)
  let showPdf = $state(false)
  
  let federalThisQuarterPayment = $state(0)
  let stateThisQuarterPayment = $state(0)

  onMount(async () => {
    saveDatabaseToLocalStorage()
    store.active = true
    if (store.payPreference == 'single') {
      headingText = `Your remaining payment for ${store.currentYear}`
    }
    else {
      headingText = `Your quarterly payments for ${store.currentYear}`
      if (store.currentQuarter == 'Q1') {
        federalThisQuarterPayment = store.q1federalQuarterlyPayment
        stateThisQuarterPayment = store.q1StateQuarterlyPayment
      }
      else if (store.currentQuarter == 'Q2') {
        federalThisQuarterPayment = store.q2federalQuarterlyPayment
        stateThisQuarterPayment = store.q2StateQuarterlyPayment
      } 
      else if (store.currentQuarter == 'Q3') {
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
  })

  const sendDashboardEmail = async () => {
      await axios.post('/api/email', {
        to: store.email,
        year: store.currentYear,
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
    pdf.save(`Quarterly Payments for ${store.currentYear}.pdf`)
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

<Header hideBack={true} hideReset={true} />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilewidth="275px" />
{#if store.payPreference == 'single'}
  <SinglePayments 
    federalDue={store.singleFederalDue} 
    federalPaid={store.singleFederalPaid} 
    federalRemaining={store.singleFederalRemaining} 
    showState={store.stateSupported} 
    stateName={store.currentState} 
    stateDue={store.singleStateDue} 
    statePaid={store.singleStatePaid} 
    stateRemaining={store.singleStateRemaining} 
  />
{:else}
  <QuarterlyPayments 
    federalPayment1={store.q1federalQuarterlyPayment} 
    federalPayment2={store.q2federalQuarterlyPayment} 
    federalPayment3={store.q3federalQuarterlyPayment} 
    federalPayment4={store.q4federalQuarterlyPayment} 
    showState={store.stateSupported} 
    stateName={store.currentState} 
    statePayment1={store.q1StateQuarterlyPayment} 
    statePayment2={store.q2StateQuarterlyPayment} 
    statePayment3={store.q3StateQuarterlyPayment} 
    statePayment4={store.q4StateQuarterlyPayment} 
  />
{/if}
<Options onEditClick={handleEditClick} onDownloadClick={handleDownloadClick} onViewClick={handleViewClick} viewText = {viewText} />
{#if showExplanation}
  <div transition:fade={{ duration: 300 }}>
    <Explanation onCloseClick={handleCloseClick} />
  </div>
{/if}

{#if store.payPreference == 'single'}
  {#if store.stateSupported && store.currentState}
    <SinglePay federalSingleAmount={store.singleFederalRemaining} showState={true} stateName={store.currentState} stateSingleAmount={store.singleStateRemaining} />
  {:else}
    <SinglePay federalSingleAmount={store.singleFederalRemaining} showState={false} />
  {/if}
  <Spacer />
{:else}
  {#if store.stateSupported && store.currentState}
    <QuarterlyPay federalQuarterAmount={federalThisQuarterPayment} showState={true} stateName={store.currentState} stateQuarterAmount={stateThisQuarterPayment} />
  {:else}
    <QuarterlyPay federalQuarterAmount={federalThisQuarterPayment} showState={false} />
  {/if}     
  <Spacer />
{/if}

{#if showPdf}
<div class="pdfcontainer" bind:this={pdfContainer}>
  <Pdf /> 
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