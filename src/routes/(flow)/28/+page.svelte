<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { store } from '$src/stores/store.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { getFederalTaxes, getFederalQuarterlyPayment, getFederalSinglePayment } from '$src/utilities/federaltax'
  import { getStateTaxes, getStateQuarterlyPayment, getStateSinglePayment } from '$src/utilities/statetax'

  onMount(() => {
    if (store.payPreference == 'single') {
      let federalTaxes = getFederalTaxes(store.incomeExpectationThisYear, store.federalTaxPaidLastYear, store.adjustedGrossIncomeLastYear, store.filingStatus, store.expectedTotalIncomeThisYear, store.businessExpensesThisYear, store.retirementContributionsThisYear, store.studentLoanInterestThisYear, store.healthInsuranceThisYear, store.otherDeductionsThisYear)
      let federalSinglePayment = getFederalSinglePayment(federalTaxes.safeHarborFederalTaxesThisYear, store.federalWithholdingsThisYear, store.q1FederalPaymentMade, store.q2FederalPaymentMade, store.q3FederalPaymentMade, federalTaxes.initialExplanation)

      store.adjustedGrossIncomeThisYear = federalTaxes.adjustedGrossIncomeThisYear
      store.taxableFederalIncomeThisYear = federalTaxes.taxableFederalIncomeThisYear
      store.safeHarborFederalTaxesThisYear = federalTaxes.safeHarborFederalTaxesThisYear

      store.singleFederalDue = federalSinglePayment.due
      store.singleFederalPaid = federalSinglePayment.paid
      store.singleFederalRemaining = federalSinglePayment.remaining
      store.explanation = federalSinglePayment.explanation


      if (store.stateSupported) {
        let stateTaxes = getStateTaxes(store.currentState, store.incomeExpectationThisYear, store.stateTaxPaidLastYear, store.stateIncomeLastYear, store.filingStatus, store.expectedTotalIncomeThisYear, store.businessExpensesThisYear, store.retirementContributionsThisYear, store.studentLoanInterestThisYear, store.healthInsuranceThisYear, store.otherDeductionsThisYear, store.exemptions)
        let stateSinglePayment = getStateSinglePayment(store.currentState, stateTaxes.safeHarborStateTaxesThisYear, store.stateWithholdingsThisYear, store.q1StatePaymentMade, store.q2StatePaymentMade, store.q3StatePaymentMade, stateTaxes.initialExplanation)

        store.stateAdjustableGrossIncomeThisYear = stateTaxes.stateAdjustableGrossIncomeThisYear
        store.taxableStateIncomeThisYear = stateTaxes.taxableStateIncomeThisYear
        store.safeHarborStateTaxesThisYear = stateTaxes.safeHarborStateTaxesThisYear

        store.singleStateDue = stateSinglePayment.due
        store.singleStatePaid = stateSinglePayment.paid
        store.singleStateRemaining = stateSinglePayment.remaining
        store.explanation += `\n \n${stateSinglePayment.explanation}`  
      }
    }
    else {
      let federalTaxes = getFederalTaxes(store.incomeExpectationThisYear, store.federalTaxPaidLastYear, store.adjustedGrossIncomeLastYear, store.filingStatus, store.expectedTotalIncomeThisYear, store.businessExpensesThisYear, store.retirementContributionsThisYear, store.studentLoanInterestThisYear, store.healthInsuranceThisYear, store.otherDeductionsThisYear)
      let federalQuarterlyPayments = getFederalQuarterlyPayment(store.currentQuarter, federalTaxes.safeHarborFederalTaxesThisYear, store.federalWithholdingsThisYear, store.q1FederalPaymentMade, store.q2FederalPaymentMade, store.q3FederalPaymentMade, federalTaxes.initialExplanation)

      store.adjustedGrossIncomeThisYear = federalTaxes.adjustedGrossIncomeThisYear
      store.taxableFederalIncomeThisYear = federalTaxes.taxableFederalIncomeThisYear
      store.safeHarborFederalTaxesThisYear = federalTaxes.safeHarborFederalTaxesThisYear

      store.nonWithheldSafeHarborFederalTaxThisYear = federalQuarterlyPayments.nonWithheldSafeHarborFederalTaxThisYear
      store.safeToSkipFederalPayment = federalQuarterlyPayments.safeToSkipFederalPayment
      store.q1federalQuarterlyPayment = federalQuarterlyPayments.q1federalQuarterlyPayment
      store.q2federalQuarterlyPayment = federalQuarterlyPayments.q2federalQuarterlyPayment
      store.q3federalQuarterlyPayment = federalQuarterlyPayments.q3federalQuarterlyPayment
      store.q4federalQuarterlyPayment = federalQuarterlyPayments.q4federalQuarterlyPayment
      store.explanation = federalQuarterlyPayments.explanation

      if (store.stateSupported) {
        let stateTaxes = getStateTaxes(store.currentState, store.incomeExpectationThisYear, store.stateTaxPaidLastYear, store.stateIncomeLastYear, store.filingStatus, store.expectedTotalIncomeThisYear, store.businessExpensesThisYear, store.retirementContributionsThisYear, store.studentLoanInterestThisYear, store.healthInsuranceThisYear, store.otherDeductionsThisYear, store.exemptions)
        let stateQuarterlyPayments = getStateQuarterlyPayment(store.currentState, store.currentQuarter, stateTaxes.safeHarborStateTaxesThisYear, store.stateWithholdingsThisYear, store.q1StatePaymentMade, store.q2StatePaymentMade, store.q3StatePaymentMade, stateTaxes.initialExplanation)

        store.stateAdjustableGrossIncomeThisYear = stateTaxes.stateAdjustableGrossIncomeThisYear
        store.taxableStateIncomeThisYear = stateTaxes.taxableStateIncomeThisYear
        store.safeHarborStateTaxesThisYear = stateTaxes.safeHarborStateTaxesThisYear

        store.nonWithheldSafeHarborStateTaxThisYear = stateQuarterlyPayments.nonWithheldSafeHarborStateTaxThisYear
        store.safeToSkipStatePayment = stateQuarterlyPayments.safeToSkipStatePayment 
        store.q1StateQuarterlyPayment = stateQuarterlyPayments.q1StateQuarterlyPayment
        store.q2StateQuarterlyPayment = stateQuarterlyPayments.q2StateQuarterlyPayment
        store.q3StateQuarterlyPayment = stateQuarterlyPayments.q3StateQuarterlyPayment
        store.q4StateQuarterlyPayment = stateQuarterlyPayments.q4StateQuarterlyPayment
        store.explanation += `\n \n${stateQuarterlyPayments.explanation}`
      }
    }
    
    setTimeout(() => {
      if (store.loggedIn && store.active == true) {
        store.currentPage = 'dashboard'
        goto('/dashboard')
      }
      else { 
        store.currentPage = '29'
        goto('/29')
      }
      store.sendDashboardEmail = true
    }, 2000)
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading text="CALCULATING..." />
