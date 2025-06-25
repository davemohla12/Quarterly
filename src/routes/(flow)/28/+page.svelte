<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { getFederalTaxes, getFederalQuarterlyPayment, getFederalSinglePayment } from '$src/utilities/federaltax'
  import { getStateTaxes, getStateQuarterlyPayment, getStateSinglePayment } from '$src/utilities/statetax'
  import { currentTaxQuarter, currentTaxYear } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'

  onMount(async () => {
    await payment.setValue('taxYear', currentTaxYear)
    if (await payment.getValue('payPreference') == 'single') {
      let federalTaxes = getFederalTaxes(await payment.getValue('incomeExpectationThisYear'), await payment.getValue('federalTaxPaidLastYear'), await payment.getValue('adjustedGrossIncomeLastYear'), await payment.getValue('filingStatus'), await payment.getValue('expectedTotalIncomeThisYear'), await payment.getValue('businessExpensesThisYear'), await payment.getValue('retirementContributionsThisYear'), await payment.getValue('studentLoanInterestThisYear'), await payment.getValue('healthInsuranceThisYear'), await payment.getValue('otherDeductionsThisYear'))
      let federalSinglePayment = getFederalSinglePayment(federalTaxes.safeHarborFederalTaxesThisYear, await payment.getValue('federalWithholdingsThisYear'), await payment.getValue('q1FederalPaymentMade'), await payment.getValue('q2FederalPaymentMade'), await payment.getValue('q3FederalPaymentMade'), federalTaxes.initialExplanation)

      await payment.setValue('adjustedGrossIncomeThisYear', federalTaxes.adjustedGrossIncomeThisYear)
      await payment.setValue('taxableFederalIncomeThisYear', federalTaxes.taxableFederalIncomeThisYear)
      await payment.setValue('safeHarborFederalTaxesThisYear', federalTaxes.safeHarborFederalTaxesThisYear)

      await payment.setValue('singleFederalDue', federalSinglePayment.due)
      await payment.setValue('singleFederalPaid', federalSinglePayment.paid)
      await payment.setValue('singleFederalRemaining', federalSinglePayment.remaining)
      await payment.setValue('explanation', federalSinglePayment.explanation)

      if (await payment.getValue('stateSupported')) {
        let stateTaxes = getStateTaxes(await payment.getValue('currentState'), await payment.getValue('incomeExpectationThisYear'), await payment.getValue('stateTaxPaidLastYear'), await payment.getValue('stateIncomeLastYear'), await payment.getValue('filingStatus'), await payment.getValue('expectedTotalIncomeThisYear'), await payment.getValue('businessExpensesThisYear'), await payment.getValue('retirementContributionsThisYear'), await payment.getValue('studentLoanInterestThisYear'), await payment.getValue('healthInsuranceThisYear'), await payment.getValue('otherDeductionsThisYear'), await payment.getValue('exemptions'))
        let stateSinglePayment = getStateSinglePayment(await payment.getValue('currentState'), stateTaxes.safeHarborStateTaxesThisYear, await payment.getValue('stateWithholdingsThisYear'), await payment.getValue('q1StatePaymentMade'), await payment.getValue('q2StatePaymentMade'), await payment.getValue('q3StatePaymentMade'), stateTaxes.initialExplanation)

        await payment.setValue('stateAdjustableGrossIncomeThisYear', stateTaxes.stateAdjustableGrossIncomeThisYear)
        await payment.setValue('taxableStateIncomeThisYear', stateTaxes.taxableStateIncomeThisYear)
        await payment.setValue('safeHarborStateTaxesThisYear', stateTaxes.safeHarborStateTaxesThisYear)

        await payment.setValue('singleStateDue', stateSinglePayment.due)
        await payment.setValue('singleStatePaid', stateSinglePayment.paid)
        await payment.setValue('singleStateRemaining', stateSinglePayment.remaining)
        await payment.setValue('explanation', `${await payment.getValue('explanation')}\n \n${stateSinglePayment.explanation}`)
      }
    }
    else {
      let federalTaxes = getFederalTaxes(await payment.getValue('incomeExpectationThisYear'), await payment.getValue('federalTaxPaidLastYear'), await payment.getValue('adjustedGrossIncomeLastYear'), await payment.getValue('filingStatus'), await payment.getValue('expectedTotalIncomeThisYear'), await payment.getValue('businessExpensesThisYear'), await payment.getValue('retirementContributionsThisYear'), await payment.getValue('studentLoanInterestThisYear'), await payment.getValue('healthInsuranceThisYear'), await payment.getValue('otherDeductionsThisYear'))
      let federalQuarterlyPayments = getFederalQuarterlyPayment(currentTaxQuarter, federalTaxes.safeHarborFederalTaxesThisYear, await payment.getValue('federalWithholdingsThisYear'), await payment.getValue('q1FederalPaymentMade'), await payment.getValue('q2FederalPaymentMade'), await payment.getValue('q3FederalPaymentMade'), federalTaxes.initialExplanation)

      await payment.setValue('adjustedGrossIncomeThisYear', federalTaxes.adjustedGrossIncomeThisYear)
      await payment.setValue('taxableFederalIncomeThisYear', federalTaxes.taxableFederalIncomeThisYear)
      await payment.setValue('safeHarborFederalTaxesThisYear', federalTaxes.safeHarborFederalTaxesThisYear)

      await payment.setValue('nonWithheldSafeHarborFederalTaxThisYear', federalQuarterlyPayments.nonWithheldSafeHarborFederalTaxThisYear)
      await payment.setValue('safeToSkipFederalPayment', federalQuarterlyPayments.safeToSkipFederalPayment)
      await payment.setValue('q1federalQuarterlyPayment', federalQuarterlyPayments.q1federalQuarterlyPayment)
      await payment.setValue('q2federalQuarterlyPayment', federalQuarterlyPayments.q2federalQuarterlyPayment)
      await payment.setValue('q3federalQuarterlyPayment', federalQuarterlyPayments.q3federalQuarterlyPayment)
      await payment.setValue('q4federalQuarterlyPayment', federalQuarterlyPayments.q4federalQuarterlyPayment)
      await payment.setValue('explanation', federalQuarterlyPayments.explanation)

      if (await payment.getValue('stateSupported')) {
        let stateTaxes = getStateTaxes(await payment.getValue('currentState'), await payment.getValue('incomeExpectationThisYear'), await payment.getValue('stateTaxPaidLastYear'), await payment.getValue('stateIncomeLastYear'), await payment.getValue('filingStatus'), await payment.getValue('expectedTotalIncomeThisYear'), await payment.getValue('businessExpensesThisYear'), await payment.getValue('retirementContributionsThisYear'), await payment.getValue('studentLoanInterestThisYear'), await payment.getValue('healthInsuranceThisYear'), await payment.getValue('otherDeductionsThisYear'), await payment.getValue('exemptions'))
        let stateQuarterlyPayments = getStateQuarterlyPayment(await payment.getValue('currentState'), currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, await payment.getValue('stateWithholdingsThisYear'), await payment.getValue('q1StatePaymentMade'), await payment.getValue('q2StatePaymentMade'), await payment.getValue('q3StatePaymentMade'), stateTaxes.initialExplanation)

        await payment.setValue('stateAdjustableGrossIncomeThisYear', stateTaxes.stateAdjustableGrossIncomeThisYear)
        await payment.setValue('taxableStateIncomeThisYear', stateTaxes.taxableStateIncomeThisYear)
        await payment.setValue('safeHarborStateTaxesThisYear', stateTaxes.safeHarborStateTaxesThisYear)

        await payment.setValue('nonWithheldSafeHarborStateTaxThisYear', stateQuarterlyPayments.nonWithheldSafeHarborStateTaxThisYear)
        await payment.setValue('safeToSkipStatePayment', stateQuarterlyPayments.safeToSkipStatePayment)
        await payment.setValue('q1StateQuarterlyPayment', stateQuarterlyPayments.q1StateQuarterlyPayment)
        await payment.setValue('q2StateQuarterlyPayment', stateQuarterlyPayments.q2StateQuarterlyPayment)
        await payment.setValue('q3StateQuarterlyPayment', stateQuarterlyPayments.q3StateQuarterlyPayment)
        await payment.setValue('q4StateQuarterlyPayment', stateQuarterlyPayments.q4StateQuarterlyPayment)
        await payment.setValue('explanation', `${await payment.getValue('explanation')}\n \n${stateQuarterlyPayments.explanation}`)
      }
    }
    setTimeout(async () => {
      if (global.loggedIn && await user.getValue('latestTaxYearPaid') == currentTaxYear) {
        goto('/dashboard')
        await user.setValue('currentPage', 'dashboard')

      }
      else { 
        goto('/29')
        await user.setValue('currentPage', '29')
      }
      await user.setValue('sendDashboardEmail', true)
    }, 2000)
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading text="CALCULATING..." />
