<script>
  import { getFederalTaxes, getFederalQuarterlyPayment, getFederalSinglePayment } from '$src/utilities/federaltax'
  import { formatCurrency } from '$src/utilities/utilities'

  let currentTaxQuarter = 'Q3'
  let filingStatus = 'head'
  let federalTaxPaidLastYear = 10000
  let adjustedGrossIncomeLastYear = 85000
  let incomeExpectationThisYear = 'increase'
  let expectedTotalIncomeThisYear = 100000
  let expectedSelfEmploymentIncomeThisYear = 50000
  let businessExpensesThisYear = 15000
  let retirementContributionsThisYear = 6000
  let studentLoanInterestThisYear = 500
  let healthInsuranceThisYear = 4000
  let otherDeductionsThisYear = 1500
  let withholdings = 3000
  let q1PaymentMade = 1000
  let q2PaymentMade = 0
  let q3PaymentMade = 0

  let taxes = getFederalTaxes(incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, expectedSelfEmploymentIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear)
  let payment = getFederalQuarterlyPayment(currentTaxQuarter, taxes.safeHarborFederalTaxesThisYear, withholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade, taxes.initialExplanation)
  let singlePayment = getFederalSinglePayment(taxes.safeHarborFederalTaxesThisYear, withholdings, q1PaymentMade, q2PaymentMade, q3PaymentMade, taxes.initialExplanation)

</script> 

<div class="page">
  <div class="section">
    <div>INPUTS</div>
    <div>currentTaxQuarter = {currentTaxQuarter}</div>
    <div>filingStatus = {filingStatus}</div>
    <div>federalTaxPaidLastYear = {federalTaxPaidLastYear}</div>
    <div>adjustedGrossIncomeLastYear = {adjustedGrossIncomeLastYear}</div>  
    <div>incomeExpectationThisYear = {incomeExpectationThisYear}</div>
    <div>expectedTotalIncomeThisYear = {expectedTotalIncomeThisYear}</div>
    <div>expectedSelfEmploymentIncomeThisYear = {expectedSelfEmploymentIncomeThisYear}</div>
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
    <div>totalFederalTaxLiability  = {formatCurrency(payment.totalFederalTaxLiability )}</div>
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