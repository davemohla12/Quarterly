<script>
  import Header from "$src/components/app/Header.svelte"
  import Avatar from "$src/components/app/Avatar.svelte"
  import Heading from "$src/components/app/Heading.svelte"
  import PasscodeInput from "$src/components/app/PasscodeInput.svelte"
  import { global } from "$src/data/global.svelte"
  import { adminPasscode } from "$src/settings/settings"
  import { goto } from "$app/navigation"
  import { setLocalStorage, getLocalStorage } from "$src/utilities/utilities"
  import ControlledButton from "$src/components/app/ControlledButton.svelte"
  import { onMount } from "svelte"

  const headingText = "Admin login"
  let passcode = $state(null)
  let error = $state(null)
  let showSpinner = $state(false)

  onMount(() => {
    global.makeButtonActive = false
  })

  const handleInput = (value) => {
    passcode = value
    error = null
    if (passcode && passcode != '') {
      global.makeButtonActive = true
    }
    else {
      global.makeButtonActive = false
    }
  }

  const handleLogin = () => {
    showSpinner = true
    if (passcode == adminPasscode) {
      setLocalStorage('adminLoggedIn', 'true')
      const adminPage = getLocalStorage('adminPage')
      goto(`/${adminPage}`)
    }
    else {
      error = 'Invalid passcode'
      showSpinner = false
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {  
        handleLogin()
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />


<Header hideIcons={true} hideBack={true} />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<PasscodeInput placeholder="Passcode" onInput={handleInput} error={error} />
<ControlledButton text="LOGIN" onclick={handleLogin} showSpinner={showSpinner}/>
