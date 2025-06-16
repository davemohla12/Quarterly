import { supabase } from '$src/utilities/supabase.js'
import { store } from '$src/stores/store.svelte'
import { getLocalStorage } from '$src/utilities/utilities.js'

// const getValueInDatabase = async (field) => {
//   if (store.loggedIn || store.justSignedUp) {
//     const response = await supabase
//       .from('Users')
//       .select('*')
//       .eq('email', store.email)
//       .eq('year', store.currentYear)
//       .single()
//     return response.data?.[field]
//   }
// }

const getValueInDatabase = async (field) => {
  console.log('Auth state:', {
    loggedIn: store.loggedIn,
    justSignedUp: store.justSignedUp,
    email: store.email
  })
  if (store.loggedIn || store.justSignedUp) {
    try {
      console.log('Making Supabase request with:', {
        email: store.email,
        year: store.currentYear,
        field: field
      })
      
      const response = await supabase
        .from('Users')
        .select('*')
        .eq('email', store.email)
        .eq('year', store.currentYear)
        .single()
      
      console.log('Supabase response:', response)
      
      if (response.error) {
        console.error('Supabase error:', response.error)
      }
      
      return response.data?.[field]
    }
    catch (error) {
      console.error('Error in getValueInDatabase:', error)
      throw error
    }
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
      .eq('year', store.currentYear)
  }
}

// const saveDatabaseToLocalStorage = async () => {
//   if (store.loggedIn || store.justSignedUp) {
//     const response = await supabase
//       .from('Users')
//       .select('*')
//       .eq('email', store.email)
//       .eq('year', store.currentYear)
//       .single()
//     if (response.data) {
//       for (const field of store.fields) {
//         const value = await getValueInDatabase(field)
//         localStorage.setItem(field, value)
//         store[field] = value
//       }
//     }
//   }
// }

const saveDatabaseToLocalStorage = async () => {
  console.log('Starting saveDatabaseToLocalStorage')
  console.log('Auth state:', {
    loggedIn: store.loggedIn,
    justSignedUp: store.justSignedUp,
    email: store.email
  })
  
  if (store.loggedIn || store.justSignedUp) {
    try {
      console.log('Making initial Supabase request')
      const response = await supabase
        .from('Users')
        .select('*')
        .eq('email', store.email)
        .eq('year', store.currentYear)
        .single()
      
      console.log('Initial Supabase response:', response)
      
      if (response.data) {
        console.log('Found data, processing fields:', store.fields)
        for (const field of store.fields) {
          const value = await getValueInDatabase(field)
          console.log(`Setting ${field} to:`, value)
          localStorage.setItem(field, value)
          store[field] = value
        }
      }
      else {
        console.log('No data found in response')
      }
    }
    catch (error) {
      console.error('Error in saveDatabaseToLocalStorage:', error)
    }
  }
  else {
    console.log('Not logged in or just signed up in saveDatabaseToLocalStorage')
  }
}


const saveLocalStorageToDatabase = async () => {
  if (store.loggedIn || store.justSignedUp) {
    const response = await supabase
    .from('Users')
    .select('*')
    .eq('email', store.email)
    .eq('year', store.currentYear)
    .single()
    if (!response.data) {
      await supabase
        .from('Users')
        .insert({
          email: store.email,
          year: store.currentYear,
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
      .eq('year', store.currentYear)
      .single()
    return response.data?.currentPage || '0'
  }
  else {
    return '0'
  }
}

export { 
  getValueInDatabase,
  setValueInDatabase,
  saveDatabaseToLocalStorage,
  saveLocalStorageToDatabase,
  clearDatabase,
  getCurrentPageFromDatabase
} 