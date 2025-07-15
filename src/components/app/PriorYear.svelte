<script>
  import SinglePayments from '$src/components/app/SinglePayments.svelte'
  import QuarterlyPayments from '$src/components/app/QuarterlyPayments.svelte'
  import Explanation from '$src/components/app/Explanation.svelte'  

  let props = $props()
  let payPreference = $derived(props.payPreference)
  let federalDue = $derived(props.federalDue)
  let federalPaid = $derived(props.federalPaid)
  let federalRemaining = $derived(props.federalRemaining)
  let currentState = $derived(props.currentState) 
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

  let livingInCurrentStateAllThisYear = $derived(props.livingInCurrentStateAllThisYear)
  let q1State = $derived(props.q1State)
  let q2State = $derived(props.q2State)
  let q3State = $derived(props.q3State)
  let q4State = $derived(props.q4State)

  let showPaidDates = $derived(props.showPaidDates)
  let q1FederalPaidDate = $derived(props.q1FederalPaidDate)  
  let q2FederalPaidDate = $derived(props.q2FederalPaidDate)
  let q3FederalPaidDate = $derived(props.q3FederalPaidDate)
  let q4FederalPaidDate = $derived(props.q4FederalPaidDate)
  let q1StatePaidDate = $derived(props.q1StatePaidDate)
  let q2StatePaidDate = $derived(props.q2StatePaidDate)
  let q3StatePaidDate = $derived(props.q3StatePaidDate)
  let q4StatePaidDate = $derived(props.q4StatePaidDate)
  let singleFederalPaidDate = $derived(props.singleFederalPaidDate)
  let singleStatePaidDate = $derived(props.singleStatePaidDate)   

  let onFederalPaidDateChange = $derived(props.onFederalPaidDateChange || (() => {}))
  let onStatePaidDateChange = $derived(props.onStatePaidDateChange || (() => {}))

  let onQ1FederalPaidDateChange = $derived(props.onQ1FederalPaidDateChange || (() => {}))
  let onQ2FederalPaidDateChange = $derived(props.onQ2FederalPaidDateChange || (() => {}))
  let onQ3FederalPaidDateChange = $derived(props.onQ3FederalPaidDateChange || (() => {}))
  let onQ4FederalPaidDateChange = $derived(props.onQ4FederalPaidDateChange || (() => {}))
  let onQ1StatePaidDateChange = $derived(props.onQ1StatePaidDateChange || (() => {}))
  let onQ2StatePaidDateChange = $derived(props.onQ2StatePaidDateChange || (() => {}))
  let onQ3StatePaidDateChange = $derived(props.onQ3StatePaidDateChange || (() => {}))
  let onQ4StatePaidDateChange = $derived(props.onQ4StatePaidDateChange || (() => {}))

  let onShowPaidDatesChange = $derived(props.onShowPaidDatesChange || (() => {}))

</script>

{#if payPreference == 'single'}
  <SinglePayments 
    federalDue={federalDue} 
    federalPaid={federalPaid} 
    federalRemaining={federalRemaining} 
    currentState={currentState} 
    stateDue={stateDue} 
    statePaid={statePaid} 
    stateRemaining={stateRemaining} 
    showPaidDates={showPaidDates}
    singleFederalPaidDate={singleFederalPaidDate}
    singleStatePaidDate={singleStatePaidDate}
    onFederalPaidDateChange={onFederalPaidDateChange}
    onStatePaidDateChange={onStatePaidDateChange}
    onShowPaidDatesChange={onShowPaidDatesChange}
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
    showPaidDates={showPaidDates}
    q1FederalPaidDate={q1FederalPaidDate}
    q2FederalPaidDate={q2FederalPaidDate}
    q3FederalPaidDate={q3FederalPaidDate}
    q4FederalPaidDate={q4FederalPaidDate}
    q1StatePaidDate={q1StatePaidDate}
    q2StatePaidDate={q2StatePaidDate}
    q3StatePaidDate={q3StatePaidDate}
    q4StatePaidDate={q4StatePaidDate}
    onQ1FederalPaidDateChange={onQ1FederalPaidDateChange}
    onQ2FederalPaidDateChange={onQ2FederalPaidDateChange}
    onQ3FederalPaidDateChange={onQ3FederalPaidDateChange}
    onQ4FederalPaidDateChange={onQ4FederalPaidDateChange}
    onQ1StatePaidDateChange={onQ1StatePaidDateChange}
    onQ2StatePaidDateChange={onQ2StatePaidDateChange}
    onQ3StatePaidDateChange={onQ3StatePaidDateChange}
    onQ4StatePaidDateChange={onQ4StatePaidDateChange}
    onShowPaidDatesChange={onShowPaidDatesChange}
    livingInCurrentStateAllThisYear={livingInCurrentStateAllThisYear}
    q1State={q1State}
    q2State={q2State}
    q3State={q3State}
    q4State={q4State}
  />
{/if}
<div class="explanation">Explanation</div>
<div class="center">
  <Explanation explanation={explanation} showHide={false} />
</div>

<style>
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .explanation {
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    text-align: center;
    width: 100%;
    margin-top: 10px;
  }
</style>