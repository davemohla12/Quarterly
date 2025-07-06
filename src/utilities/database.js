import { supabase } from '$src/utilities/supabase'
import { global } from '$src/data/global.svelte'
import { currentTaxYear } from '$src/settings/settings'
import { getLocalStorage } from '$src/utilities/utilities'
import dayjs from 'dayjs'

const getFromPayments = async (field) => {
  const response = await supabase
    .from('Payments')
    .select('*')
    .eq('email', global.email)
    .eq('taxYear', currentTaxYear)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  return response.data?.[field]
}

const setInPayments = async (field, value) => {
  const response =await supabase
    .from('Payments')
    .update({ [field]: value })
    .eq('email', global.email)
    .eq('taxYear', currentTaxYear)
  if (response.error) {
    console.log(response.error)
  }
}

const setInPaymentsByYear = async (year, field, value) => {
  const response =await supabase
    .from('Payments')
    .update({ [field]: value })
    .eq('email', global.email)
    .eq('taxYear', year)
  if (response.error) {
    console.log(response.error)
  }
}

const saveToPayments = async () => {
  let response = await supabase
      .from('Payments')
      .select('*')
      .eq('email', global.email)
      .eq('taxYear', currentTaxYear)
      .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  if (!response.data) {
    await supabase
      .from('Payments')
      .insert({
        email: global.email,
        taxYear: currentTaxYear,
        showPaidDates: true
      })
    response = await supabase
      .from('Payments')
      .select('*')
      .eq('email', global.email)
      .eq('taxYear', currentTaxYear)
      .maybeSingle()
    if (response.error) {
      console.log(response.error)
    }
  }
  const updateData = {}
  for (const field of Object.keys(response.data)) {
    if (field != 'id' && field != 'created_at' && field != 'email' && field != 'taxYear' && field != 'showPaidDates') {
      updateData[field] = getLocalStorage(field) 
    }
  }
  await supabase
    .from('Payments')
    .update(updateData)
    .eq('email', global.email)
    .eq('taxYear', currentTaxYear)
  if (response.error) {
    console.log(response.error)
  }
}

const createBlankPayment = async () => {
  const response = await supabase
    .from('Payments')
    .insert({
      email: global.email,
      taxYear: currentTaxYear,
      showPaidDates: true
    })
  if (response.error) {
    console.log(response.error)
  }
}

const getAllPaymentValues = async (email, year) => {
  const response = await supabase
    .from('Payments')
    .select('*')
    .eq('email', email)
    .eq('taxYear', year)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  return response.data
}

const getAllUserValues = async (email) => {
  const response = await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  return response.data
}

const getFromUsers = async (field) => {
  const response = await supabase
  .from('Users')
  .select('*')
  .eq('email', global.email)
  .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  return response.data?.[field]
}

const getFromUsersById = async (field, id) => {
  const response = await supabase
    .from('Users')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  return response.data?.[field]
}

const setInUsers = async (field, value) => {
  const response =await supabase
    .from('Users')
    .update({ [field]: value })
    .eq('email', global.email)
  if (response.error) {
    console.log(response.error)
  }
}

const setInUsersById = async (field, id, value) => {
  const response = await supabase
    .from('Users')
    .update({ [field]: value })
    .eq('id', id)
  if (response.error) {
    console.log(response.error)
  }
} 

const saveToUsers = async () => {
  let response = await supabase
    .from('Users')
    .select('*')
    .eq('email', global.email)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  if (!response.data) {
    await supabase
      .from('Users')
      .insert({
        email: global.email,
        sendReminders: true,
        sendFiveDayReminder: true,
        sendOneDayReminder: true,
      })
    response = await supabase
      .from('Users')
      .select('*')
      .eq('email', global.email)
      .maybeSingle()
    if (response.error) {
      console.log(response.error)
    }
  }
  const updateData = {}
  for (const field of Object.keys(response.data)) {
    if (field != 'id' && field != 'created_at' && field != 'email') {
      updateData[field] = getLocalStorage(field) 
    }
  }
  await supabase
    .from('Users')
    .update(updateData)
    .eq('email', global.email)
  if (response.error) {
    console.log(response.error)
  }
}

const createUserIfNotExists = async () => {
  let response = await supabase
    .from('Users')
    .select('*')
    .eq('email', global.email)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  if (!response.data) {
    await supabase
      .from('Users')
      .insert({
        email: global.email,
        sendReminders: true,
        sendFiveDayReminder: true,
        sendOneDayReminder: true,
      })
    response = await supabase
      .from('Users')
      .select('*')
      .eq('email', global.email)
      .maybeSingle()    
    if (response.error) {
      console.log(response.error)
    }
  }
}

const addToUsers = async (field, value) => {
  const response = await supabase
    .from('Users')
    .select(field)
    .eq('email', global.email)
    .maybeSingle()  
  if (response.error) {
    console.log(response.error)
    return
  }
  let currentArray = response.data?.[field] || []
  if (!currentArray.includes(value)) {
    currentArray.push(value)
  }
  const updateResponse = await supabase
    .from('Users')
    .update({ [field]: currentArray })
    .eq('email', global.email)
  if (updateResponse.error) {
    console.log(updateResponse.error)
  }
}

const getEmails = async () => {
  const response = await supabase
    .from('Users')
    .select('email')
  if (response.error) {
    console.log(response.error)
  }
  if (response.data) {
    const emails = response.data.map(row => row.email)
    const uniqueEmails = []
    for (const email of emails) {
      if (!uniqueEmails.includes(email)) {
        uniqueEmails.push(email)
      }
    }
    return uniqueEmails
  }
  else { 
    return []
  } 
}

const getPriorYears = async () => {
  const response = await supabase
    .from('Payments')
    .select('taxYear')
    .eq('email', global.email)
    .neq('taxYear', currentTaxYear)
    .order('taxYear', { ascending: false })
  if (response.error) {
    console.log(response.error)
    return []
  }
  else if (response.data) {
    return response.data.map(row => row.taxYear)
  }
  else {
    return []
  }
}

const getFromPaymentsByYear = async (field, year) => {
  const response = await supabase
    .from('Payments')
    .select('*')
    .eq('email', global.email)
    .eq('taxYear', year)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  return response.data?.[field]
}

const getEmailFromId = async (id) => {
  const response = await supabase
    .from('Users')
    .select('email')
    .eq('id', id)
    .maybeSingle()
  if (response.error) {
    console.log(response.error)
  }
  return response.data?.email
}

const setRating = async (email, rating, feedback) => {
  const date = dayjs().toISOString()
  const existingResponse = await supabase
  .from('Ratings')
  .select('*')
  .eq('email', email)
  .eq('date', date)
  .maybeSingle()
  if (existingResponse.error) {
    console.log(existingResponse.error)
  }
  if (existingResponse.data) {
    const updateResponse = await supabase
      .from('Ratings')
      .update({ rating, feedback })
      .eq('email', email)
      .eq('date', date)
    if (updateResponse.error) {
      console.log(updateResponse.error)
    }
  }
  else {
    const insertResponse = await supabase
      .from('Ratings')
      .insert({ email, date, rating, feedback })
    if (insertResponse.error) {
      console.log(insertResponse.error)
    }
  }
}

export { getFromPayments, setInPayments, setInPaymentsByYear, saveToPayments, getFromUsers, getFromUsersById, setInUsers, setInUsersById, saveToUsers, addToUsers, getEmails, createBlankPayment, getPriorYears, getFromPaymentsByYear, createUserIfNotExists, getAllPaymentValues, getAllUserValues, getEmailFromId, setRating }