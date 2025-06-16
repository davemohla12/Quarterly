import { store } from '$src/stores/store.svelte'
import { stateRules } from '$src/rules/state.js'
import { supabase } from '$src/utilities/supabase'

const convertStateToLowerCase = (state) => {
  const lowerCaseState = state.toLowerCase()
  return lowerCaseState.replace(/\s+/g, '_')
}

const convertStateToUpperCase = (state) => {
  const words = state.split('_')
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
  return capitalizedWords.join(' ')
}

const convertStateToAllUpperCase = (state) => {
  return convertStateToUpperCase(state).toUpperCase()
}

const convertStatusToLowerCase = (status) => {
  const lowerCaseStatus = status.toLowerCase()
  return lowerCaseStatus.replace(/\s+/g, '_')
}

const convertCurrencyToNumber = (currency) => {
  if (!currency) {
    return 0
  }
  const numberString = currency.replace(/[$,]/g, '')
  return parseFloat(numberString)
}

const convertNumberToCurrency = (number) => {
  if (number == null) { 
    return '$0'
  }
  else {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
}

const convertNumberToRoundedCurrency = (number) => {
  if (number == null) {
    return '$0'
  }
  else { 
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }
}

const doesStateHaveQuarterlyTaxes = (state) => {
  if (stateRules[state].stateHasQuarterlyTaxes) {
    return true
  }
  else {
    return false
  }
}

const formatCurrency = (currency) => {
  let formattedCurrency 
  if (currency != null) {
    const hasDecimal = currency % 1 !== 0
    const currencyNumber = parseFloat(currency)
    formattedCurrency = currencyNumber.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: hasDecimal ? 2 : 0,
      maximumFractionDigits: hasDecimal ? 2 : 0
    })
  }
  else {
    formattedCurrency = 'blank'
  }
  return formattedCurrency
}

const convertLongToShortFilingStatus = (filingStatus) => {
  if (filingStatus == 'Single') {
    return 'single'
  }
  else if (filingStatus == 'Married Filing Jointly') {
    return 'married'
  }
  else if (filingStatus == 'Married Filing Separately') {
    return 'separate'
  }
  else if (filingStatus == 'Head of Household') {
    return 'head'
  }
  else if (filingStatus == 'Qualifying Widow(er)') {
    return 'widow'
  }
}

const convertShortToLongFilingStatus = (filingStatus) => {
  if (filingStatus == 'single') {
    return 'Single'
  }
  else if (filingStatus == 'married') {
    return 'Married Filing Jointly'
  }
  else if (filingStatus == 'separate') {
    return 'Married Filing Separately'
  }
  else if (filingStatus == 'head') {
    return 'Head of Household'
  }
  else if (filingStatus == 'widow') {
    return 'Qualifying Widow(er)'
  }
} 

const convertLongToShortIncomeExpectation = (incomeExpectation) => {  
  if (incomeExpectation == 'Increase') {
    return 'increase'
  }
  else if (incomeExpectation == 'Stay about the same') {
    return 'same'
  }
  else if (incomeExpectation == 'Decrease') {
    return 'decrease'
  }
}

const convertShortToLongIncomeExpectation = (incomeExpectation) => {
  if (incomeExpectation == 'increase') {
    return 'Increase'
  }
  else if (incomeExpectation == 'same') {
    return 'Stay about the same'
  }
  else if (incomeExpectation == 'decrease') {
    return 'Decrease'
  }
} 

const updateLoginState = async (session) => {
  if (session) {
    store.loggedIn = true
    store.email = session.user.email
  }
  else {
    store.loggedIn = false
    store.email = null
  }
}

const getLocalStorage = (key) => {
  let value = localStorage.getItem(key)
  if (value == 'true') {
    value = true
  }
  else if (value == 'false') {
    value = false
  }
  else if (value == 'null') {
    value = null
  }
  return value
}

export { 
  convertStateToLowerCase, 
  convertStateToUpperCase, 
  convertStateToAllUpperCase,
  convertStatusToLowerCase, 
  convertCurrencyToNumber, 
  convertNumberToCurrency, 
  convertNumberToRoundedCurrency,
  doesStateHaveQuarterlyTaxes,
  formatCurrency,
  updateLoginState,
  getLocalStorage,
  convertLongToShortFilingStatus,
  convertShortToLongFilingStatus,
  convertLongToShortIncomeExpectation,
  convertShortToLongIncomeExpectation
} 