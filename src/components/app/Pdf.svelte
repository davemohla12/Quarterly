<script>
  import QuarterlyPayments from '$src/components/app/QuarterlyPayments.svelte'
  import Explanation from '$src/components/app/Explanation.svelte'
  import { store } from '$src/stores/store.svelte'
  import SinglePayments from '$src/components/app/SinglePayments.svelte'

</script>

<div class="center">
  <img class="logo" src="/images/logo.png" alt="Logo"/>
  {#if store.payPreference == 'single'}
    <div class="headline">Your remaining payment for {store.currentYear}</div>
  {:else}
    <div class="headline">Your quarterly payments for {store.currentYear}</div>
  {/if}
</div>
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
<div class="center">
  <div class="explanation">Explanation</div>
</div>
<Explanation showHide={false} />

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
  .explanation {
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    margin-top: 10px;
  }
</style>