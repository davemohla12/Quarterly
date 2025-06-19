import { supabase } from '$src/utilities/supabase.js'
import { store } from '$src/stores/store.svelte'
import { getLocalStorage } from '$src/utilities/utilities.js'
import { currentYear } from '$src/settings/settings'

const getValueInDatabase = async (field) => {
  if (store.loggedIn || store.justSignedUp) {
    const response = await supabase
      .from('Users')
      .select('*')
      .eq('email', store.email)
      .eq('year', currentYear)
      .single()
    return response.data?.[field]
  }
}

const setValueInDatabase = async (field, value) => {
  if (store.loggedIn || store.justSignedUp) {
    if (value == "undefined") {
      value = null
    }
    await supabase
      .from('Users')
      .update({ [field]: value })
      .eq('email', store.email)
      .eq('year', currentYear)
  }
}

const saveDatabaseToLocalStorage = async () => {
  if (store.loggedIn || store.justSignedUp) {
    const response = await supabase
      .from('Users')
      .select('*')
      .eq('email', store.email)
      .eq('year', currentYear)
      .single()
    if (response.data) {
      for (const field of store.fields) {
        const value = await getValueInDatabase(field)
        store[field] = value
      }
    }
  }
}

const saveLocalStorageToDatabase = async () => {
  if (store.loggedIn || store.justSignedUp) {
    const response = await supabase
    .from('Users')
    .select('*')
    .eq('email', store.email)
    .eq('year', currentYear)
    .single()
    if (!response.data) {
      await supabase
        .from('Users')
        .insert({
          email: store.email,
          year: currentYear,
        })
    }
    for (const field of store.fields) {
      const value = getLocalStorage(field)
      await setValueInDatabase(field, value)
    }
  }
}


const clearDatabase = async () => {
  if (store.loggedIn || store.justSignedUp) {
    localStorage.clear()
    for (const field of store.fields) {
      const value = await setValueInDatabase(field, getLocalStorage(field))
    }
  }
}

const getCurrentPageFromDatabase = async () => {
  if (store.loggedIn || store.justSignedUp) {
    const response = await supabase
      .from('Users')
      .select('currentPage')
      .eq('email', store.email)
      .eq('year', currentYear)
      .single()
    return response.data?.currentPage || '0'
  }
  else {
    return '0'
  }
}

const getEmailsFromDatabase = async () => {
  const response = await supabase
    .from('Users')
    .select('email')
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



export { 
  getValueInDatabase,
  setValueInDatabase,
  saveDatabaseToLocalStorage,
  saveLocalStorageToDatabase,
  clearDatabase,
  getCurrentPageFromDatabase,
  getEmailsFromDatabase
} 