<script>
  import QuarterlyPayments from '$src/components/app/QuarterlyPayments.svelte'
  import Explanation from '$src/components/app/Explanation.svelte'
  import { payment } from '$src/data/payment.svelte'
  import SinglePayments from '$src/components/app/SinglePayments.svelte'
  import { currentTaxYear } from '$src/settings/settings'

  let props = $props()
  let federalDue = $derived(props.federalDue)
  let federalPaid = $derived(props.federalPaid)
  let federalRemaining = $derived(props.federalRemaining)
  let showState = $derived(props.showState)
  let stateName = $derived(props.stateName)
  let stateDue = $derived(props.stateDue)
  let statePaid = $derived(props.statePaid)
  let stateRemaining = $derived(props.stateRemaining)
  let federalPayment1 = $derived(props.federalPayment1)
  let federalPayment2 = $derived(props.federalPayment2)
  let federalPayment3 = $derived(props.federalPayment3)
  let federalPayment4 = $derived(props.federalPayment4)
  let statePayment1 = $derived(props.statePayment1)
  let statePayment2 = $derived(props.statePayment2)
  let statePayment3 = $derived(props.statePayment3)
  let statePayment4 = $derived(props.statePayment4)
  let explanation = $derived(props.explanation)

</script>

<div class="center">
  <img class="logo" src="/images/logo.png" alt="Logo"/>
  {#if payment.payPreference == 'single'}
    <div class="headline">Your remaining payment for {currentTaxYear}</div>
  {:else}
    <div class="headline">Your quarterly payments for {currentTaxYear}</div>
  {/if}
</div>
{#if payment.payPreference == 'single'}
  <SinglePayments 
    federalDue={federalDue} 
    federalPaid={federalPaid} 
    federalRemaining={federalRemaining} 
    showState={payment.stateSupported} 
    stateName={payment.currentState} 
    stateDue={stateDue} 
    statePaid={statePaid} 
    stateRemaining={stateRemaining} 
  />
{:else} 
  <QuarterlyPayments 
    federalPayment1={federalPayment1} 
    federalPayment2={federalPayment2} 
    federalPayment3={federalPayment3} 
    federalPayment4={federalPayment4} 
    showState={showState} 
    stateName={stateName} 
    statePayment1={statePayment1} 
    statePayment2={statePayment2} 
    statePayment3={statePayment3} 
    statePayment4={statePayment4} 
  />
{/if}
<div class="center">
  <Explanation explanation={explanation} showHide={false} />
</div>

<style>
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logo {
    margin-top: 40px;
    width: 112px;
    height: 27.5px;
  }
  .headline {
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    margin-top: 20px;
  }
</style>