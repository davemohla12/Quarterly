<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { global } from '$src/data/global.svelte'
  import { getAllPaymentValues } from '$src/utilities/database'
  import { currentTaxYear } from '$src/settings/settings'
  import { setLocalStorage } from '$src/utilities/utilities'

  onMount(async () => {
    if (global.loggedIn) {
      const paymentValues = await getAllPaymentValues(global.email, currentTaxYear)
      setLocalStorage('payPreference', paymentValues?.payPreference)
      setLocalStorage('currentState', paymentValues?.currentState)
      setLocalStorage('stateSupported', paymentValues?.stateSupported)
      setLocalStorage('livedInCurrentStateAllLastYear', paymentValues?.livedInCurrentStateAllLastYear)
      setLocalStorage('stateHasQuarterlyTaxes', paymentValues?.stateHasQuarterlyTaxes)
      setLocalStorage('safeToSkipFederalPayment', paymentValues?.safeToSkipFederalPayment)
      setLocalStorage('incomeExpectationThisYear', paymentValues?.incomeExpectationThisYear)
      setLocalStorage('federalTaxPaidLastYear', paymentValues?.federalTaxPaidLastYear)
      setLocalStorage('adjustedGrossIncomeLastYear', paymentValues?.adjustedGrossIncomeLastYear)
      setLocalStorage('filingStatus', paymentValues?.filingStatus)
      setLocalStorage('expectedTotalIncomeThisYear', paymentValues?.expectedTotalIncomeThisYear)
      setLocalStorage('businessExpensesThisYear', paymentValues?.businessExpensesThisYear)
      setLocalStorage('retirementContributionsThisYear', paymentValues?.retirementContributionsThisYear)
      setLocalStorage('studentLoanInterestThisYear', paymentValues?.studentLoanInterestThisYear)
      setLocalStorage('healthInsuranceThisYear', paymentValues?.healthInsuranceThisYear)
      setLocalStorage('otherDeductionsThisYear', paymentValues?.otherDeductionsThisYear)
      setLocalStorage('exemptions', paymentValues?.exemptions)
      setLocalStorage('salaryOrWagesThisYear', paymentValues?.salaryOrWagesThisYear)
      setLocalStorage('hasW2', paymentValues?.hasW2)
      setLocalStorage('federalWithholdingsThisYear', paymentValues?.federalWithholdingsThisYear)
      setLocalStorage('q1FederalPaymentMade', paymentValues?.q1FederalPaymentMade)
      setLocalStorage('q2FederalPaymentMade', paymentValues?.q2FederalPaymentMade)
      setLocalStorage('q3FederalPaymentMade', paymentValues?.q3FederalPaymentMade)
      setLocalStorage('livingInCurrentStateAllThisYear', paymentValues?.livingInCurrentStateAllThisYear)
      setLocalStorage('stateTaxPaidLastYear', paymentValues?.stateTaxPaidLastYear)
      setLocalStorage('stateIncomeLastYear', paymentValues?.stateIncomeLastYear)
      setLocalStorage('stateWithholdingsThisYear', paymentValues?.stateWithholdingsThisYear)
      setLocalStorage('q1StatePaymentMade', paymentValues?.q1StatePaymentMade)
      setLocalStorage('q2StatePaymentMade', paymentValues?.q2StatePaymentMade)
      setLocalStorage('q3StatePaymentMade', paymentValues?.q3StatePaymentMade)
      setLocalStorage('safeToSkipStatePayment', paymentValues?.safeToSkipStatePayment)
      setLocalStorage('q1State', paymentValues?.q1State)
      setLocalStorage('q2State', paymentValues?.q2State)
      setLocalStorage('q3State', paymentValues?.q3State)
      setLocalStorage('q4State', paymentValues?.q4State)
    }
    const currentPage = await user.getValue('currentPage')
    await user.setValue('currentPage', currentPage)
    goto('/' + currentPage)
  })


</script>

<Header hideBack={true} />
<Avatar />
<Loading />