<script>
  import { getMultiStatePayments } from '$src/utilities/statetax'
  import { formatCurrency } from '$src/utilities/utilities'
  import { convertStateToUpperCase } from '$src/utilities/utilities'

  const q1State = 'massachusetts'
  const q2State = 'california'
  const q3State = 'new_york'
  const q4State = 'oregon'
  const currentTaxQuarter = 'Q4'
  const yearlyTaxes = 20000
  const withholdings = 2000
  const payment1 = 3000
  const payment2 = 2000
  const payment3 = 1000
  
  let multiStatePayments = getMultiStatePayments(q1State, q2State, q3State, q4State, currentTaxQuarter, yearlyTaxes, withholdings, payment1, payment2, payment3)

</script> 

<div class="page">
  <div class="section">
    <div>INPUTS</div>
    <div>q1State = {(q1State)}</div>
    <div>q2State = {q2State}</div>
    <div>q3State = {q3State}</div>
    <div>q4State = {q4State}</div>
    <div>currentTaxQuarter = {currentTaxQuarter}</div>
    <div>yearlyTaxes = {formatCurrency(yearlyTaxes)}</div>
    <div>withholdings = {formatCurrency(withholdings)}</div>
    <div>payment1 = {formatCurrency(payment1)}</div>
    <div>payment2 = {formatCurrency(payment2)}</div>
    <div>payment3 = {formatCurrency(payment3)}</div>
  </div>
  <div class="section">
    <div>OUTPUTS</div>
    <div>totalStateTaxLiability = {formatCurrency(multiStatePayments.totalStateTaxLiability)}</div>
    <br />
    <div>q1State = {q1State}</div>
    <div>q1StateQuarterlyPayment = {formatCurrency(multiStatePayments.q1StateQuarterlyPayment)}</div>
    <br />
    <div>q2State = {q2State}</div>
    <div>q2StateQuarterlyPayment = {formatCurrency(multiStatePayments.q2StateQuarterlyPayment)}</div>
    <br />
    <div>q3State = {q3State}</div>
    <div>q3StateQuarterlyPayment = {formatCurrency(multiStatePayments.q3StateQuarterlyPayment)}</div>
    <br />
    <div>q4State = {q4State}</div>
    <div>q4StateQuarterlyPayment = {formatCurrency(multiStatePayments.q4StateQuarterlyPayment)}</div>
    <br />
    <div>Other States to Pay This Quarter</div>
    {#each multiStatePayments.otherStatesToPay as state}
      <div>
        <div>{convertStateToUpperCase(state.state)}</div>
        <div>{formatCurrency(state.amount)}</div>
      </div>
      <br />
    {/each}
    <br />
  </div>
  <div class="section">
    <div>EXPLANATION</div>
    <div>{multiStatePayments.explanation}</div>
  </div>
</div>

<style>
  .page {
    padding: 20px;
  }
  .section {
    margin-bottom: 20px;
  }
</style>


