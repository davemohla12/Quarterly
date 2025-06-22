import { supabase } from '$src/utilities/supabase'
import { global } from '$src/data/global.svelte'
import { currentTaxYear } from '$src/settings/settings'
import { getLocalStorage } from '$src/utilities/utilities'

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
    if (field != 'id' && field != 'created_at' && field != 'email' && field != 'taxYear') {
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
    })
  if (response.error) {
    console.log(response.error)
  }
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

const setInUsers = async (field, value) => {
  const response =await supabase
    .from('Users')
    .update({ [field]: value })
    .eq('email', global.email)
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

export { getFromPayments, setInPayments, saveToPayments, getFromUsers, setInUsers, saveToUsers, addToUsers, getEmails, createBlankPayment }