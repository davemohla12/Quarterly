<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import EmailInput from '$src/components/app/EmailInput.svelte'  
  import { supabase } from '$src/utilities/supabase'

  const headingText = `Reset your password`
  const subheadingText = `I'll email you instructions to reset your password`
  const buttonText = 'RESET'
  const placeholderText = 'EMAIL'

  let disableButton = $state(false)
  let inputValue = $state(null)
  let errorMessage = $state('') 
  let email = $state(null)
  let validEmail = $state(false)
  global.makeButtonActive = false

  const handleInput = (value, isValidEmail) => {
    email = value
    validEmail = isValidEmail
    if (email && email != '') {
      global.makeButtonActive = true
    } 
    else {
      global.makeButtonActive = false
    }
  }

  const handleReset = async () => {
    disableButton = true
    errorMessage = ''
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/set`
    })
    if (error) {
      errorMessage = error.message
      disableButton = false
    } 
    else {
      goto('/sent')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
        handleReset()
      }
    }
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }

</script>

<svelte:window on:keydown={handleKeyDown} />

<Header hideIcons={true} />
<Avatar />
<Heading text={headingText} desktopwidth="500px" mobilelarge={true} />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="200px"/>
<EmailInput placeholder={placeholderText} onInput={handleInput} error={errorMessage}/>
{#if disableButton}
  <Button showSpinner={true} enabled={false} dark={true} />
{:else}
  <Button text={buttonText} onclick={handleReset} />
{/if}
