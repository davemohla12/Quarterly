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
  import { getAllUserValues } from "$src/utilities/database"
  import NotFound from "$src/components/app/NotFound.svelte"
  import { setLocalStorage } from "$src/utilities/utilities"
  import Refund from "$src/components/app/Refund.svelte"
  import axios from "axios"

  let email = $state(null)
  let validEmail = $state(false)
  let userFound = $state(true)
  let showUserInfo = $state(false)
  let showSpinner = $state(false)
  let userValues = $state(null)
  let reason = $state(null)
  let refundAmount = $state(null)
  let showConfirmation = $state(false)
  let refundProcessing = $state(false)
  let refundError = $state(null)

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
      showUserInfo = true
      showSpinner = false
    }
  }

  const handleClear = () => {
    email = ''
    validEmail = false
    global.makeButtonActive = false
    userFound = true
    showUserInfo = false
    showSpinner = false
    userValues = null
    refundError = null
    showConfirmation = false
    refundProcessing = false
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {  
        handleGetInfo()
      }
    }
  }

  const handleReason = (value) => {
    reason = value
  }

  const handleRefund = async () => {
    refundProcessing = true
    const response = await axios.post('/api/refund', {
      email: email,
      taxYear: userValues.latestTaxYearPaid,
      reason: reason || ''
    })
    if (!response.data.success) {
      refundError = response.data.error
      refundProcessing = false
      return
    }
    refundAmount = response.data.amount
    showConfirmation = true
    refundProcessing = false
  }

</script>

<svelte:window on:keydown={handleKeyDown} />

<Header hideReset={true} hideBack={true} hideLogout={true} showAdminLogout={true} />
<Avatar />
<Heading text="Refund" desktopwidth="450px" mobilewidth="300px" /> 
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
  <Refund userValues={userValues}  onReason={handleReason} onRefund={handleRefund} refundProcessing={refundProcessing} showConfirmation={showConfirmation} refundAmount={refundAmount} refundError={refundError} />
{/if}

