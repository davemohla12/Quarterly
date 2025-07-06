<script>
  import Header from "$src/components/app/Header.svelte"
  import Avatar from "$src/components/app/Avatar.svelte"
  import Heading from "$src/components/app/Heading.svelte"
  import PasscodeInput from "$src/components/app/PasscodeInput.svelte"
  import { global } from "$src/data/global.svelte"
  import { adminPasscode } from "$src/settings/settings"
  import { goto } from "$app/navigation"
  import { setLocalStorage } from "$src/utilities/utilities"
  import Button from "$src/components/app/Button.svelte"
  import { onMount } from "svelte"

  const headingText = "Admin login"
  let passcode = $state(null)
  let error = $state(null)

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
    if (passcode == adminPasscode) {
      setLocalStorage('adminLoggedIn', 'true')
      goto('/admin')
    }
    else {
      error = 'Invalid passcode'
    }
  }

</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<PasscodeInput placeholder="Passcode" onInput={handleInput} error={error} />
<Button text="LOGIN" onclick={handleLogin}/>
