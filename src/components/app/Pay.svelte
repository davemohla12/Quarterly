<script>
  import { store } from '$src/stores/store.svelte'
  import { onMount } from 'svelte'
  import { formatCurrency } from '$src/utilities/utilities'

  let props = $props()
  let quarter = props.quarter
  let federalQuarterAmount = $derived(props.federalQuarterAmount)
  let showState = props.showState
  let stateName = props.stateName
  let stateQuarterAmount = $derived(props.stateQuarterAmount)
  let quarterName = $state(null)

  onMount(() => {
    if (store.currentQuarter == 'Q1') {
      quarterName = 'April' 
    }
    else if (store.currentQuarter == 'Q2') {
      quarterName = 'June'
    } 
    else if (store.currentQuarter == 'Q3') {    
      quarterName = 'September'
    }
    else if (store.currentQuarter == 'Q4') {
      quarterName = 'January'
    }
  })
 
</script>

<div class="container">
  <div class="title">Pay your {quarterName} tax</div>
  <div class="button">PAY FEDERAL</div>
  {#if federalQuarterAmount > 0}
    <div class="description">Pay {formatCurrency(federalQuarterAmount)} to cover this quarter</div>
  {:else}
    <div class="description">No federal payment is needed this quarter</div>
  {/if} 
  {#if showState}
    <div class="button">PAY {stateName.toUpperCase()}</div>
    {#if stateQuarterAmount > 0}
      <div class="description">Pay {formatCurrency(stateQuarterAmount)} to cover this quarter</div>
    {:else}
      <div class="description">No state payment is required this quarter</div>
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
    margin-top: 10px;
    text-align: center;
  }
  .button {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: var(--bold);
    color: var(--white);
    background-color: var(--green);
    border-radius: 5px;
    width: 200px;
    height: 56px;
    margin-top: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  }
  .description {
    text-align: center;
    margin-top: 8px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
    .container {
      width: 500px;
    }
    .title {
      font-size: 34px;
    }
    .button {
      margin-top: 20px;
    }
  }
</style>