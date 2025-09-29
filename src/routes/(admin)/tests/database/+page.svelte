<script>
  import { setLocalStorage } from '$src/utilities/utilities'
  import dayjs from 'dayjs'
  import { price } from '$src/settings/settings'

  import  { 
    //Credits
    addCredits,
    removeCredits,
    doesReferralCodeExist,
    getReferrerEmail,
    setRating,
    getEmailFromId, 

    //Users
    createUserIfNotExists,
    getFromUsers, 
    getFromUsersById, 
    setInUsers, 
    setInUsersById, 
    saveToUsers, 
    addToUsers,
    getAllUserValues, 
    setMultipleUserValues,
    addMultipleUserValues,

    //Payments
    createBlankPayment, 
    getFromPayments, 
    setInPayments, 
    setInPaymentsByYear, 
    saveToPayments, 
    savePaymentValues,
    getPriorYears,
    getFromPaymentsByYear,
    getAllPaymentValues, 
  } from '$src/utilities/database'


  // Credits

  const handleAddCredits = async () => {
    await addCredits('dmgreen10@gmail.com', 10)
    console.log(`Added 10 credits to dmgreen10@gmail.com`)
  }

  const handleRemoveCredits = async () => {
    await removeCredits('dmgreen10@gmail.com', 10)
    console.log(`Removed 10 credits from dmgreen10@gmail.com`)
  }

  const handleDoesReferralCodeExist = async () => {
    const referralCode = '135566'
    const exists = await doesReferralCodeExist(referralCode)
    console.log(`doesReferralCodeExist: ${exists}, referral code: ${referralCode}`)
  }

  const handleGetReferrerEmail = async () => {
    const referralCode = '135566'
    const email = await getReferrerEmail(referralCode)
    console.log(`getReferrerEmail: ${email}, referral code: ${referralCode}`)
  }
  
  const handleSetRating = async () => {
    await setRating('dmgreen10@gmail.com', dayjs().toISOString(), 5, 'This is a great rating')
    console.log(`Set rating for dmgreen10@gmail.com`)
  }

  const handleGetEmailFromId = async () => {
    const email = await getEmailFromId('42')
    console.log(`getEmailFromId: ${email}, id: 42`)
  }

  // Users

  const handleCreateUserIfNotExists = async () => {
    await createUserIfNotExists({currentPage: '5'})
    console.log(`Created User if Not Exists`)
  }

  const handleGetFromUsers = async () => {
    const field = 'sendReminders'
    const value = await getFromUsers(field)
    console.log(`${field}: ${value}`)
  }

  const handleGetFromUsersById = async () => {
    const field = 'sendReminders'
    const id = 42
    const value = await getFromUsersById(id, field)
    console.log(`${field}: ${value}, id: ${id}`)
  }

  const handleSetInUsers = async () => {
    const field = 'sendOneDayReminder'
    const value = 'false'
    await setInUsers(field, value)
    console.log(`Set ${field} to ${value}`)
  }

  const handleSetInUsersById = async () => {
    const field = 'sendFiveDayReminder'
    const value = 'false'
    const id = 42
    await setInUsersById(field, id, value)
    console.log(`Set ${field} to ${value}, id: ${id}`)
  }

  const handleSaveToUsers = async () => {
    setLocalStorage('currentPage', '5')
    await saveToUsers()
    console.log(`Saved to Users`)
  }

  const handleAddToUsers = async () => {
    const year = 2027
    const field = 'taxYearsPaid'
    await addToUsers(field, year)
    console.log(`Added ${year} to ${field}`)
  }

  
  const handleGetAllUserValues = async () => {
    const email = 'dmgreen10@gmail.com'
    const values = await getAllUserValues(email)
    const valuesString = JSON.stringify(values)
    console.log(valuesString)
    console.log(`email: ${email}`)
  }

  const handleSetMultipleUserValues = async () => { 
    const fieldValuePairs = {
      latestTaxYearPaid: 2025,
      lastPaymentAmount: price,
    }
    await setMultipleUserValues(fieldValuePairs)
    console.log(fieldValuePairs)
  } 

  const handleAddMultipleUserValues = async () => {
    const fieldValuePairs = {
      taxYearsPaid: 2026,
      paymentDates: '2026-01-01'
    }
    await addMultipleUserValues(fieldValuePairs)
    console.log(fieldValuePairs)
  }

  // Payments

  const handleCreateBlankPayment = async () => {
    await createBlankPayment()
    console.log(`Created Blank Payment`)
  }

  const handleGetFromPayments = async () => {
    const value = await getFromPayments('currentState')
    console.log(`currentState: ${value}`)
  }

  const handleSetInPayments = async () => {
    const field = 'currentState'    
    const value = 'california'
    await setInPayments(field, value)
    console.log(`Set ${field} to ${value}`)
  }

  const handleSetInPaymentsByYear = async () => {
    const year = 2025
    const field = 'currentState'
    const value = 'arizona'
    await setInPaymentsByYear(year, field, value)
    console.log(`Set ${field} to ${value}, year: ${year}`)
  }

  const handleSaveToPayments = async () => {
    setLocalStorage('currentState', 'maryland')
    await saveToPayments()
    console.log(`Saved to Payments`)
  }

  const handleSavePaymentValues = async () => {
    const values = {
      currentState: 'maryland'
    }
    console.log(`values: ${JSON.stringify(values)}`)
    await savePaymentValues(values)
    console.log(`Saved to Payments`)
  }

  const handleGetPriorYears = async () => {
    const years = await getPriorYears()
    for (const year of years) {
      console.log(`${year}`)
    }
  }

  const handleGetFromPaymentsByYear = async () => {
    const year = 2025
    const field = 'stateSupported'
    const value = await getFromPaymentsByYear(field, year)
    console.log(`${field}: ${value}, year: ${year}`)
  }

  const handleGetAllPaymentValues = async () => {
    const email = 'davemohla@gmail.com' 
    const year = 2025
    const values = await getAllPaymentValues(email, year)
    const valuesString = JSON.stringify(values)
    console.log(valuesString)
    console.log(`email: ${email}, year: ${year}`)
  }

