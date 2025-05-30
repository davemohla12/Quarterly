<script>
  import { getStateQuarterlyPayment, getStateTaxes } from '$src/utilities/statetax'
  import { formatCurrency } from '$src/utilities/utilities'

  const state = 'indiana'
  const currentQuarter = 'Q2'
  const filingStatus = 'married'
  const stateTaxPaidLastYear = 6000
  const incomeExpectationThisYear = 'increase'
  const stateIncomeLastYear = 95000
  const expectedTotalIncomeThisYear = 110000
  const businessExpensesThisYear = 12000
  const retirementContributionsThisYear = 5000
  const studentLoanInterestThisYear = 1000
  const healthInsuranceThisYear = 2000
  const otherDeductionsThisYear = 1000
  const exemptions = 2
  let stateWithholdings = 3000
  let q1PaymentMade = 1000
  let q2PaymentMade = null
  let q3PaymentMade = null

  let stateTaxes = getStateTaxes(state, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
  let quarterlyPayment = getStateQuarterlyPayment(state, currentQuarter, stateTaxes.safeHarborStateTaxesThisYear, stateWithholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade)

</script> 

<div class="page">
  <div class="section">
    <div>INPUTS</div>
    <div>state = {state}</div>
    <div>currentQuarter = {currentQuarter}</div>
    <div>filingStatus = {filingStatus}</div>
    <div>stateTaxPaidLastYear = {stateTaxPaidLastYear}</div>
    <div>stateIncomeLastYear = {stateIncomeLastYear}</div>
    <div>incomeExpectationThisYear = {incomeExpectationThisYear}</div>
    <div>expectedTotalIncomeThisYear = {expectedTotalIncomeThisYear}</div>
    <div>businessExpensesThisYear = {businessExpensesThisYear}</div>
    <div>retirementContributionsThisYear = {retirementContributionsThisYear}</div>
    <div>studentLoanInterestThisYear = {studentLoanInterestThisYear}</div>
    <div>healthInsuranceThisYear = {healthInsuranceThisYear}</div>
    <div>otherDeductionsThisYear = {otherDeductionsThisYear}</div>  
    <div>exemptions = {exemptions}</div>
    <div>stateWithholdings = {stateWithholdings}</div>
    <div>q1PaymentMade = {q1PaymentMade}</div>
    <div>q2PaymentMade = {q2PaymentMade}</div>
    <div>q3PaymentMade = {q3PaymentMade}</div>
  </div>
  <div class="section">
    <div>OUTPUTS</div>
    <div>stateAdjustableGrossIncomeThisYear = {formatCurrency(stateTaxes.stateAdjustableGrossIncomeThisYear)}</div>
    <div>taxableStateIncomeThisYear = {formatCurrency(stateTaxes.taxableStateIncomeThisYear)}</div>
    <div>safeHarborStateTaxesThisYear = {formatCurrency(stateTaxes.safeHarborStateTaxesThisYear)}</div>
    <div>nonWithheldSafeHarborStateTaxThisYear = {formatCurrency(quarterlyPayment.nonWithheldSafeHarborStateTaxThisYear)}</div>
    <div>safeToSkipStatePayment = {quarterlyPayment.safeToSkipStatePayment}</div>
    <div>q1StateQuarterlyPayment = {formatCurrency(quarterlyPayment.q1StateQuarterlyPayment)}</div>
    <div>q2StateQuarterlyPayment = {formatCurrency(quarterlyPayment.q2StateQuarterlyPayment)}</div>
    <div>q3StateQuarterlyPayment = {formatCurrency(quarterlyPayment.q3StateQuarterlyPayment)}</div>
    <div>q4StateQuarterlyPayment = {formatCurrency(quarterlyPayment.q4StateQuarterlyPayment)}</div>
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