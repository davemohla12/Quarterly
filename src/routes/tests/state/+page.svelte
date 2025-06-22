<script>
  import { getStateQuarterlyPayment, getStateSinglePayment, getStateTaxes } from '$src/utilities/statetax'
  import { formatCurrency } from '$src/utilities/utilities'

  const state = 'pennsylvania'
  const currentTaxQuarter = 'Q3'
  const filingStatus = 'head'
  const stateTaxPaidLastYear = 7000
  const incomeExpectationThisYear = 'decrease'
  const stateIncomeLastYear = 60000
  const expectedTotalIncomeThisYear = 55000
  const businessExpensesThisYear = 8000
  const retirementContributionsThisYear = 3000
  const studentLoanInterestThisYear = 500
  const healthInsuranceThisYear = 600
  const otherDeductionsThisYear = 900
  const exemptions = 2
  let stateWithholdings = 1500
  let q1PaymentMade = 500
  let q2PaymentMade = 0
  let q3PaymentMade = null
  
  let stateTaxes = getStateTaxes(state, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
  let quarterlyPayment = getStateQuarterlyPayment(state, currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, stateWithholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade, stateTaxes.initialExplanation)
  let singlePayment = getStateSinglePayment(state, stateTaxes.safeHarborStateTaxesThisYear, stateWithholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade, stateTaxes.initialExplanation)

</script> 

<div class="page">
  <div class="section">
    <div>INPUTS</div>
    <div>state = {state}</div>
    <div>currentTaxQuarter = {currentTaxQuarter}</div>
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
    <div>explanation = {quarterlyPayment.explanation}</div>
  </div>
  <div class="section">
    <div>SINGLE PAYMENT</div>
    <div>due = {formatCurrency(singlePayment.due)}</div>
    <div>paid = {formatCurrency(singlePayment.paid)}</div>
    <div>remaining = {formatCurrency(singlePayment.remaining)}</div>
    <div>explanation = {singlePayment.explanation}</div>
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