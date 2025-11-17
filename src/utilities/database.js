import { global } from '$src/data/global.svelte'
import { currentTaxYear } from '$src/settings/settings'
import { getLocalStorage } from '$src/utilities/utilities'
import axios from 'axios'
import { generateUniqueReferralCode } from '$src/utilities/utilities'

const getFromPayments = async (field) => {
  const response = await axios.post('/api/database/getFromPayments', { field, email: global.email, taxYear: currentTaxYear })
  return response.data?.[field]
}

const setInPayments = async (field, value) => {
  await axios.post('/api/database/setInPayments', { field, value, email: global.email, taxYear: currentTaxYear })
}

const setInPaymentsByYear = async (year, field, value) => {
  await axios.post('/api/database/setInPaymentsByYear', { taxYear: year, field, value, email: global.email,  })
}

const saveToPayments = async () => {
  const localStorageData = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    localStorageData[key] = getLocalStorage(key)
  }
  await axios.post('/api/database/saveToPayments', {email: global.email, taxYear: currentTaxYear, localStorageData: localStorageData })
}

const createBlankPayment = async () => {
  await axios.post('/api/database/createBlankPayments', { email: global.email, taxYear: currentTaxYear })
}

const getAllPaymentValues = async (email, taxYear) => {
  const response = await axios.post('/api/database/getAllPaymentValues', { email: email, taxYear: taxYear })
  return response.data.values
}

const savePaymentValues = async (values) => {
  await axios.post('/api/database/savePaymentValues', { email: global.email, taxYear: currentTaxYear, values: values })
}

const getAllUserValues = async (email) => {
  const response = await axios.post('/api/database/getAllUserValues', { email: email })
  return response.data
}

const setMultipleUserValues = async (fieldValuePairs) => {
  await axios.post('/api/database/setMultipleUserValues', { fieldValuePairs: fieldValuePairs, email: global.email })
}

const addMultipleUserValues = async (fieldValuePairs) => {
  await axios.post('/api/database/addMultipleUserValues', { fieldValuePairs: fieldValuePairs, email: global.email })
}

const getFromUsers = async (field) => {
  const response = await axios.post('/api/database/getFromUsers', { email: global.email, field: field })
  return response.data?.[field]
}

const getFromUsersById = async (id, field) => {
  const response = await axios.post('/api/database/getFromUsersById', { id: id, field: field })
  return response.data?.[field]
}

const setInUsers = async (field, value) => {
  await axios.post('/api/database/setInUsers', { field: field, value: value, email: global.email })
}

const setInUsersById = async (field, id, value) => {
  await axios.post('/api/database/setInUsersById', { field: field, value: value, id: id })
} 

const saveToUsers = async () => {
  const localStorageData = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    localStorageData[key] = getLocalStorage(key)
  }
  await axios.post('/api/database/saveToUsers', { email: global.email, localStorageData: localStorageData })
}

const createUserIfNotExists = async ({currentPage} = {}) => {
  const referralCode = await generateUniqueReferralCode()
  await axios.post('/api/database/createUserIfNotExists', {email: global.email, referrerEmail: getLocalStorage('referrerEmail'), currentPage: currentPage, referralCode: referralCode})
}

const addToUsers = async (field, value) => {
  await axios.post('/api/database/addToUsers', { field: field, value: value, email: global.email })
}

const getPriorYears = async () => {
  const response = await axios.post('/api/database/getPriorYears', { email: global.email, currentTaxYear: currentTaxYear })
  return response.data.years
}

const getFromPaymentsByYear = async (field, taxYear) => {
  const response = await axios.post('/api/database/getFromPaymentsByYear', { field: field, email: global.email, taxYear: taxYear })
  return response.data?.[field]
}

const getEmailFromId = async (id) => {
  const response = await axios.post('/api/database/getEmailFromId', { id: id })
  return response.data?.email
}

const setRating = async (email, date, rating, feedback) => {
  await axios.post('/api/database/setRating', { email: email, date: date, rating: rating, feedback: feedback })
}

const doesReferralCodeExist = async (code) => {
  const response = await axios.post('/api/database/doesReferralCodeExist', { code: code })
  return response.data.exists
}

const getReferrerEmail = async (code) => {
  const response = await axios.post('/api/database/getReferrerEmail', { code: code })  
  return response.data.email
}

const addCredits = async (email, amount) => {
  await axios.post('/api/database/addCredits', { email: email, amount: amount })
} 

const removeCredits = async (email, amount) => {
  await axios.post('/api/database/removeCredits', { email: email, amount: amount })
}

const setInDisappointed = async (answer) => {
  await axios.post('/api/database/setInDisappointed', { answer })
}

const setInImprove = async (feedback) => {
  await axios.post('/api/database/setInImprove', { feedback })
}

export { 
  getFromPayments, 
  setInPayments, 
  setInPaymentsByYear, 
  saveToPayments,  
  savePaymentValues,
  getFromUsers, 
  getFromUsersById, 
  setInUsers, 
  setInUsersById, 
  saveToUsers, 
  addToUsers, 
  createBlankPayment, 
  getPriorYears,
  getFromPaymentsByYear,
  createUserIfNotExists,
  getAllPaymentValues, 
  getAllUserValues, 
  getEmailFromId, 
  setRating,
  doesReferralCodeExist,
  getReferrerEmail,
  addCredits,
  removeCredits,
  setMultipleUserValues,
  addMultipleUserValues,
  setInDisappointed,
  setInImprove
}