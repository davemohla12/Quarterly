import { supabase } from '$src/utilities/supabase'
import { setValueInDatabase } from '$src/utilities/database'
import { getLocalStorage } from '$src/utilities/utilities'

const store = $state( {
  showMenu: false,
  makeButtonActive: false,
  loggedIn: false,
  email: null,
  showResumeBanner: false,
  justSignedUp : false,
  
  states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
  currentYear: '2025',
  currentQuarter: 'Q2',

  get loginLocation() {
    return getLocalStorage('loginLocation') || 'home'
  },
  set loginLocation(value) {
    localStorage.setItem('loginLocation', value)
  },

  get currentPage() {
    return getLocalStorage('currentPage') || '0'
  },
  set currentPage(value) {
    localStorage.setItem('currentPage', value)
    if (store.loggedIn) {
      setValueInDatabase('currentPage', value)
    }
  },

  get earnNonPaycheckIncomeThisYear() {
    return getLocalStorage('earnNonPaycheckIncomeThisYear')
  },
  set earnNonPaycheckIncomeThisYear(value) {
    localStorage.setItem('earnNonPaycheckIncomeThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('earnNonPaycheckIncomeThisYear', value)
    }
  },

  get currentState() {
    return getLocalStorage('currentState') || ''
  },
  set currentState(value) {
    localStorage.setItem('currentState', value)
    if (store.loggedIn) {
      setValueInDatabase('currentState', value)
    }
  },

  get stateSupported() {
    return getLocalStorage('stateSupported')
  },
  set stateSupported(value) {
    localStorage.setItem('stateSupported', value)
    if (store.loggedIn) {
      setValueInDatabase('stateSupported', value)
    }
  },

  get stateHasQuarterlyTaxes() {
    return getLocalStorage('stateHasQuarterlyTaxes')
  },
  set stateHasQuarterlyTaxes(value) {
    localStorage.setItem('stateHasQuarterlyTaxes', value)
    if (store.loggedIn) {
      setValueInDatabase('stateHasQuarterlyTaxes', value)
    }
  },

  get livedInCurrentStateAllLastYear() {
    return getLocalStorage('livedInCurrentStateAllLastYear')
  },
  set livedInCurrentStateAllLastYear(value) {
    localStorage.setItem('livedInCurrentStateAllLastYear', value)
    if (store.loggedIn) {
      setValueInDatabase('livedInCurrentStateAllLastYear', value)
    }
  },

  get livingInCurrentStateAllThisYear() {
    return getLocalStorage('livingInCurrentStateAllThisYear')
  },
  set livingInCurrentStateAllThisYear(value) {
    localStorage.setItem('livingInCurrentStateAllThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('livingInCurrentStateAllThisYear', value)
    }
  },

  get inMultipleStates() {
    return getLocalStorage('inMultipleStates')
  },
  set inMultipleStates(value) {
    localStorage.setItem('inMultipleStates', value)
    if (store.loggedIn) {
      setValueInDatabase('inMultipleStates', value)
    }
  },

  get filingStatus() {
    return getLocalStorage('filingStatus')
  },
  set filingStatus(value) {
    localStorage.setItem('filingStatus', value)
    if (store.loggedIn) {
      setValueInDatabase('filingStatus', value)
    }
  },

  get exemptions() {
    return getLocalStorage('exemptions')
  },
  set exemptions(value) {
    localStorage.setItem('exemptions', value)
    if (store.loggedIn) {
      setValueInDatabase('exemptions', value)
    }
  },

  get federalTaxPaidLastYear() {
    return getLocalStorage('federalTaxPaidLastYear')
  },
  set federalTaxPaidLastYear(value) {
    localStorage.setItem('federalTaxPaidLastYear', value)
    if (store.loggedIn) {
      setValueInDatabase('federalTaxPaidLastYear', value)
    }
  },

  get stateTaxPaidLastYear() {
    return getLocalStorage('stateTaxPaidLastYear')
  },
  set stateTaxPaidLastYear(value) {
    localStorage.setItem('stateTaxPaidLastYear', value)
    if (store.loggedIn) {
      setValueInDatabase('stateTaxPaidLastYear', value)
    }
  },

  get adjustedGrossIncomeLastYear() {
    return getLocalStorage('adjustedGrossIncomeLastYear')
  },
  set adjustedGrossIncomeLastYear(value) {
    localStorage.setItem('adjustedGrossIncomeLastYear', value)
    if (store.loggedIn) {
      setValueInDatabase('adjustedGrossIncomeLastYear', value)
    }
  },

  get stateIncomeLastYear() {
    return getLocalStorage('stateIncomeLastYear')
  },
  set stateIncomeLastYear(value) {
    localStorage.setItem('stateIncomeLastYear', value)
    if (store.loggedIn) {
      setValueInDatabase('stateIncomeLastYear', value)
    }
  },

  get incomeExpectationThisYear() {
    return getLocalStorage('incomeExpectationThisYear')
  },
  set incomeExpectationThisYear(value) {
    localStorage.setItem('incomeExpectationThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('incomeExpectationThisYear', value)
    }
  },

  get expectedTotalIncomeThisYear() {
    return getLocalStorage('expectedTotalIncomeThisYear')
  },
  set expectedTotalIncomeThisYear(value) {
    localStorage.setItem('expectedTotalIncomeThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('expectedTotalIncomeThisYear', value)
    }
  },

  get businessExpensesThisYear() {
    return getLocalStorage('businessExpensesThisYear')
  },
  set businessExpensesThisYear(value) {
    localStorage.setItem('businessExpensesThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('businessExpensesThisYear', value)
    }
  },

  get retirementContributionsThisYear() {
    return getLocalStorage('retirementContributionsThisYear')
  },
  set retirementContributionsThisYear(value) {
    localStorage.setItem('retirementContributionsThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('retirementContributionsThisYear', value)
    }
  },

  get studentLoanInterestThisYear() {
    return getLocalStorage('studentLoanInterestThisYear')
  },
  set studentLoanInterestThisYear(value) {
    localStorage.setItem('studentLoanInterestThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('studentLoanInterestThisYear', value)
    }
  },

  get healthInsuranceThisYear() {
    return getLocalStorage('healthInsuranceThisYear')
  },
  set healthInsuranceThisYear(value) {
    localStorage.setItem('healthInsuranceThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('healthInsuranceThisYear', value)
    }
  },

  get otherDeductionsThisYear() {
    return getLocalStorage('otherDeductionsThisYear')
  },
  set otherDeductionsThisYear(value) {
    localStorage.setItem('otherDeductionsThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('otherDeductionsThisYear', value)
    }
  },

  get salaryOrWagesThisYear() {
    return getLocalStorage('salaryOrWagesThisYear')
  },
  set salaryOrWagesThisYear(value) {
    localStorage.setItem('salaryOrWagesThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('salaryOrWagesThisYear', value)
    }
  },

  get hasW2() {
    return getLocalStorage('hasW2')
  },
  set hasW2(value) {
    localStorage.setItem('hasW2', value)
    if (store.loggedIn) {
      setValueInDatabase('hasW2', value)
    }
  },

  get federalWithholdingsThisYear() {
    return getLocalStorage('federalWithholdingsThisYear')
  },
  set federalWithholdingsThisYear(value) {
    localStorage.setItem('federalWithholdingsThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('federalWithholdingsThisYear', value)
    }
  },

  get stateWithholdingsThisYear() {
    return getLocalStorage('stateWithholdingsThisYear')
  },
  set stateWithholdingsThisYear(value) {
    localStorage.setItem('stateWithholdingsThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('stateWithholdingsThisYear', value)
    }
  },

  get q1FederalPaymentMade() {
    return getLocalStorage('q1FederalPaymentMade')
  },
  set q1FederalPaymentMade(value) {
    localStorage.setItem('q1FederalPaymentMade', value)
    if (store.loggedIn) {
      setValueInDatabase('q1FederalPaymentMade', value)
    }
  },

  get q2FederalPaymentMade() {
    return getLocalStorage('q2FederalPaymentMade')
  },
  set q2FederalPaymentMade(value) {
    localStorage.setItem('q2FederalPaymentMade', value)
    if (store.loggedIn) {
      setValueInDatabase('q2FederalPaymentMade', value)
    }
  },

  get q3FederalPaymentMade() {
    return getLocalStorage('q3FederalPaymentMade')
  },
  set q3FederalPaymentMade(value) {
    localStorage.setItem('q3FederalPaymentMade', value)
    if (store.loggedIn) {
      setValueInDatabase('q3FederalPaymentMade', value)
    }
  },

  get q1StatePaymentMade() {
    return getLocalStorage('q1StatePaymentMade')
  },
  set q1StatePaymentMade(value) {
    localStorage.setItem('q1StatePaymentMade', value)
    if (store.loggedIn) {
      setValueInDatabase('q1StatePaymentMade', value)
    }
  },

  get q2StatePaymentMade() {
    return getLocalStorage('q2StatePaymentMade')
  },
  set q2StatePaymentMade(value) {
    localStorage.setItem('q2StatePaymentMade', value)
    if (store.loggedIn) {
      setValueInDatabase('q2StatePaymentMade', value)
    }
  },

  get q3StatePaymentMade() {
    return getLocalStorage('q3StatePaymentMade')
  },
  set q3StatePaymentMade(value) {
    localStorage.setItem('q3StatePaymentMade', value)
    if (store.loggedIn) {
      setValueInDatabase('q3StatePaymentMade', value)
    }
  },

  get adjustedGrossIncomeThisYear() {
    return getLocalStorage('adjustedGrossIncomeThisYear')
  },
  set adjustedGrossIncomeThisYear(value) {
    localStorage.setItem('adjustedGrossIncomeThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('adjustedGrossIncomeThisYear', value)
    }
  },

  get taxableFederalIncomeThisYear() {
    return getLocalStorage('taxableFederalIncomeThisYear')
  },
  set taxableFederalIncomeThisYear(value) {
    localStorage.setItem('taxableFederalIncomeThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('taxableFederalIncomeThisYear', value)
    }
  },

  get safeHarborFederalTaxesThisYear() {
    const value = getLocalStorage('safeHarborFederalTaxesThisYear')
    return value
  },
  set safeHarborFederalTaxesThisYear(value) {
    localStorage.setItem('safeHarborFederalTaxesThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('safeHarborFederalTaxesThisYear', value)
    }
  },

  get nonWithheldSafeHarborFederalTaxThisYear() {
    return getLocalStorage('nonWithheldSafeHarborFederalTaxThisYear')
  },
  set nonWithheldSafeHarborFederalTaxThisYear(value) {
    localStorage.setItem('nonWithheldSafeHarborFederalTaxThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('nonWithheldSafeHarborFederalTaxThisYear', value)
    }
  },

  get safeToSkipFederalPayment() {
    return getLocalStorage('safeToSkipFederalPayment')
  },
  set safeToSkipFederalPayment(value) {
    localStorage.setItem('safeToSkipFederalPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('safeToSkipFederalPayment', value)
    }
  },

  get q1federalQuarterlyPayment() {
    return getLocalStorage('q1federalQuarterlyPayment')
  },
  set q1federalQuarterlyPayment(value) {
    localStorage.setItem('q1federalQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q1federalQuarterlyPayment', value)
    }
  },

  get q2federalQuarterlyPayment() {
    return getLocalStorage('q2federalQuarterlyPayment')
  },
  set q2federalQuarterlyPayment(value) {
    localStorage.setItem('q2federalQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q2federalQuarterlyPayment', value)
    }
  },

  get q3federalQuarterlyPayment() {
    return getLocalStorage('q3federalQuarterlyPayment')
  },
  set q3federalQuarterlyPayment(value) {
    localStorage.setItem('q3federalQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q3federalQuarterlyPayment', value)
    }
  },

  get q4federalQuarterlyPayment() {
    return getLocalStorage('q4federalQuarterlyPayment')
  },
  set q4federalQuarterlyPayment(value) {
    localStorage.setItem('q4federalQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q4federalQuarterlyPayment', value)
    }
  },
  
  get stateAdjustableGrossIncomeThisYear() {
    return getLocalStorage('stateAdjustableGrossIncomeThisYear')
  },
  set stateAdjustableGrossIncomeThisYear(value) {
    localStorage.setItem('stateAdjustableGrossIncomeThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('stateAdjustableGrossIncomeThisYear', value)
    }
  },

  get taxableStateIncomeThisYear() {
    return getLocalStorage('taxableStateIncomeThisYear')
  },
  set taxableStateIncomeThisYear(value) {
    localStorage.setItem('taxableStateIncomeThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('taxableStateIncomeThisYear', value)
    }
  },

  get safeHarborStateTaxesThisYear() {
    return getLocalStorage('safeHarborStateTaxesThisYear')
  },
  set safeHarborStateTaxesThisYear(value) {
    localStorage.setItem('safeHarborStateTaxesThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('safeHarborStateTaxesThisYear', value)
    }
  },

  get nonWithheldSafeHarborStateTaxThisYear() {
    return getLocalStorage('nonWithheldSafeHarborStateTaxThisYear')
  },
  set nonWithheldSafeHarborStateTaxThisYear(value) {
    localStorage.setItem('nonWithheldSafeHarborStateTaxThisYear', value)
    if (store.loggedIn) {
      setValueInDatabase('nonWithheldSafeHarborStateTaxThisYear', value)
    }
  },

  get safeToSkipStatePayment() {
    return getLocalStorage('safeToSkipStatePayment')
  },
  set safeToSkipStatePayment(value) {
    localStorage.setItem('safeToSkipStatePayment', value)
    if (store.loggedIn) {
      setValueInDatabase('safeToSkipStatePayment', value)
    }
  },

  get q1StateQuarterlyPayment() {
    return getLocalStorage('q1StateQuarterlyPayment')
  },
  set q1StateQuarterlyPayment(value) {
    localStorage.setItem('q1StateQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q1StateQuarterlyPayment', value)
    }
  },

  get q2StateQuarterlyPayment() {
    return getLocalStorage('q2StateQuarterlyPayment')
  },
  set q2StateQuarterlyPayment(value) {
    localStorage.setItem('q2StateQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q2StateQuarterlyPayment', value)
    }
  },

  get q3StateQuarterlyPayment() {
    return getLocalStorage('q3StateQuarterlyPayment')
  },
  set q3StateQuarterlyPayment(value) {
    localStorage.setItem('q3StateQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q3StateQuarterlyPayment', value)
    }
  },

  get q4StateQuarterlyPayment() {
    return getLocalStorage('q4StateQuarterlyPayment')
  },
  set q4StateQuarterlyPayment(value) {
    localStorage.setItem('q4StateQuarterlyPayment', value)
    if (store.loggedIn) {
      setValueInDatabase('q4StateQuarterlyPayment', value)
    }
  },

  fields: [
    'currentPage',
    'earnNonPaycheckIncomeThisYear',
    'currentState',
    'stateSupported',
    'stateHasQuarterlyTaxes',
    'livedInCurrentStateAllLastYear',
    'livingInCurrentStateAllThisYear',
    'inMultipleStates',
    'filingStatus',
    'exemptions',
    'federalTaxPaidLastYear',
    'stateTaxPaidLastYear',
    'adjustedGrossIncomeLastYear',
    'stateIncomeLastYear',
    'incomeExpectationThisYear',
    'expectedTotalIncomeThisYear',
    'businessExpensesThisYear',
    'retirementContributionsThisYear',
    'studentLoanInterestThisYear',
    'healthInsuranceThisYear',
    'otherDeductionsThisYear',
    'salaryOrWagesThisYear',
    'hasW2',
    'federalWithholdingsThisYear',
    'stateWithholdingsThisYear',
    'q1FederalPaymentMade',
    'q2FederalPaymentMade',
    'q3FederalPaymentMade',
    'q1StatePaymentMade',
    'q2StatePaymentMade',
    'q3StatePaymentMade',
    'adjustedGrossIncomeThisYear',
    'taxableFederalIncomeThisYear',
    'safeHarborFederalTaxesThisYear',
    'nonWithheldSafeHarborFederalTaxThisYear',
    'safeToSkipFederalPayment',
    'q1federalQuarterlyPayment',
    'q2federalQuarterlyPayment',
    'q3federalQuarterlyPayment',
    'q4federalQuarterlyPayment',
    'stateAdjustableGrossIncomeThisYear', 
    'taxableStateIncomeThisYear',
    'safeHarborStateTaxesThisYear',
    'nonWithheldSafeHarborStateTaxThisYear',
    'safeToSkipStatePayment',
    'q1StateQuarterlyPayment',
    'q2StateQuarterlyPayment',
    'q3StateQuarterlyPayment',
    'q4StateQuarterlyPayment',
  ]
})

export { store }
