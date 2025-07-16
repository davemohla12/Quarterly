<script>
  import Header from "$src/components/app/Header.svelte"
  import Avatar from "$src/components/app/Avatar.svelte"
  import Heading from "$src/components/app/Heading.svelte"
  import { getLocalStorage } from "$src/utilities/utilities"
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  import { global } from "$src/data/global.svelte"
  import EmailInput from "$src/components/app/EmailInput.svelte"
  import ControlledButton from "$src/components/app/ControlledButton.svelte"
  import { getAllUserValues, getAllPaymentValues } from "$src/utilities/database"
  import NotFound from "$src/components/app/NotFound.svelte"
  import UserInfo from "$src/components/app/UserInfo.svelte"
  import { setLocalStorage } from "$src/utilities/utilities"

  let email = $state(null)
  let validEmail = $state(false)
  let userFound = $state(true)
  let showUserInfo = $state(false)
  let showSpinner = $state(false)
  let userValues = $state(null)
  let paymentValues = $state([])

  onMount(() => {
    global.makeButtonActive = false
    const adminLoggedIn = getLocalStorage('adminLoggedIn')
    if (!adminLoggedIn) {
      setLocalStorage('adminPage', 'user')
      goto('/passcode')
    }
  })

  const handleEmailInput = (value, isValidEmail) => {
    email = value
    validEmail = isValidEmail
    if (validEmail) {
      global.makeButtonActive = true
    } 
    else {
      global.makeButtonActive = false
    }
  }

  const handleGetInfo = async () => {
    showSpinner = true
    userValues = await getAllUserValues(email)
    if (!userValues) {
      userFound = false
      showSpinner = false
    }
    else {
      userFound = true
      paymentValues = await getAllPaymentValues(email,userValues.latestTaxYearPaid)
      showUserInfo = true
      showSpinner = false
    }
  }

  const handleTaxYearClick = async (taxYear) => {
    paymentValues = await getAllPaymentValues(email, taxYear)
  }

  const handleClear = () => {
    email = ''
    validEmail = false
    global.makeButtonActive = false
    userFound = true
    showUserInfo = false
    showSpinner = false
    userValues = null
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {  
        handleGetInfo()
      }
    }
  }

</script>

<svelte:window on:keydown={handleKeyDown} />

<Header hideReset={true} hideBack={true} hideLogout={true} showAdminLogout={true} />
<Avatar />
<Heading text="User Info" desktopwidth="450px" mobilewidth="300px" /> 
<EmailInput placeholder="Email" onInput={handleEmailInput} value={email} showClear={true} onclear={handleClear} hideError={true} />
{#if showSpinner}
  <ControlledButton showSpinner={true} enabled={false} dark={true} />
{:else}
  <ControlledButton text="GET INFO" onclick={handleGetInfo}/>
{/if}
{#if !userFound}
  <NotFound />
{/if}
{#if showUserInfo}
  <UserInfo userValues={userValues} paymentValues={paymentValues} onTaxYearClick={handleTaxYearClick}/>
{/if}
