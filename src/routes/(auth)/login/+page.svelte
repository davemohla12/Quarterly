<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import GoogleButton from '$src/components/app/GoogleButton.svelte'
  import Or from '$src/components/app/Or.svelte'
  import BottomText from '$src/components/app/BottomText.svelte'
  import { goto } from '$app/navigation'
  import EmailInput from '$src/components/app/EmailInput.svelte'
  import PasswordInput from '$src/components/app/PasswordInput.svelte'
  import { store } from '$src/stores/store.svelte'
  import { supabase } from '$src/utilities/supabase'
  import ErrorText from '$src/components/app/ErrorText.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { saveDatabaseToLocalStorage, saveLocalStorageToDatabase, getCurrentPageFromDatabase } from '$src/utilities/database'

  const headingText = `Welcome back`
  const subheadingText = `By continuing, you agree with our <a href="/terms" target="_blank">terms</a> and <a href="/privacy" target="_blank">privacy policy</a>`
  const buttonText = 'NEXT'
  const placeholderText1 = 'EMAIL'
  const placeholderText2 = 'PASSWORD'
  const bottomtextText = `Don't have an account?&nbsp;&nbsp;<a href="/signup">Sign Up</a>`
  let disableButton = $state(false)

  let email = $state(null)
  let password = $state(null)
  let validEmail = $state(false)
  let validPassword = $state(false)
  let emailError = $state('')
  let passwordError = $state('')
  store.makeButtonActive = false
  let errorMessage = $state('')

  const handleInput1 = (value, isValidEmail) => {
    email = value
    validEmail = isValidEmail
    if (email && password && email != '' && password != '') {
      store.makeButtonActive = true
    } 
    else {
      store.makeButtonActive = false
    }
  }
  
  const handleInput2 = (value, isValidPassword) => {
    password = value 
    validPassword = isValidPassword
    if (email && password && email != '' && password != '') {
      store.makeButtonActive = true
    }
    else {
      store.makeButtonActive = false
    }
  }

  const handleGoogle = async () => {
     await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }
  
  const handleNext = () => {
    if (!validEmail) {
      emailError = 'Enter a valid email address'
    }
    if (!validPassword) {
      passwordError = 'Your password must be at least 8 characters long'
    }
    if (validEmail && validPassword) {
      signUpUser()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
        handleNext()
      }
    }
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }

  const signUpUser = async () => {
    disableButton = true
    errorMessage = ''
    const loginResult = await supabase.auth.signInWithPassword({ email, password })
    let loginUser = loginResult.data?.user
    let loginError = loginResult.error?.message?.toLowerCase()
    if (loginUser) {
      if (store.loginLocation == 'home') {
        await saveDatabaseToLocalStorage()
        store.currentPage = await getCurrentPageFromDatabase()
        goto('/')
      }
      else if (store.loginLocation == 'later') {
        goto('/')
        store.showResumeBanner = true
        await saveLocalStorageToDatabase()
      }
      else if (store.loginLocation == 'flow') {
        store.currentPage = 'dashboard'
        goto(`/${store.currentPage}`)
        await saveLocalStorageToDatabase()
      }
      else if (store.loginLocation == 'dashboard') {
        store.currentPage = 'dashboard'
        await saveDatabaseToLocalStorage()
        goto(`/${store.currentPage}`)
      }
    }
    else {
      await supabase.auth.signUp({ 
        email, 
        password, 
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirmed: false
          }
        }
      })    
      const loginResult = await supabase.auth.signInWithPassword({ email, password })
      loginUser = loginResult.data?.user
      loginError = loginResult.error?.message?.toLowerCase()  
      if (loginError.includes('invalid login credentials')){
        disableButton = false
        errorMessage = "Your login is invalid or you may have signed up using another method. Please try again."
      }
      else if (loginError.includes('email not confirmed')) {
        store.justSignedUp = true
        store.email = email
        if (store.loginLocation == 'home') {
          await saveDatabaseToLocalStorage()
        }
        else if (store.loginLocation == 'later') {
          await saveLocalStorageToDatabase()
        }
        else if (store.loginLocation == 'flow') {
          store.currentPage = 'dashboard'
          await saveLocalStorageToDatabase()
        }
        else if (store.loginLocation == 'dashboard') {
          store.currentPage = 'dashboard'
          await saveDatabaseToLocalStorage()
        }
        goto('/confirm')
      }
      else {
        disableButton = false
        errorMessage = loginResult.error
      }
    }
  }

  const handleForgot = () => {
    goto('/reset')
  }

</script>

<svelte:window on:keydown={handleKeyDown} />

<Header hideIcons={true} />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilelarge={true} />
<Subheading text={subheadingText} desktopwidth="550px" mobilewidth="220px" />
<GoogleButton onclick={handleGoogle} />
<Or />
<EmailInput placeholder={placeholderText1} onInput={handleInput1} value={email} error={emailError}/>
<PasswordInput placeholder={placeholderText2} onInput={handleInput2} value={password} error={passwordError}/>
<Clickable onclick={handleForgot}>
  <div class="forgot">Forgot password</div>
</Clickable >
{#if disableButton}
  <Button showSpinner={true} enabled={false} dark={true} />
{:else}
  <Button text={buttonText} onclick={handleNext}/>
{/if}
<ErrorText errorMessage={errorMessage} />
<BottomText text={bottomtextText} />

<style>
  .forgot {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: var(--regular);
    color: var(--gray4);
    margin-top: 25px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    text-decoration: none;
  }
  .forgot:hover {
    text-decoration: underline;
  }
</style>