</script>

<div class="section">CREDITS</div>
<button onclick={handleAddCredits}>Add Credits</button>
<button onclick={handleRemoveCredits}>Remove Credits</button> 
<button onclick={handleDoesReferralCodeExist}>Does Referral Code Exist</button>
<button onclick={handleGetReferrerEmail}>Get Referrer Email</button>
<button onclick={handleSetRating}>Set Rating</button>
<button onclick={handleGetEmailFromId}>Get Email From Id</button>

<div class="section">USERS</div>
<button onclick={handleCreateUserIfNotExists}>Create User if Not Exists</button>
<button onclick={handleGetFromUsers}>Get from Users</button>
<button onclick={handleGetFromUsersById}>Get from Users By Id</button>
<button onclick={handleSetInUsers}>Set in Users</button>
<button onclick={handleSetInUsersById}>Set in Users By Id</button>
<button onclick={handleSaveToUsers}>Save to Users</button>
<button onclick={handleAddToUsers}>Add New Paid Tax Year</button>
<button onclick={handleGetAllUserValues}>Get All User Values</button>
<button onclick={handleSetMultipleUserValues}>Set Multiple User Values</button>
<button onclick={handleAddMultipleUserValues}>Add Multiple User Values</button>

<div class="section">PAYMENTS</div>
<button onclick={handleCreateBlankPayment}>Create Blank Payment</button>
<button onclick={handleGetFromPayments}>Get from Payments</button>
<button onclick={handleGetFromPaymentsByYear}>Get from Payments By Year</button>
<button onclick={handleSetInPayments}>Set in Payments</button>
<button onclick={handleSetInPaymentsByYear}>Set in Payments By Year</button>
<button onclick={handleSaveToPayments}>Save to Payments</button>
<button onclick={handleSavePaymentValues}>Save Payment Values</button>
<button onclick={handleGetPriorYears}>Get Prior Years</button>
<button onclick={handleGetAllPaymentValues}>Get All Payment Values</button>

<style>
  .section {
    margin-top: 20px;
    font-weight: bold;
  }

  button {
    display: block;
    margin-top: 10px;
  }
</style>
