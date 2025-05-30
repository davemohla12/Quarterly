<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { store } from '$src/stores/store.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { getFederalTaxes, getFederalQuarterlyPayment } from '$src/utilities/federaltax'
  import { getStateTaxes, getStateQuarterlyPayment } from '$src/utilities/statetax'

  onMount(() => {
    let federalTaxes = getFederalTaxes(store.incomeExpectationThisYear, store.federalTaxPaidLastYear, store.adjustedGrossIncomeLastYear, store.filingStatus, store.expectedTotalIncomeThisYear, store.businessExpensesThisYear, store.retirementContributionsThisYear, store.studentLoanInterestThisYear, store.healthInsuranceThisYear, store.otherDeductionsThisYear)
    let federalPayments = getFederalQuarterlyPayment(store.currentQuarter, federalTaxes.safeHarborFederalTaxesThisYear, store.federalWithholdingsThisYear, store.q1FederalPaymentMade, store.q2FederalPaymentMade, store.q3FederalPaymentMade)
    
    store.adjustedGrossIncomeThisYear = federalTaxes.adjustedGrossIncomeThisYear
    store.taxableFederalIncomeThisYear = federalTaxes.taxableFederalIncomeThisYear
    store.safeHarborFederalTaxesThisYear = federalTaxes.safeHarborFederalTaxesThisYear

    store.nonWithheldSafeHarborFederalTaxThisYear = federalPayments.nonWithheldSafeHarborFederalTaxThisYear
    store.safeToSkipFederalPayment = federalPayments.safeToSkipFederalPayment
    store.q1federalQuarterlyPayment = federalPayments.q1federalQuarterlyPayment
    store.q2federalQuarterlyPayment = federalPayments.q2federalQuarterlyPayment
    store.q3federalQuarterlyPayment = federalPayments.q3federalQuarterlyPayment
    store.q4federalQuarterlyPayment = federalPayments.q4federalQuarterlyPayment

    let stateTaxes = getStateTaxes(store.currentState, store.incomeExpectationThisYear, store.stateTaxPaidLastYear, store.stateIncomeLastYear, store.filingStatus, store.expectedTotalIncomeThisYear, store.businessExpensesThisYear, store.retirementContributionsThisYear, store.studentLoanInterestThisYear, store.healthInsuranceThisYear, store.otherDeductionsThisYear, store.exemptions)
    let statePayments = getStateQuarterlyPayment(store.currentState, store.currentQuarter, stateTaxes.safeHarborStateTaxesThisYear, store.stateWithholdingsThisYear, store.q1StatePaymentMade, store.q2StatePaymentMade, store.q3StatePaymentMade)

    store.stateAdjustableGrossIncomeThisYear = stateTaxes.stateAdjustableGrossIncomeThisYear
    store.taxableStateIncomeThisYear = stateTaxes.taxableStateIncomeThisYear
    store.safeHarborStateTaxesThisYear = stateTaxes.safeHarborStateTaxesThisYear

    store.nonWithheldSafeHarborStateTaxThisYear = statePayments.nonWithheldSafeHarborStateTaxThisYear
    store.safeToSkipStatePayment = statePayments.safeToSkipStatePayment 
    store.q1StateQuarterlyPayment = statePayments.q1StateQuarterlyPayment
    store.q2StateQuarterlyPayment = statePayments.q2StateQuarterlyPayment
    store.q3StateQuarterlyPayment = statePayments.q3StateQuarterlyPayment
    store.q4StateQuarterlyPayment = statePayments.q4StateQuarterlyPayment
    
    setTimeout(() => {
      store.currentPage = '29'
      goto('/29')
    }, 2000)
  })
</script>

<Header />
<Avatar />
<Loading text="CALCULATING..." />
