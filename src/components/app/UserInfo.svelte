<script>
  import dayjs from "dayjs"
  import Clickable from "$src/components/app/Clickable.svelte"
  import { onMount } from "svelte"
  import { formatCurrency } from "$src/utilities/utilities"

  let props = $props()
  let userValues = $derived(props.userValues || {})
  let paymentValues = $derived(props.paymentValues || {})
  let onTaxYearClick = $derived(props.onTaxYearClick || (() => {}))
  let currentTaxYear = $state(null)

  onMount(() => {
    currentTaxYear = userValues.latestTaxYearPaid
  })

  const handleTaxYearClick = (taxYear) => {
    onTaxYearClick(taxYear)
  }
</script>

<div class="container">

  <div class="section">PAGE</div>
  <div class="field">Current Page</div>
  <div class="value">{userValues.currentPage || 'blank'}</div>
  <div class="divider"></div>

  <div class="section">REMINDERS</div>
  <div class="field">Send Reminders</div>
  <div class="value">{userValues.sendReminders === null ? 'blank' : userValues.sendReminders}</div>
  <div class="field">Send Five Day Reminders</div>
  <div class="value">{userValues.sendFiveDayReminder === null ? 'blank' : userValues.sendFiveDayReminder}</div>
  <div class="field">Send One Day Reminders</div>
  <div class="value">{userValues.sendOneDayReminder === null ? 'blank' : userValues.sendOneDayReminder}</div>
  <div class="divider"></div>

  <div class="section">CHECKOUT</div>
  <div class="field">Latest Tax Year Paid</div>
  <div class="value">{userValues.latestTaxYearPaid || 'blank'}</div>
  <div class="field">Tax Years Paid</div>
  <div class="value">{userValues.taxYearsPaid.join(', ') || 'blank'}</div>
  <div class="field">Last Payment Amount</div>
  <div class="value">{formatCurrency(userValues.lastPaymentAmount) || 'blank'}</div>
  <div class="field">Last Payment Date</div>
  <div class="value">{dayjs(userValues.lastPaymentDate).format('M/D/YY') || 'blank'}</div>
  <div class="field">Total Payments</div>
  <div class="value">{userValues.totalPayments || 'blank'}</div>
  <div class="field">Payments Dates</div>
  <div class="value">{userValues.paymentDates.map(date => dayjs(date).format('M/D/YY')).join(', ') || 'blank'}</div>
  <div class="field">Stripe Customer ID</div>
  <div class="value">{userValues.stripeCustomerId || 'blank'}</div>
  <div class="divider"></div>

  <div class="section">TAX YEARS</div>
  <div class="taxyears">
    {#each userValues.taxYearsPaid as taxYear}
      <Clickable onclick={() => handleTaxYearClick(taxYear)}>
        <div class="taxyear" class:current={taxYear === currentTaxYear}>{taxYear}</div>
      </Clickable>
    {/each}
  </div>
  <div class="divider"></div>

  {#if paymentValues}
    <div class="section">STATE</div>
    <div class="field">Current State</div>
    <div class="value">{paymentValues.currentState || 'blank'}</div>
    <div class="field">State Supported</div>
    <div class="value">{paymentValues.stateSupported === null ? 'blank' : paymentValues.stateSupported}</div>
    <div class="field">State Has Quarterly Taxes</div>
    <div class="value">{paymentValues.stateHasQuarterlyTaxes === null ? 'blank' : paymentValues.stateHasQuarterlyTaxes}</div>
    <div class="field">Lived in Current State All Last Year</div>
    <div class="value">{paymentValues.livedInCurrentStateAllLastYear === null ? 'blank' : paymentValues.livedInCurrentStateAllLastYear}</div>
    <div class="field">Living in Current State All This Year</div>
    <div class="value">{paymentValues.livingInCurrentStateAllThisYear === null ? 'blank' : paymentValues.livingInCurrentStateAllThisYear}</div>
    <div class="divider"></div>

    <div class="section">FILINGS</div>
    <div class="field">Earn Non-Paycheck Income This Year</div>
    <div class="value">{paymentValues.earnNonPaycheckIncomeThisYear === null ? 'blank' : paymentValues.earnNonPaycheckIncomeThisYear}</div>
    <div class="field">Filing Status</div>
    <div class="value">{paymentValues.filingStatus || 'blank'}</div>
    <div class="field">Exemptions</div>
    <div class="value">{paymentValues.exemptions || 'blank'}</div>
    <div class="divider"></div>

    <div class="section">LAST YEAR</div>
    <div class="field">Federal Tax Paid Last Year</div>
    <div class="value">{formatCurrency(paymentValues.federalTaxPaidLastYear) || 'blank'}</div>
    <div class="field">State Tax Paid Last Year</div>
    <div class="value">{formatCurrency(paymentValues.stateTaxPaidLastYear) || 'blank'}</div>
    <div class="field">Adjusted Gross Income Last Year</div>
    <div class="value">{formatCurrency(paymentValues.adjustedGrossIncomeLastYear) || 'blank'}</div>
    <div class="field">State Income Last Year</div>
    <div class="value">{formatCurrency(paymentValues.stateIncomeLastYear) || 'blank'}</div>
    <div class="divider"></div>

    <div class="section">THIS YEAR</div>
    <div class="field">Income Expectation this Year</div>
    <div class="value">{paymentValues.incomeExpectationThisYear || 'blank'}</div>
    <div class="field">Expected Total Income This Year</div>
    <div class="value">{formatCurrency(paymentValues.expectedTotalIncomeThisYear) || 'blank'}</div>
    <div class="field">Business Expenses This Year</div>
    <div class="value">{formatCurrency(paymentValues.businessExpensesThisYear) || 'blank'}</div>
    <div class="field">Retirement Contributions This Year</div>
    <div class="value">{formatCurrency(paymentValues.retirementContributionsThisYear) || 'blank'}</div>
    <div class="field">Student Loan Interest This Year</div>
    <div class="value">{formatCurrency(paymentValues.studentLoanInterestThisYear) || 'blank'}</div>
    <div class="field">Health Insurance This Year</div>
    <div class="value">{formatCurrency(paymentValues.healthInsuranceThisYear) || 'blank'}</div>
    <div class="field">Other Deductions This Year</div>
    <div class="value">{formatCurrency(paymentValues.otherDeductionsThisYear) || 'blank'}</div>
    <div class="divider"></div>
   
    <div class="section">WITHHOLDINGS</div>
    <div class="field">Salary or Wages This Year</div>
    <div class="value">{paymentValues.salaryOrWagesThisYear === null ? 'blank' : paymentValues.salaryOrWagesThisYear}</div>
    <div class="field">Has W2</div>
    <div class="value">{paymentValues.hasW2 === null ? 'blank' : paymentValues.hasW2}</div>
    <div class="field">Federal Withholdings This Year</div>
    <div class="value">{formatCurrency(paymentValues.federalWithholdingsThisYear) || 'blank'}</div>
    <div class="field">State Withholdings This Year</div>
    <div class="value">{formatCurrency(paymentValues.stateWithholdingsThisYear) || 'blank'}</div>
    <div class="divider"></div>

    <div class="section">PAYMENTS MADE</div>
    <div class="field">Q1 Federal Payment Made</div>
    <div class="value">{formatCurrency(paymentValues.q1FederalPaymentMade) || 'blank'}</div>
    <div class="field">Q2 Federal Payment Made</div>
    <div class="value">{formatCurrency(paymentValues.q2FederalPaymentMade) || 'blank'}</div>
    <div class="field">Q3 Federal Payment Made</div>
    <div class="value">{formatCurrency(paymentValues.q3FederalPaymentMade) || 'blank'}</div>
    <div class="field">Q1 State Payment Made</div>
    <div class="value">{paymentValues.q1StatePaymentMade || 'blank'}</div>
    <div class="field">Q2 State Payment Made</div>
    <div class="value">{formatCurrency(paymentValues.q2StatePaymentMade) || 'blank'}</div>
    <div class="field">Q3 State Payment Made</div>
    <div class="value">{formatCurrency(paymentValues.q3StatePaymentMade) || 'blank'}</div>
    <div class="divider"></div>

    <div class="section">PREFERENCES</div>
    <div class="field">Pay Preference</div>
    <div class="value">{paymentValues.payPreference || 'blank'}</div>
    <div class="field">Show Paid Dates</div>
    <div class="value">{paymentValues.showPaidDates === null ? 'blank' : paymentValues.showPaidDates}</div>
    <div class="divider"></div>

    <div class="section">FEDERAL CALCULATION</div>
    <div class="field">Adjusted Gross Income This Year</div>
    <div class="value">{formatCurrency(paymentValues.adjustedGrossIncomeThisYear) || 'blank'}</div>
    <div class="field">Taxable Federal Income This Year</div>
    <div class="value">{formatCurrency(paymentValues.taxableFederalIncomeThisYear) || 'blank'}</div>
    <div class="field">Safe Harbor Federal Taxes This Year</div>
    <div class="value">{formatCurrency(paymentValues.safeHarborFederalTaxesThisYear) || 'blank'}</div>
    <div class="field">Non Withheld Safe Harbor Federal Taxes This Year</div>
    <div class="value">{formatCurrency(paymentValues.nonWithheldSafeHarborFederalTaxThisYear) || 'blank'}</div>
    <div class="field">Safe To Skip Federal Payment</div>
    <div class="value">{paymentValues.safeToSkipFederalPayment === null ? 'blank' : paymentValues.safeToSkipFederalPayment}</div>
    <div class="divider"></div>

    {#if paymentValues.stateSupported}
      <div class="section">STATE CALCULATION</div>
      <div class="field">Adjusted Gross Income This Year</div>
      <div class="value">{formatCurrency(paymentValues.stateAdjustableGrossIncomeThisYear) || 'blank'}</div>
      <div class="field">Taxable Federal Income This Year</div>
      <div class="value">{formatCurrency(paymentValues.taxableStateIncomeThisYear) || 'blank'}</div>
      <div class="field">Safe Harbor Federal Taxes This Year</div>
      <div class="value">{formatCurrency(paymentValues.safeHarborStateTaxesThisYear) || 'blank'}</div>
      <div class="field">Non Withheld Safe Harbor Federal Taxes This Year</div>
      <div class="value">{formatCurrency(paymentValues.nonWithheldSafeHarborStateTaxThisYear) || 'blank'}</div>
      <div class="field">Safe To Skip Federal Payment</div>
      <div class="value">{paymentValues.safeToSkipStatePayment === null ? 'blank' : paymentValues.safeToSkipStatePayment}</div>
      <div class="divider"></div>
    {/if}

    {#if paymentValues.payPreference === 'single'}
      <div class="section">FEDERAL SINGLE PAYMENTS</div>
      <div class="field">Federal Due</div>
      <div class="value">{formatCurrency(paymentValues.singleFederalDue) || 'blank'}</div> 
      <div class="field">Federal Paid</div>
      <div class="value">{formatCurrency(paymentValues.singleFederalPaid) || 'blank'}</div>
      <div class="field">Federal Remaining</div>
      <div class="value">{formatCurrency(paymentValues.singleFederalRemaining) || 'blank'}</div>
      <div class="field">Federal Mark Paid</div>
      <div class="value">{paymentValues.singleFederalMarkPaid === null ? 'blank' : paymentValues.singleFederalMarkPaid}</div>
      <div class="field">Federal Paid Date</div>
      <div class="value">{paymentValues.singleFederalPaidDate || 'blank'}</div>
      <div class="divider"></div>
    {/if}

    {#if paymentValues.stateSupported && paymentValues.payPreference === 'single'}
      <div class="section">STATE SINGLE PAYMENTS</div>
      <div class="field">Current State</div>
      <div class="value">{paymentValues.currentState || 'blank'}</div> 
      <div class="field">State Due</div>
      <div class="value">{formatCurrency(paymentValues.singleStateDue) || 'blank'}</div> 
      <div class="field">State Paid</div>
      <div class="value">{formatCurrency(paymentValues.singleStatePaid) || 'blank'}</div>
      <div class="field">State Remaining</div>
      <div class="value">{formatCurrency(paymentValues.singleStateRemaining) || 'blank'}</div>
      <div class="field">State Mark Paid</div>
      <div class="value">{paymentValues.singleStateMarkPaid === null ? 'blank' : paymentValues.singleStateMarkPaid}</div>
      <div class="field">State Paid Date</div>
      <div class="value">{paymentValues.singleStatePaidDate || 'blank'}</div>
      <div class="divider"></div>
    {/if}

    {#if paymentValues.payPreference === 'quarter'}
      <div class="section">FEDERAL QUARTERLY PAYMENTS</div>
      <div class="field">Q1 Federal Payment</div>
      <div class="value">{formatCurrency(paymentValues.q1federalQuarterlyPayment) || 'blank'}</div> 
      <div class="field">Q2 Federal Payment</div>
      <div class="value">{formatCurrency(paymentValues.q2federalQuarterlyPayment) || 'blank'}</div>
      <div class="field">Q3 Federal Payment</div>
      <div class="value">{formatCurrency(paymentValues.q3federalQuarterlyPayment) || 'blank'}</div>
      <div class="field">Q4 Federal Payment</div>
      <div class="value">{formatCurrency(paymentValues.q4federalQuarterlyPayment) || 'blank'}</div>
      <div class="field">Q1 Federal Mark Paid</div>
      <div class="value">{paymentValues.q1FederalMarkPaid === null ? 'blank' : paymentValues.q1FederalMarkPaid}</div>
      <div class="field">Q2 Federal Mark Paid</div>
      <div class="value">{paymentValues.q2FederalMarkPaid === null ? 'blank' : paymentValues.q2FederalMarkPaid}</div>
      <div class="field">Q3 Federal Mark Paid</div>
      <div class="value">{paymentValues.q3FederalMarkPaid === null ? 'blank' : paymentValues.q3FederalMarkPaid}</div>
      <div class="field">Q4 Federal Mark Paid</div>
      <div class="value">{paymentValues.q4FederalMarkPaid === null ? 'blank' : paymentValues.q4FederalMarkPaid}</div>
      <div class="field">Q1 Federal Paid Date</div>
      <div class="value">{paymentValues.q1FederalPaidDate || 'blank'}</div>
      <div class="field">Q2 Federal Paid Date</div>
      <div class="value">{paymentValues.q2FederalPaidDate || 'blank'}</div>
      <div class="field">Q3 Federal Paid Date</div>
      <div class="value">{paymentValues.q3FederalPaidDate || 'blank'}</div>
      <div class="field">Q4 Federal Paid Date</div>
      <div class="value">{paymentValues.q4FederalPaidDate || 'blank'}</div>
      <div class="divider"></div>
    {/if}

    {#if paymentValues.stateSupported && paymentValues.payPreference === 'quarter'}
      <div class="section">STATE QUARTERLY PAYMENTS</div>
      <div class="field">Federal Due</div>
      <div class="value">{formatCurrency(paymentValues.q1StateQuarterlyPayment) || 'blank'}</div> 
      <div class="field">Q2 Federal Payment</div>
      <div class="value">{formatCurrency(paymentValues.q2StateQuarterlyPayment) || 'blank'}</div>
      <div class="field">Q3 Federal Payment</div>
      <div class="value">{formatCurrency(paymentValues.q3StateQuarterlyPayment) || 'blank'}</div>
      <div class="field">Q4 Federal Payment</div>
      <div class="value">{formatCurrency(paymentValues.q4StateQuarterlyPayment) || 'blank'}</div>
      <div class="field">Q1 Federal Mark Paid</div>
      <div class="value">{paymentValues.q1StateMarkPaid === null ? 'blank' : paymentValues.q1StateMarkPaid}</div>
      <div class="field">Q2 Federal Mark Paid</div>
      <div class="value">{paymentValues.q2StateMarkPaid === null ? 'blank' : paymentValues.q2StateMarkPaid}</div>
      <div class="field">Q3 Federal Mark Paid</div>
      <div class="value">{paymentValues.q3StateMarkPaid === null ? 'blank' : paymentValues.q3StateMarkPaid}</div>
      <div class="field">Q4 Federal Mark Paid</div>
      <div class="value">{paymentValues.q4StateMarkPaid === null ? 'blank' : paymentValues.q4StateMarkPaid}</div>
      <div class="field">Q1 Federal Paid Date</div>
      <div class="value">{paymentValues.q1StatePaidDate || 'blank'}</div>
      <div class="field">Q2 Federal Paid Date</div>
      <div class="value">{paymentValues.q2StatePaidDate || 'blank'}</div>
      <div class="field">Q3 Federal Paid Date</div>
      <div class="value">{paymentValues.q3StatePaidDate || 'blank'}</div>
      <div class="field">Q4 Federal Paid Date</div>
      <div class="value">{paymentValues.q4StatePaidDate || 'blank'}</div>
      <div class="divider"></div>
    {/if}

    <div class="section">EXPLANATION</div>
    <div class="field">Explanation</div>
    <div class="explanationcontainer">
      <div class="explanation">{paymentValues.explanation || 'blank'}</div> 
    </div>

  {:else}
    <div class="section">NO PAYMENT VALUES</div>
  {/if}
</div>

<style>
  .container {
    margin-bottom: 50px;
  }
  .section {
    margin-top: 15px;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    text-align: center;
    font-weight: var(--bold);
  }
  .field {
    margin-top: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    text-align: center;
    color: var(--gray4);
  }
  .value {
    margin-top: 2px;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    text-align: center;
  }
  .divider {
    width: 320px;
    margin-left: auto;
    margin-right: auto;
    height: 1px;
    background-color: var(--gray3);
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .taxyears {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    width: 320px;
  }
  .taxyear {
    margin-top: 10px;
    font-size: 16px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .current {
    text-decoration: underline;
  }
  .explanationcontainer {
    display: flex;
    justify-content: center;
  }
  .explanation {
    max-width: 500px;
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
  }
  @media (min-width: 768px) { 
  .divider {
    max-width: 400px;
  }
  .taxyears {
    width: 400px;
  }
}
</style>