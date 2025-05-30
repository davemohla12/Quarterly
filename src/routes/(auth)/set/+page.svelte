<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'
  import PasswordInput from '$src/components/app/PasswordInput.svelte'
  import { supabase } from '$src/utilities/supabase' 
  import { onMount } from 'svelte'
  import { saveDatabaseToLocalStorage, saveLocalStorageToDatabase, getCurrentPageFromDatabase } from '$src/utilities/database'

  const expiredText = `This link has expired`
  const expiredButtonText = 'RESET PASSWORD'
  const headingText = `Set your password`
  const buttonText = 'SAVE'
  const placeholderText = 'PASSWORD'
  
  let disableButton = $state(false)
  let password = $state(null)
  let validPassword = $state(false)
  store.makeButtonActive = false
  let errorMessage = $state('')
  let pageExpired = $state(false) 

  onMount(async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    if (error) {
      pageExpired = true
      store.makeButtonActive = true
    }
  })

  const handleInput = (value, isValidPassword) => {
    password = value
    validPassword = isValidPassword
    if (password && password != '') {
      store.makeButtonActive = true
    }
    else {
      store.makeButtonActive = false
    }
  }

  const handleSave = async () => {
    if (!validPassword) {
      errorMessage = 'Your password must be at least 8 characters long'
    }
    else { 
      errorMessage = ''
      disableButton = true
      const { error } = await supabase.auth.updateUser({
        password: password
      })
      if (store.loginLocation == 'home') {
        saveDatabaseToLocalStorage()
        store.currentPage = await getCurrentPageFromDatabase()
        goto('/')
      }
      else if (store.loginLocation == 'later') {
        saveDatabaseToLocalStorage()
        goto('/')
        store.showResumeBanner = true
      }
      else if (store.loginLocation == 'flow') {
        store.currentPage = 'dashboard'
        saveDatabaseToLocalStorage()
        goto(`/${store.currentPage}`)
      }
    }
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
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

