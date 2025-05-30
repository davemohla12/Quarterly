<script>
  import { formatCurrency } from "$src/utilities/utilities"
  import { onMount } from "svelte";

  let props = $props()
  let federalPayment1 = props.federalPayment1
  let federalPayment2 = props.federalPayment2
  let federalPayment3 = props.federalPayment3
  let federalPayment4 = props.federalPayment4
  let showState = props.showState
  let stateName = props.stateName
  let statePayment1 = props.statePayment1 || 0
  let statePayment2 = props.statePayment2 || 0
  let statePayment3 = props.statePayment3 || 0
  let statePayment4 = props.statePayment4 || 0
</script>

<div class="container">
  <div class="column1">
    <div class="header">DATE</div>
    <div class="cell">4-15-25</div>
    <div class="cell">6-16-25</div>
    <div class="cell">9-15-25</div>
    <div class="cell">1-15-26</div>
  </div>
  <div class="column2">
    <div class="header">FEDERAL</div>
    <div class="cell">{formatCurrency(federalPayment1)}</div>
    <div class="cell">{formatCurrency(federalPayment2)}</div>
    <div class="cell">{formatCurrency(federalPayment3)}</div>
    <div class="cell">{formatCurrency(federalPayment4)}</div>
  </div>
  {#if showState}
    <div class="column3">
      <div class="header">{stateName.toUpperCase()}</div>
      <div class="cell">{formatCurrency(statePayment1)}</div>
      <div class="cell">{formatCurrency(statePayment2)}</div>
      <div class="cell">{formatCurrency(statePayment3)}</div>
      <div class="cell">{formatCurrency(statePayment4)}</div>
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
  .column1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .column2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
  }
  .column3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
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
    .column2 {
      margin-left: 70px;
    }
    .column3 {
      margin-left: 70px;
    }
  }

</style>