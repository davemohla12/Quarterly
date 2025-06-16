<script>
  import { formatCurrency } from "$src/utilities/utilities"
  import { convertStateToAllUpperCase } from "$src/utilities/utilities"
  import { onMount } from "svelte"

  let props = $props()
  let federalDue = props.federalDue
  let federalPaid = props.federalPaid
  let federalRemaining = props.federalRemaining
  let showState = props.showState
  let stateName = props.stateName
  let stateDue = props.stateDue || 0
  let statePaid = props.statePaid || 0
  let stateRemaining = props.stateRemaining || 0

  let column2Width = $state(0)
  let column3Width = $state(0)
  let longLineWidth = $state(200)
  let pageWidth = $state(0)

  $effect(() => {
    if (pageWidth < 768) {
      column2Width = document.querySelector('.column2')?.offsetWidth
      column3Width = document.querySelector('.column3')?.offsetWidth
      longLineWidth = column2Width + column3Width + 15
    } 
    else {
      column2Width = document.querySelector('.column2')?.offsetWidth
      column3Width = document.querySelector('.column3')?.offsetWidth
      longLineWidth = column2Width + column3Width + 75
    }
  })
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div class="container">
  <div class="column1">
    <div class="header">&nbsp;</div>
    <div class="cell">Due</div>
    <div class="cell">Paid</div>
    <div class="cell">Remaining</div>
  </div>
  <div class="column2">
    <div class="header">FEDERAL</div>
    <div class="cell">{formatCurrency(federalDue)}</div>
    <div class="cell">{formatCurrency(federalPaid)}</div>
    <div class="cell">{formatCurrency(federalRemaining)}</div>
    {#if showState}
      <div class="longline" style="width: {longLineWidth}px;"></div>
    {:else}
      <div class="shortline"></div>
    {/if}
  </div>
  {#if showState}
    <div class="column3">
      <div class="header">{convertStateToAllUpperCase(stateName)}</div>
      <div class="cell">{formatCurrency(stateDue)}</div>
      <div class="cell line">{formatCurrency(statePaid)}</div>
      <div class="cell">{formatCurrency(stateRemaining)}</div>
    </div>
  {/if}
</div>

<style>
  .container {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .header {
    font-size: 15px;
    font-weight: var(--bold);
    margin-bottom: 10px;
  }
  .cell {
    font-size: 16px;
    font-weight: var(--normal);
    margin-bottom: 15px;
  }
  .longline {
    position: absolute;
    top: 90px;
    left: 0px; 
    border-bottom: 1px solid var(--dark);
  }
  .shortline {
    position: absolute;
    top: 90px;
    left: 0; 
    width: 100%;
    border-bottom: 1px solid var(--dark);
  }
  .column1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 60px;
  }
  .column2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    position: relative;
  }
  .column3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
  }

  @media (min-width: 768px) {
    .container {
      margin-top: 25px;
    }
    .header {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .cell {
      font-size: 18px;
      margin-bottom: 25px;
    }
    .longline {
      position: absolute;
      top: 120px;
      left: 0px; 
      border-bottom: 1px solid var(--dark);
    }
    .shortline {
      position: absolute;
      top: 120px;
      left: 0; 
      width: 100%;
      border-bottom: 1px solid var(--dark);
    }
    .column2 {
      margin-left: 70px;
    }
    .column3 {
      margin-left: 70px;
    }
  }

</style>