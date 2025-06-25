<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import PasswordInput from '$src/components/app/PasswordInput.svelte'
  import { supabase } from '$src/utilities/supabase' 
  import { onMount } from 'svelte'
  import { saveToUsers, saveToPayments } from '$src/utilities/database'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'  
  
  const expiredText = `This link has expired`
  const expiredButtonText = 'RESET PASSWORD'
  const headingText = `Set your password`
  const buttonText = 'SAVE'
  const placeholderText = 'PASSWORD'
  
  let disableButton = $state(false)
  let password = $state(null)
  let validPassword = $state(false)
  global.makeButtonActive = false
  let errorMessage = $state('')
  let pageExpired = $state(false) 

  onMount(async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    if (error) {
      pageExpired = true
      global.makeButtonActive = true
    }
  })

  const handleInput = (value, isValidPassword) => {
    password = value
    validPassword = isValidPassword
    if (password && password != '') {
      global.makeButtonActive = true
    }
    else {
      global.makeButtonActive = false
    }
  }

  const handleSave = async () => {
    if (!validPassword) {
      errorMessage = 'Your password must be at least 8 characters long'
    }
    else { 
      errorMessage = ''
      disableButton = true
      await supabase.auth.updateUser({
        password: password
      })
      if (getLocalStorage('loginLocation') == 'home') {
        goto('/')
      }
      else if (getLocalStorage('loginLocation') == 'later') {
        await saveToUsers()
        await saveToPayments()
        goto('/')
        global.showResumeBanner = true
      }
      else if (getLocalStorage('loginLocation') == 'flow') {
        goto('/checkout')
        await saveToUsers()
        await saveToPayments()
      }
      else if (getLocalStorage('loginLocation') == 'dashboard') {
        goto(`/dashboard`)
        await user.setValue('currentPage', 'dashboard')
      }
    }
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
        handleSave()
      }
    }
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }

  const handleResetButton = () => {
    goto('/reset')
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<Header hideIcons={true} hideBack={true} />
<Avatar />
{#if pageExpired}
  <Heading text={expiredText} desktopwidth="500px" mobilelarge={true}  />
  <Button text={expiredButtonText} dark={true} onclick={handleResetButton} />
{:else}
  <Heading text={headingText} desktopwidth="500px" mobilelarge={true}  />
  <PasswordInput placeholder={placeholderText} onInput={handleInput} error={errorMessage}/>
  {#if disableButton}
    <Button showSpinner={true} enabled={false} dark={true} />
  {:else}
    <Button text={buttonText} onclick={handleSave} />
  {/if}
{/if}

