<script>
  import { getFromPayments, setInPayments, saveToPayments, getFromUsers, setInUsers, saveToUsers, getEmails, addToUsers, createBlankPayment, getPriorYears } from '$src/utilities/database'
  import { setLocalStorage } from '$src/utilities/utilities'

  const handleSaveToPayments = async () => {
    setLocalStorage('currentState', 'maryland')
    await saveToPayments()
    console.log(`Saved to Payments`)
  }

  const handleSetInPayments = async () => {
    await setInPayments('currentState', 'california')
    console.log(`Set in Payments`)
  }

  const handleGetFromPayments = async () => {
    const value = await getFromPayments('currentState')
    console.log(`currentState: ${value}`)
  }

  const handleCreateBlankPayment = async () => {
    await createBlankPayment()
    console.log(`Created Blank Payment`)
  }

  const handleSaveToUsers = async () => {
    setLocalStorage('currentPage', '5')
    await saveToUsers()
    console.log(`Saved to Users`)
  }

  const handleSetInUsers = async () => {
    await setInUsers('currentPage', '10')
    console.log(`Set in Users`)
  }

  const handleGetFromUsers = async () => {
    const value = await getFromUsers('currentPage')
    console.log(`currentPage: ${value}`)
  }

  const handleGetEmails = async () => {
    const emails = await getEmails()
    console.log(`emails: ${emails}`)
  }

  const handleAddToUsers = async () => {
    const year = 2027
    const field = 'taxYearsPaid'
    await addToUsers(field, year)
    console.log(`Added ${year} to ${field}`)
  }

  const handleGetPriorYears = async () => {
    const years = await getPriorYears()
    for (const year of years) {
      console.log(`${year}`)
    }
  }

</script>

<button onclick={handleSaveToPayments}>Save to Payments</button>
<button onclick={handleSetInPayments}>Set in Payments</button>
<button onclick={handleGetFromPayments}>Get from Payments</button>
<button onclick={handleCreateBlankPayment}>Create Blank Payment</button>
<button onclick={handleSaveToUsers}>Save to Users</button>
<button onclick={handleSetInUsers}>Set in Users</button>
<button onclick={handleGetFromUsers}>Get from Users</button>
<button onclick={handleGetEmails}>Get Emails</button>
<button onclick={handleAddToUsers}>Add New Paid Tax Year</button>
<button onclick={handleGetPriorYears}>Get Prior Tax Year</button>


<style>
  button {
    display: block;
    margin-top: 10px;
  }
</style>
