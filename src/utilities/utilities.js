import { global } from '$src/data/global.svelte'
import { stateRules } from '$src/rules/state.js'
import { doesReferralCodeExist } from '$src/utilities/database.js'
import dayjs from 'dayjs'

const convertStateToLowerCase = (state) => {
  if (state) { 
    const lowerCaseState = state.toLowerCase()
    return lowerCaseState.replace(/\s+/g, '_')
  }
  else {
    return ''
  }
}

const convertStateToUpperCase = (state) => {
  if (state) {
  const words = state.split('_')
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    return capitalizedWords.join(' ')
  }
  else {
    return ''
  }
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
    return Number(number).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
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
    global.loggedIn = true
    global.email = session.user.email
  }
  else {
    global.loggedIn = false
    global.email = null
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
  else if (value && (value.startsWith('{') || value.startsWith('['))) {
    try {
      value = JSON.parse(value)
    } 
    catch (error) {
    }
  }
  return value
}

const setLocalStorage = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    localStorage.setItem(key, JSON.stringify(value))
  } 
  else {
    localStorage.setItem(key, value)
  }
}

const clearLocalStorage = () => {
  const allKeys = Object.keys(localStorage)
  for (const key of allKeys) {
    if (!key.startsWith('sb-') && !key.includes('auth-token') && key != 'source') {
      localStorage.removeItem(key)
    }
  }
}

const saveLocalStorageValues = async (values) => {
  for (const key of Object.keys(values)) {
    setLocalStorage(key, values[key])
  }
}

const generateUniqueReferralCode = async () => {
  let code
  let isUnique = false
  while (!isUnique) {
    code = generateReferralCode()
    const codeAlreadyExists = await doesReferralCodeExist(code)
    if (!codeAlreadyExists) {
      isUnique = true
    }
  }
  return code
}

const generateReferralCode = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
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
  convertLongToShortFilingStatus,
  convertShortToLongFilingStatus,
  convertLongToShortIncomeExpectation,
  convertShortToLongIncomeExpectation,
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
  saveLocalStorageValues,
  generateUniqueReferralCode
} 