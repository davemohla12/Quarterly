<script>
  import { getFederalTaxes, getFederalQuarterlyPayment, getFederalSinglePayment } from '$src/utilities/federaltax'
  import { formatCurrency } from '$src/utilities/utilities'

  let currentQuarter = 'Q2'
  let filingStatus = 'married'
  let federalTaxPaidLastYear = 20000
  let adjustedGrossIncomeLastYear = 180000
  let incomeExpectationThisYear = 'decrease'
  let expectedTotalIncomeThisYear = 100000
  let businessExpensesThisYear = 10000
  let retirementContributionsThisYear = 8000
  let studentLoanInterestThisYear = 500
  let healthInsuranceThisYear = 5000
  let otherDeductionsThisYear = 1500
  let withholdings = 10000
  let q1PaymentMade = 0
  let q2PaymentMade = 0
  let q3PaymentMade = 0

  let taxes = getFederalTaxes(incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear)
  let payment = getFederalQuarterlyPayment(currentQuarter, taxes.safeHarborFederalTaxesThisYear, withholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade, taxes.initialExplanation)
  let singlePayment = getFederalSinglePayment(taxes.safeHarborFederalTaxesThisYear, withholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade, taxes.initialExplanation)

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
    <div>explanation = {payment.explanation}</div>
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