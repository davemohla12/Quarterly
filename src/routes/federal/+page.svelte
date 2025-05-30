<script>
  import { getFederalTaxes, getFederalQuarterlyPayment } from '$src/utilities/federaltax'
  import { formatCurrency } from '$src/utilities/utilities'

  let currentQuarter = 'Q2'
  let filingStatus = 'separate'
  let federalTaxPaidLastYear = 8500
  let adjustedGrossIncomeLastYear = 95000
  let incomeExpectationThisYear = 'increase'
  let expectedTotalIncomeThisYear = 99750
  let businessExpensesThisYear = 15000
  let retirementContributionsThisYear = 6000
  let studentLoanInterestThisYear = 2500
  let healthInsuranceThisYear = 4000
  let otherDeductionsThisYear = 1000
  let withholdings = 2500
  let q1PaymentMade = 0
  let q2PaymentMade = null
  let q3PaymentMade = null

  let taxes = getFederalTaxes(incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear)
  let payment = getFederalQuarterlyPayment(currentQuarter, taxes.safeHarborFederalTaxesThisYear, withholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade)

</script> 

<div class="page">
  <div class="section">
    <div>INPUTS</div>
    <div>currentQuarter = {currentQuarter}</div>
    <div>filingStatus = {filingStatus}</div>
    <div>federalTaxPaidLastYear = {federalTaxPaidLastYear}</div>
    <div>adjustedGrossIncomeLastYear = {adjustedGrossIncomeLastYear}</div>  
    <div>incomeExpectationThisYear = {incomeExpectationThisYear}</div>
    <div>expectedTotalIncomeThisYear = {expectedTotalIncomeThisYear}</div>
    <div>businessExpensesThisYear = {businessExpensesThisYear}</div>
    <div>retirementContributionsThisYear = {retirementContributionsThisYear}</div>
    <div>studentLoanInterestThisYear = {studentLoanInterestThisYear}</div>
    <div>healthInsuranceThisYear = {healthInsuranceThisYear}</div>
    <div>otherDeductionsThisYear = {otherDeductionsThisYear}</div>
    <div>withholdings = {withholdings}</div>
    <div>q1PaymentMade = {q1PaymentMade}</div>
    <div>q2PaymentMade = {q2PaymentMade}</div>
    <div>q3PaymentMade = {q3PaymentMade}</div>
  </div>
  <div class="section">
    <div>OUTPUTS</div>
    <div>adjustedGrossIncomeThisYear = {formatCurrency(taxes.adjustedGrossIncomeThisYear)}</div>
    <div>taxableFederalIncomeThisYear = {formatCurrency(taxes.taxableFederalIncomeThisYear)}</div>
    <div>safeHarborFederalTaxesThisYear = {formatCurrency(taxes.safeHarborFederalTaxesThisYear)}</div>
    <div>nonWithheldSafeHarborFederalTaxThisYear = {formatCurrency(payment.nonWithheldSafeHarborFederalTaxThisYear)}</div>
    <div>safeToSkipFederalPayment = {payment.safeToSkipFederalPayment}</div>
    <div>q1federalQuarterlyPayment = {formatCurrency(payment.q1federalQuarterlyPayment)}</div>
    <div>q2federalQuarterlyPayment = {formatCurrency(payment.q2federalQuarterlyPayment)}</div>
    <div>q3federalQuarterlyPayment = {formatCurrency(payment.q3federalQuarterlyPayment)}</div>
    <div>q4federalQuarterlyPayment = {formatCurrency(payment.q4federalQuarterlyPayment)}</div>
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