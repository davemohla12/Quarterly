<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { getFederalTaxes, getFederalQuarterlyPayment, getFederalSinglePayment } from '$src/utilities/federaltax'
  import { getStateTaxes, getStateQuarterlyPayment, getStateSinglePayment, getMultiStateTaxes, getMultiStatePayments } from '$src/utilities/statetax'
  import { currentTaxQuarter, currentTaxYear } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'
  import { setLocalStorage } from '$src/utilities/utilities'
  import { getBelowFederalMinimumTaxText } from '$src/utilities/federaltax'
  import { getNoStateTaxesText, stateBelowMinimumTaxText, getNoneOfStatesTaxesText } from '$src/utilities/statetax'
  import { getAllPaymentValues } from '$src/utilities/database'
  import { savePaymentValues } from '$src/utilities/database'
  import { saveLocalStorageValues } from '$src/utilities/utilities'

  let taxYear = $state()
  let payPreference = $state()
  let currentState = $state()
  let livedInCurrentStateAllLastYear = $state()
  let stateHasQuarterlyTaxes = $state()
  let safeToSkipFederalPayment = $state()
  let singleFederalDue = $state()
  let singleFederalPaid = $state()
  let singleFederalRemaining = $state()
  let explanation = $state()
  let incomeExpectationThisYear = $state()
  let federalTaxPaidLastYear = $state()
  let adjustedGrossIncomeLastYear = $state()
  let filingStatus = $state()
  let expectedTotalIncomeThisYear = $state()
  let expectedSelfEmploymentIncomeThisYear = $state()
  let businessExpensesThisYear = $state()
  let retirementContributionsThisYear = $state()
  let studentLoanInterestThisYear = $state()
  let healthInsuranceThisYear = $state()
  let otherDeductionsThisYear = $state()
  let exemptions = $state()
  let federalWithholdingsThisYear = $state()
  let q1FederalPaymentMade = $state()
  let q2FederalPaymentMade = $state()
  let q3FederalPaymentMade = $state()
  let adjustedGrossIncomeThisYear = $state()
  let taxableFederalIncomeThisYear = $state()
  let safeHarborFederalTaxesThisYear = $state()
  let totalFederalTaxLiability = $state()
  let stateSupported = $state()
  let livingInCurrentStateAllThisYear = $state()
  let stateTaxPaidLastYear = $state()
  let stateIncomeLastYear = $state()
  let stateWithholdingsThisYear = $state()
  let q1StatePaymentMade = $state()
  let q2StatePaymentMade = $state()
  let q3StatePaymentMade = $state()
  let stateAdjustableGrossIncomeThisYear = $state()
  let taxableStateIncomeThisYear = $state()
  let safeHarborStateTaxesThisYear = $state()
  let totalStateTaxLiability = $state()
  let safeToSkipStatePayment = $state()
  let singleStateDue = $state()
  let singleStatePaid = $state()
  let singleStateRemaining = $state()
  let q1federalQuarterlyPayment = $state()
  let q2federalQuarterlyPayment = $state()
  let q3federalQuarterlyPayment = $state()
  let q4federalQuarterlyPayment = $state()
  let q1StateQuarterlyPayment = $state()
  let q2StateQuarterlyPayment = $state()
  let q3StateQuarterlyPayment = $state()
  let q4StateQuarterlyPayment = $state()
  let q1State = $state()
  let q2State = $state()
  let q3State = $state()
  let q4State = $state()
  let otherStatesToPay = $state()

  onMount(async () => {
    if (global.loggedIn) {
      const paymentValues = await getAllPaymentValues(global.email, currentTaxYear)
      payPreference = paymentValues?.payPreference
      currentState = paymentValues?.currentState
      stateSupported = paymentValues?.stateSupported
      livedInCurrentStateAllLastYear = paymentValues?.livedInCurrentStateAllLastYear
      stateHasQuarterlyTaxes = paymentValues?.stateHasQuarterlyTaxes
      safeToSkipFederalPayment = paymentValues?.safeToSkipFederalPayment
      incomeExpectationThisYear = paymentValues?.incomeExpectationThisYear
      federalTaxPaidLastYear = paymentValues?.federalTaxPaidLastYear
      adjustedGrossIncomeLastYear = paymentValues?.adjustedGrossIncomeLastYear
      filingStatus = paymentValues?.filingStatus
      expectedTotalIncomeThisYear = paymentValues?.expectedTotalIncomeThisYear 
      expectedSelfEmploymentIncomeThisYear = paymentValues?.expectedSelfEmploymentIncomeThisYear 
      businessExpensesThisYear = paymentValues?.businessExpensesThisYear 
      retirementContributionsThisYear = paymentValues?.retirementContributionsThisYear 
      studentLoanInterestThisYear = paymentValues?.studentLoanInterestThisYear 
      healthInsuranceThisYear = paymentValues?.healthInsuranceThisYear 
      otherDeductionsThisYear = paymentValues?.otherDeductionsThisYear 
      exemptions = paymentValues?.exemptions
      federalWithholdingsThisYear = paymentValues?.federalWithholdingsThisYear 
      q1FederalPaymentMade = paymentValues?.q1FederalPaymentMade 
      q2FederalPaymentMade = paymentValues?.q2FederalPaymentMade 
      q3FederalPaymentMade = paymentValues?.q3FederalPaymentMade 
      livingInCurrentStateAllThisYear = paymentValues?.livingInCurrentStateAllThisYear
      stateTaxPaidLastYear = paymentValues?.stateTaxPaidLastYear
      stateIncomeLastYear = paymentValues?.stateIncomeLastYear 
      stateWithholdingsThisYear = paymentValues?.stateWithholdingsThisYear
      q1StatePaymentMade = paymentValues?.q1StatePaymentMade 
      q2StatePaymentMade = paymentValues?.q2StatePaymentMade 
      q3StatePaymentMade = paymentValues?.q3StatePaymentMade 
      safeToSkipStatePayment = paymentValues?.safeToSkipStatePayment
      q1State = paymentValues?.q1State
      q2State = paymentValues?.q2State
      q3State = paymentValues?.q3State
      q4State = paymentValues?.q4State
    }
    else {
      payPreference = await payment.getValue('payPreference')
      currentState = await payment.getValue('currentState')
      stateSupported = await payment.getValue('stateSupported')
      livedInCurrentStateAllLastYear = await payment.getValue('livedInCurrentStateAllLastYear')
      stateHasQuarterlyTaxes = await payment.getValue('stateHasQuarterlyTaxes')
      safeToSkipFederalPayment = await payment.getValue('safeToSkipFederalPayment')
      incomeExpectationThisYear = await payment.getValue('incomeExpectationThisYear')
      federalTaxPaidLastYear = await payment.getValue('federalTaxPaidLastYear')
      adjustedGrossIncomeLastYear = await payment.getValue('adjustedGrossIncomeLastYear')
      filingStatus = await payment.getValue('filingStatus')
      expectedTotalIncomeThisYear = await payment.getValue('expectedTotalIncomeThisYear') 
      expectedSelfEmploymentIncomeThisYear = await payment.getValue('expectedSelfEmploymentIncomeThisYear') 
      businessExpensesThisYear = await payment.getValue('businessExpensesThisYear') 
      retirementContributionsThisYear = await payment.getValue('retirementContributionsThisYear') 
      studentLoanInterestThisYear = await payment.getValue('studentLoanInterestThisYear') 
      healthInsuranceThisYear = await payment.getValue('healthInsuranceThisYear') 
      otherDeductionsThisYear = await payment.getValue('otherDeductionsThisYear') 
      exemptions = await payment.getValue('exemptions')
      federalWithholdingsThisYear = await payment.getValue('federalWithholdingsThisYear')
      q1FederalPaymentMade = await payment.getValue('q1FederalPaymentMade') 
      q2FederalPaymentMade = await payment.getValue('q2FederalPaymentMade') 
      q3FederalPaymentMade = await payment.getValue('q3FederalPaymentMade') 
      livingInCurrentStateAllThisYear = await payment.getValue('livingInCurrentStateAllThisYear')
      stateTaxPaidLastYear = await payment.getValue('stateTaxPaidLastYear') 
      stateIncomeLastYear = await payment.getValue('stateIncomeLastYear') 
      stateWithholdingsThisYear = await payment.getValue('stateWithholdingsThisYear') 
      q1StatePaymentMade = await payment.getValue('q1StatePaymentMade')  
      q2StatePaymentMade = await payment.getValue('q2StatePaymentMade')
      q3StatePaymentMade = await payment.getValue('q3StatePaymentMade') 
      safeToSkipStatePayment = await payment.getValue('safeToSkipStatePayment')
      q1State = await payment.getValue('q1State')
      q2State = await payment.getValue('q2State')
      q3State = await payment.getValue('q3State')
      q4State = await payment.getValue('q4State')
    }
    taxYear = currentTaxYear
    if (payPreference == 'single') {
      if (safeToSkipFederalPayment) {
        singleFederalDue = 0
        singleFederalPaid = 0
        singleFederalRemaining = 0
        explanation = getBelowFederalMinimumTaxText()
        if (global.loggedIn) {
          await savePaymentValues({ taxYear, singleFederalDue, singleFederalPaid, singleFederalRemaining, explanation })
        }
        else {
          await saveLocalStorageValues({ taxYear, singleFederalDue, singleFederalPaid, singleFederalRemaining, explanation })
        }
      }
      else { 
        let federalTaxes = getFederalTaxes(incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, expectedSelfEmploymentIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear)
        let federalSinglePayment = getFederalSinglePayment(federalTaxes.safeHarborFederalTaxesThisYear, federalWithholdingsThisYear, q1FederalPaymentMade, q2FederalPaymentMade, q3FederalPaymentMade, federalTaxes.initialExplanation)

        adjustedGrossIncomeThisYear = federalTaxes.adjustedGrossIncomeThisYear
        taxableFederalIncomeThisYear = federalTaxes.taxableFederalIncomeThisYear
        safeHarborFederalTaxesThisYear = federalTaxes.safeHarborFederalTaxesThisYear

        totalFederalTaxLiability = federalSinglePayment.totalFederalTaxLiability
        singleFederalDue = federalSinglePayment.due
        singleFederalPaid = federalSinglePayment.paid
        singleFederalRemaining = federalSinglePayment.remaining
        explanation = federalSinglePayment.explanation
        if (global.loggedIn) {
          await savePaymentValues({ taxYear, adjustedGrossIncomeThisYear, taxableFederalIncomeThisYear, safeHarborFederalTaxesThisYear, totalFederalTaxLiability, singleFederalDue, singleFederalPaid, singleFederalRemaining, explanation })
        }
        else {
          await saveLocalStorageValues({ taxYear, adjustedGrossIncomeThisYear, taxableFederalIncomeThisYear, safeHarborFederalTaxesThisYear, totalFederalTaxLiability, singleFederalDue, singleFederalPaid, singleFederalRemaining, explanation })
        }
      }
      if (stateSupported) {
        let stateTaxes = getStateTaxes(currentState, livedInCurrentStateAllLastYear, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
        let stateSinglePayment = getStateSinglePayment(currentState, stateTaxes.safeHarborStateTaxesThisYear, stateWithholdingsThisYear, q1StatePaymentMade, q2StatePaymentMade, q3StatePaymentMade, stateTaxes.initialExplanation)

        stateAdjustableGrossIncomeThisYear = stateTaxes.stateAdjustableGrossIncomeThisYear
        taxableStateIncomeThisYear = stateTaxes.taxableStateIncomeThisYear
        safeHarborStateTaxesThisYear = stateTaxes.safeHarborStateTaxesThisYear

        totalStateTaxLiability = stateSinglePayment.totalStateTaxLiability
        singleStateDue = stateSinglePayment.due
        singleStatePaid = stateSinglePayment.paid
        singleStateRemaining = stateSinglePayment.remaining
        explanation = `${explanation}\n \n${stateSinglePayment.explanation}`
        if (global.loggedIn) {
          await savePaymentValues({ taxYear, stateAdjustableGrossIncomeThisYear, taxableStateIncomeThisYear, safeHarborStateTaxesThisYear, totalStateTaxLiability, singleStateDue, singleStatePaid, singleStateRemaining, explanation })
        }
        else {
          await saveLocalStorageValues({ taxYear, stateAdjustableGrossIncomeThisYear, taxableStateIncomeThisYear, safeHarborStateTaxesThisYear, totalStateTaxLiability, singleStateDue, singleStatePaid, singleStateRemaining, explanation })
        }
      }
    }
    else {
      if (safeToSkipFederalPayment) {
        q1federalQuarterlyPayment = 0
        q2federalQuarterlyPayment = 0
        q3federalQuarterlyPayment = 0
        q4federalQuarterlyPayment = 0
        explanation = getBelowFederalMinimumTaxText()
        if (global.loggedIn) {
          await savePaymentValues({ taxYear, q1federalQuarterlyPayment, q2federalQuarterlyPayment, q3federalQuarterlyPayment, q4federalQuarterlyPayment, explanation })
        }
        else {
          await saveLocalStorageValues({ taxYear, q1federalQuarterlyPayment, q2federalQuarterlyPayment, q3federalQuarterlyPayment, q4federalQuarterlyPayment, explanation })
        }
      }
      else { 
        let federalTaxes = getFederalTaxes(incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, expectedSelfEmploymentIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear)
        let federalQuarterlyPayments = getFederalQuarterlyPayment(currentTaxQuarter, federalTaxes.safeHarborFederalTaxesThisYear, federalWithholdingsThisYear, q1FederalPaymentMade, q2FederalPaymentMade, q3FederalPaymentMade, federalTaxes.initialExplanation)

        adjustedGrossIncomeThisYear = federalTaxes.adjustedGrossIncomeThisYear
        taxableFederalIncomeThisYear = federalTaxes.taxableFederalIncomeThisYear
        safeHarborFederalTaxesThisYear = federalTaxes.safeHarborFederalTaxesThisYear

        totalFederalTaxLiability = federalQuarterlyPayments.totalFederalTaxLiability
        safeToSkipFederalPayment = federalQuarterlyPayments.safeToSkipFederalPayment
        q1federalQuarterlyPayment = federalQuarterlyPayments.q1federalQuarterlyPayment
        q2federalQuarterlyPayment = federalQuarterlyPayments.q2federalQuarterlyPayment
        q3federalQuarterlyPayment = federalQuarterlyPayments.q3federalQuarterlyPayment
        q4federalQuarterlyPayment = federalQuarterlyPayments.q4federalQuarterlyPayment
        explanation = federalQuarterlyPayments.explanation
        if (global.loggedIn) {
          await savePaymentValues({ taxYear, adjustedGrossIncomeThisYear, taxableFederalIncomeThisYear, safeHarborFederalTaxesThisYear, totalFederalTaxLiability, safeToSkipFederalPayment, q1federalQuarterlyPayment, q2federalQuarterlyPayment, q3federalQuarterlyPayment, q4federalQuarterlyPayment, explanation })
        }
        else {
          await saveLocalStorageValues({ taxYear, adjustedGrossIncomeThisYear, taxableFederalIncomeThisYear, safeHarborFederalTaxesThisYear, totalFederalTaxLiability, safeToSkipFederalPayment, q1federalQuarterlyPayment, q2federalQuarterlyPayment, q3federalQuarterlyPayment, q4federalQuarterlyPayment, explanation })
        }
      }
      if (stateSupported) {
        if (livingInCurrentStateAllThisYear) {
          let stateTaxes = getStateTaxes(currentState, livedInCurrentStateAllLastYear, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
          let stateQuarterlyPayments = getStateQuarterlyPayment(currentState, currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, stateWithholdingsThisYear, q1StatePaymentMade, q2StatePaymentMade, q3StatePaymentMade, stateTaxes.initialExplanation)

          stateAdjustableGrossIncomeThisYear = stateTaxes.stateAdjustableGrossIncomeThisYear
          taxableStateIncomeThisYear = stateTaxes.taxableStateIncomeThisYear
          safeHarborStateTaxesThisYear = stateTaxes.safeHarborStateTaxesThisYear

          totalStateTaxLiability = stateQuarterlyPayments.totalStateTaxLiability
          safeToSkipStatePayment = stateQuarterlyPayments.safeToSkipStatePayment
          q1StateQuarterlyPayment = stateQuarterlyPayments.q1StateQuarterlyPayment
          q2StateQuarterlyPayment = stateQuarterlyPayments.q2StateQuarterlyPayment
          q3StateQuarterlyPayment = stateQuarterlyPayments.q3StateQuarterlyPayment
          q4StateQuarterlyPayment = stateQuarterlyPayments.q4StateQuarterlyPayment
          explanation = `${explanation}\n \n${stateQuarterlyPayments.explanation}`
          if (global.loggedIn) {
            await savePaymentValues({ taxYear, stateAdjustableGrossIncomeThisYear, taxableStateIncomeThisYear, safeHarborStateTaxesThisYear, totalStateTaxLiability, safeToSkipStatePayment, q1StateQuarterlyPayment, q2StateQuarterlyPayment, q3StateQuarterlyPayment, q4StateQuarterlyPayment, explanation })
          }
          else {
            await saveLocalStorageValues({ taxYear, stateAdjustableGrossIncomeThisYear, taxableStateIncomeThisYear, safeHarborStateTaxesThisYear, totalStateTaxLiability, safeToSkipStatePayment, q1StateQuarterlyPayment, q2StateQuarterlyPayment, q3StateQuarterlyPayment, q4StateQuarterlyPayment, explanation })
          }
        }
        else {
          let stateTaxes = getMultiStateTaxes(q1State, q2State, q3State, q4State, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
          let stateQuarterlyPayments = getMultiStatePayments(q1State, q2State, q3State, q4State, currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, stateWithholdingsThisYear, q1StatePaymentMade, q2StatePaymentMade, q3StatePaymentMade)

          safeHarborStateTaxesThisYear = stateTaxes.safeHarborStateTaxesThisYear
          
          totalStateTaxLiability = stateQuarterlyPayments.totalStateTaxLiability
          q1StateQuarterlyPayment = stateQuarterlyPayments.q1StateQuarterlyPayment
          q2StateQuarterlyPayment = stateQuarterlyPayments.q2StateQuarterlyPayment
          q3StateQuarterlyPayment = stateQuarterlyPayments.q3StateQuarterlyPayment
          q4StateQuarterlyPayment = stateQuarterlyPayments.q4StateQuarterlyPayment
          otherStatesToPay = stateQuarterlyPayments.otherStatesToPay
          explanation = `${explanation}\n \n${stateQuarterlyPayments.explanation}`
          if (global.loggedIn) {
            await savePaymentValues({ taxYear, safeHarborStateTaxesThisYear, totalStateTaxLiability, q1StateQuarterlyPayment, q2StateQuarterlyPayment, q3StateQuarterlyPayment, q4StateQuarterlyPayment, otherStatesToPay, explanation })
          }
          else {
            await saveLocalStorageValues({ taxYear, safeHarborStateTaxesThisYear, totalStateTaxLiability, q1StateQuarterlyPayment, q2StateQuarterlyPayment, q3StateQuarterlyPayment, q4StateQuarterlyPayment, otherStatesToPay, explanation })
          }
        }
      }
    }
    if (!stateSupported) {
      singleStateDue = 0
      singleStatePaid = 0
      singleStateRemaining = 0
      q1StateQuarterlyPayment = 0
      q2StateQuarterlyPayment = 0
      q3StateQuarterlyPayment = 0
      q4StateQuarterlyPayment = 0
      let addedExplanation = ''
      if (!livingInCurrentStateAllThisYear) {
        livingInCurrentStateAllThisYear = true
        currentState = 'state'
        addedExplanation = getNoneOfStatesTaxesText()
      }
      else if (!stateHasQuarterlyTaxes) {
        addedExplanation = getNoStateTaxesText(currentState)
      }
      else if (safeToSkipStatePayment) {
        addedExplanation = stateBelowMinimumTaxText(currentState)
      }
      explanation += `\n \n${addedExplanation}`
      if (global.loggedIn) {
        await savePaymentValues({ taxYear, singleStateDue, singleStatePaid, singleStateRemaining, q1StateQuarterlyPayment, q2StateQuarterlyPayment, q3StateQuarterlyPayment, q4StateQuarterlyPayment, otherStatesToPay, explanation })
      }
      else {
        await saveLocalStorageValues({ taxYear, singleStateDue, singleStatePaid, singleStateRemaining, q1StateQuarterlyPayment, q2StateQuarterlyPayment, q3StateQuarterlyPayment, q4StateQuarterlyPayment, otherStatesToPay, explanation })
      }
    }
    setTimeout(async () => {
      if (global.loggedIn && await user.getValue('latestTaxYearPaid') == currentTaxYear) {
        setLocalStorage('sendDashboardEmail', true)
        goto('/dashboard')
        await user.setValue('currentPage', 'dashboard')
      }
      else { 
        setLocalStorage('sendDashboardEmail', true)
        goto('/29')
        await user.setValue('currentPage', '29')
      }
    }, 1000)
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading text="CALCULATING..."/>
