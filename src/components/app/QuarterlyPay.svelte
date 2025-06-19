<script>
  import { store } from '$src/stores/store.svelte'
  import { onMount } from 'svelte'
  import { formatCurrency } from '$src/utilities/utilities'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { federalRules } from '$src/rules/federal'
  import { stateRules } from '$src/rules/state'
  import { convertStateToAllUpperCase } from '$src/utilities/utilities'
  import { fade } from 'svelte/transition'
  import { currentQuarter } from '$src/settings/settings'

  let props = $props()
  let federalQuarterAmount = $derived(props.federalQuarterAmount || 0)
  let showState = $derived(props.showState || false)
  let stateName = $derived(props.stateName || '')
  let stateQuarterAmount = $derived(props.stateQuarterAmount || 0)
  let quarterName = $state(null)
  let isFederalPaid = $state(false)
  let isStatePaid = $state(false)

  onMount(() => {
    if (currentQuarter == 'Q1') {
      quarterName = 'April' 
      isFederalPaid = store.q1FederalPaid
      isStatePaid = store.q1StatePaid
    } 
    else if (currentQuarter == 'Q2') {
      quarterName = 'June'
      isFederalPaid = store.q2FederalPaid
      isStatePaid = store.q2StatePaid
    } 
    else if (currentQuarter == 'Q3') {    
      quarterName = 'September'
      isFederalPaid = store.q3FederalPaid
      isStatePaid = store.q3StatePaid
    }
    else if (currentQuarter == 'Q4') {
      quarterName = 'January'
      isFederalPaid = store.q4FederalPaid
      isStatePaid = store.q4StatePaid
    }
  })

  const handleFederalClick = () => {
    window.open(federalRules.payLink, '_blank')
  }

  const handleStateClick = () => {
    window.open(stateRules[stateName].payLink, '_blank')
  }

  const handleMarkPaidFederal = () => {
    isFederalPaid = true
    if (currentQuarter == 'Q1') {
      store.q1FederalPaid = true
    }
    else if (currentQuarter == 'Q2') {
      store.q2FederalPaid = true
    }
    else if (currentQuarter == 'Q3') {
      store.q3FederalPaid = true
    }
    else if (currentQuarter == 'Q4') {
      store.q4FederalPaid = true
    }
  }

  const handleMarkPaidState = () => {
    isStatePaid = true
    if (currentQuarter == 'Q1') {
      store.q1StatePaid = true
    }
    else if (currentQuarter == 'Q2') {
      store.q2StatePaid = true
    }
    else if (currentQuarter == 'Q3') {
      store.q3StatePaid = true
    }
    else if (currentQuarter == 'Q4') {
      store.q4StatePaid = true
    }
  }

  const handleMarkNotPaidFederal = () => {
    isFederalPaid = false
    if (currentQuarter == 'Q1') {
      store.q1FederalPaid = false
    }
    else if (currentQuarter == 'Q2') {
      store.q2FederalPaid = false
    } 
    else if (currentQuarter == 'Q3') {
      store.q3FederalPaid = false
    }
    else if (currentQuarter == 'Q4') {
      store.q4FederalPaid = false
    } 
  }

  const handleMarkNotPaidState = () => {
    isStatePaid = false
    if (currentQuarter == 'Q1') {
      store.q1StatePaid = false
    }
    else if (currentQuarter == 'Q2') {
      store.q2StatePaid = false
    } 
    else if (currentQuarter == 'Q3') {
      store.q3StatePaid = false
    }
    else if (currentQuarter == 'Q4') {
      store.q4StatePaid = false
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