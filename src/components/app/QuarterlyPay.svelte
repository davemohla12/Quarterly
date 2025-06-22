<script>
  import { payment } from '$src/data/payment.svelte'
  import { onMount } from 'svelte'
  import { formatCurrency } from '$src/utilities/utilities'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { federalRules } from '$src/rules/federal'
  import { stateRules } from '$src/rules/state'
  import { convertStateToAllUpperCase } from '$src/utilities/utilities'
  import { fade } from 'svelte/transition'
  import { currentTaxQuarter } from '$src/settings/settings'

  let props = $props()
  let federalQuarterAmount = $derived(props.federalQuarterAmount || 0)
  let showState = $derived(props.showState || false)
  let stateName = $derived(props.stateName || '')
  let stateQuarterAmount = $derived(props.stateQuarterAmount || 0)

  let quarterName = $derived(props.quarterName || '')
  let isFederalPaid = $derived(props.isFederalPaid || false)
  let isStatePaid = $derived(props.isStatePaid || false)

  const handleFederalClick = () => {
    window.open(federalRules.payLink, '_blank')
  }

  const handleStateClick = () => {
    window.open(stateRules[stateName].payLink, '_blank')
  }

  const handleMarkPaidFederal = async () => {
    isFederalPaid = true
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1FederalMarkPaid', true)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2FederalMarkPaid', true)
    }
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3FederalMarkPaid', true)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4FederalMarkPaid', true)
    }
  }

  const handleMarkPaidState = async () => {
    isStatePaid = true
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1StateMarkPaid', true)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2StateMarkPaid', true)
    }
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3StateMarkPaid', true)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4StateMarkPaid', true)
    }
  }

  const handleMarkNotPaidFederal = async () => {
    isFederalPaid = false
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1FederalMarkPaid', false)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2FederalMarkPaid', false)
    } 
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3FederalMarkPaid', false)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4FederalMarkPaid', false)
    } 
  }

  const handleMarkNotPaidState = async () => {
    isStatePaid = false
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1StateMarkPaid', false)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2StateMarkPaid', false)
    } 
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3StateMarkPaid', false)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4StateMarkPaid', false)
    }
  }   

</script>

<div class="container">
  <div class="title">Pay your {quarterName} payment</div>
  <div class="header">FEDERAL</div>
  {#if federalQuarterAmount > 0}
    {#if !isFederalPaid}
      <div in:fade={{ duration: 200 }} >
        <div class="description">Pay {formatCurrency(federalQuarterAmount)} to cover this quarter</div>
        <div class="buttons">
          <Clickable onclick={handleMarkPaidFederal}>
            <div class="secondbutton">MARK PAID</div>
          </Clickable>
          <Clickable onclick={handleFederalClick}>
            <div class="primarybutton">PAY</div>
          </Clickable>
        </div>
      </div>
      {:else}
      <div in:fade={{ duration: 200 }} >
        <div class="completedcontainer">
          <img class="greencheck" src="/images/greencheck.png"  alt="Completed" />
          <div class="completedtext">Completed payment of {formatCurrency(federalQuarterAmount)}</div>
        </div>
        <Clickable onclick={handleMarkNotPaidFederal}>
          <div class="notpaid">MARK NOT PAID</div>
        </Clickable>
      </div>
      {/if}
  {:else}
    <div class="description">No federal payment is needed this quarter</div>
    <div class="spacer"></div>
  {/if} 
  {#if showState}
    <div class="header">{convertStateToAllUpperCase(stateName)}</div>
    {#if stateQuarterAmount > 0}
      {#if !isStatePaid}
        <div in:fade={{ duration: 200 }} >
          <div class="description">Pay {formatCurrency(stateQuarterAmount)} to cover this quarter</div>
          <div class="buttons">
          <Clickable onclick={handleMarkPaidState}>
            <div class="secondbutton">MARK PAID</div>
          </Clickable>
          <Clickable onclick={handleStateClick}>
            <div class="primarybutton">PAY</div>
          </Clickable>
          </div>
        </div>
      {:else}
        <div in:fade={{ duration: 200 }} >
          <div class="completedcontainer">
            <img class="greencheck" src="/images/greencheck.png"  alt="Completed" />
            <div class="completedtext">Completed payment of {formatCurrency(stateQuarterAmount)}</div>
          </div>
          <Clickable onclick={handleMarkNotPaidState}>
            <div class="notpaid">MARK NOT PAID</div>
          </Clickable>
        </div>
      {/if}
    {:else}
      <div class="description">No state payment is required this quarter</div>
      <div class="spacer"></div>
    {/if}
  {/if}
</div>

<style>
  .container {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 7px;
    text-align: center;
  }
  .header {
    font-size: 18px;
    font-weight: var(--bold);
    text-align: center;
    margin-top: 20px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .secondbutton {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: var(--medium);
    color: var(--green);
    background-color: var(--white);
    border: 1px solid var(--green);
    border-radius: 5px;
    min-width: 120px;
    padding-left: 15px;
    padding-right: 15px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 15px;
  }
  .primarybutton {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: var(--bold);
    color: var(--white);
    background-color: var(--green);
    border-radius: 5px;
    min-width: 120px;
    padding-left: 15px;
    padding-right: 15px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .completedcontainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .greencheck { 
    width: 15px;
    height: 11px;
    margin-right: 10px;
  }
  .notpaid {
    margin-top: 15px;
    color: var(--gray4);
    font-size: 16px;
    margin-bottom: 10px;
  }
  .spacer {
    height: 20px;
  }
  .description {
    text-align: center;
    margin-top: 8px;
  }
  @media (min-width: 768px) {
    .container {
      width: 500px;
    }
    .title {
      font-size: 34px;
    }
  }
</style>