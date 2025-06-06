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
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
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

const updateLoginState = (session) => {
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
  doesStateHaveQuarterlyTaxes,
  formatCurrency,
  updateLoginState,
  getLocalStorage
} 