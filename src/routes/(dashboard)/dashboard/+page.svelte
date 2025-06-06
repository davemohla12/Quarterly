<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Payment from '$src/components/app/Payment.svelte'
  import Line from '$src/components/app/Line.svelte'
  import Pay from '$src/components/app/Pay.svelte'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import Spacer from '$src/components/app/Spacer.svelte'

  const headingText = `Your quarterly payments for 2025`

  let federalThisQuarterPayment = $state(0)
  let stateThisQuarterPayment = $state(0)
  
  let statePayment1 = 576
  let statePayment2 = 576
  let statePayment3 = 576
  let statePayment4 = 576

  onMount(() => {
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
    // console.log(`FEDERAL`)
    // console.log(`Adjusted Gross Income This Year:${store.adjustedGrossIncomeThisYear}`)
    // console.log(`Taxable Federal Income This Year:${store.taxableFederalIncomeThisYear}`)
    // console.log(`Safe Harbor Federal Taxes This Year E:${store.safeHarborFederalTaxesThisYear}`)
    // console.log(`Non Withheld Safe Harbor Federal Tax This Year:${store.nonWithheldSafeHarborFederalTaxThisYear}`)
    // console.log(`Safe To Skip Federal Payment:${store.safeToSkipFederalPayment}`)
    // console.log(`Federal Quarterly 1 Payment:${store.q1federalQuarterlyPayment}`)
    // console.log(`Federal Quarterly 2 Payment:${store.q2federalQuarterlyPayment}`)
    // console.log(`Federal Quarterly 3 Payment:${store.q3federalQuarterlyPayment}`)
    // console.log(`Federal Quarterly 4 Payment:${store.q4federalQuarterlyPayment}`)
    // console.log(``)

    // console.log(`STATE`)
    // console.log(`State Adjustable Gross Income This Year:${store.stateAdjustableGrossIncomeThisYear}`)
    // console.log(`Taxable State Income This Year:${store.taxableStateIncomeThisYear}`)
    // console.log(`Safe Harbor State Taxes This Year E:${store.safeHarborStateTaxesThisYear}`)
    // console.log(`Non Withheld Safe Harbor State Tax This Year:${store.nonWithheldSafeHarborStateTaxThisYear}`)
    // console.log(`Safe To Skip State Payment:${store.safeToSkipStatePayment}`)
    // console.log(`State Quarterly 1 Payment:${store.q1StateQuarterlyPayment}`)
    // console.log(`State Quarterly 2 Payment:${store.q2StateQuarterlyPayment}`)
    // console.log(`State Quarterly 3 Payment:${store.q3StateQuarterlyPayment}`)
    // console.log(`State Quarterly 4 Payment:${store.q4StateQuarterlyPayment}`)

  })
</script>

<Header hideBack={true} hideReset={true} />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilewidth="275px" />
<Payment 
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
{#if store.stateSupported && store.currentState}
  <Pay quarter="June" federalQuarterAmount={federalThisQuarterPayment} showState={true} stateName={store.currentState} stateQuarterAmount={stateThisQuarterPayment} />
{:else}
  <Pay quarter="June" federalQuarterAmount={federalThisQuarterPayment} showState={false} />
{/if}
<Spacer />



