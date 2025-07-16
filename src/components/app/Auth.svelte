<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import ControlledButton from '$src/components/app/ControlledButton.svelte'
  import GoogleButton from '$src/components/app/GoogleButton.svelte'
  import Or from '$src/components/app/Or.svelte'
  import BottomText from '$src/components/app/BottomText.svelte'
  import { goto } from '$app/navigation'
  import EmailInput from '$src/components/app/EmailInput.svelte'
  import PasswordInput from '$src/components/app/PasswordInput.svelte'
  import { global } from '$src/data/global.svelte'
  import { supabase } from '$src/utilities/supabase'
  import ErrorText from '$src/components/app/ErrorText.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { saveToPayments, createUserIfNotExists } from '$src/utilities/database'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  import { onMount } from 'svelte'

  let props = $props()
  let page = $derived(props.page)

  const subheadingText = `By continuing, you agree with our <a href="/terms" target="_blank">terms</a> and <a href="/privacy" target="_blank">privacy policy</a>`
  const buttonText = 'NEXT'
  const placeholderText1 = 'EMAIL'
  const placeholderText2 = 'PASSWORD'
  let bottomText = $state()
  let disableButton = $state(false)
  let headingText = $state()
  let showForgotPassword = $state(false)

  let email = $state(null)
  let password = $state(null)
  let validEmail = $state(false)
  let validPassword = $state(false)
  let emailError = $state('')
  let passwordError = $state('')
  global.makeButtonActive = false
  let errorMessage = $state('')

  onMount(() => {
    if (page == 'signup') {
      bottomText = `Already have an account?&nbsp;&nbsp;<a href="/login">Log In</a>`
      headingText="Let's create your account"
      showForgotPassword=false
    }
    else if (page == 'login') {
      bottomText = `Don't have an account?&nbsp;&nbsp;<a href="/signup">Sign Up</a>`
      headingText="Welcome back"
      showForgotPassword=true
    }
  })

  const handleInput1 = (value, isValidEmail) => {
    email = value
    validEmail = isValidEmail
    if (email && password && email != '' && password != '') {
      global.makeButtonActive = true
    } 
    else {
      global.makeButtonActive = false
    }
  }
  
  const handleInput2 = (value, isValidPassword) => {
    password = value 
    validPassword = isValidPassword
    if (email && password && email != '' && password != '') {
      global.makeButtonActive = true
    }
    else {
      global.makeButtonActive = false
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
      if (global.makeButtonActive == true) {
        handleNext()
      }
    }
  }

  const signUpUser = async () => {
    disableButton = true
    errorMessage = ''
    global.email = email
    const loginResult = await supabase.auth.signInWithPassword({ email, password })
    let loginUser = loginResult.data?.user
    let loginError = loginResult.error?.message?.toLowerCase()
    if (loginUser) {
      if (getLocalStorage('loginLocation') == 'home') {
        goto('/')
      }
      else if (getLocalStorage('loginLocation') == 'later') {
        await createUserIfNotExists()
        await user.setValue('currentPage', getLocalStorage('currentPage'))
        await saveToPayments()
        goto('/')
        global.showResumeBanner = true
      }
      else if (getLocalStorage('loginLocation') == 'flow') {
        await createUserIfNotExists()
        await user.setValue('currentPage', 'checkout')
        await saveToPayments()
        goto('/checkout')
      }
      else if (getLocalStorage('loginLocation') == 'dashboard') {
        goto(`/dashboard`)
        await user.setValue('currentPage', 'dashboard')
      }
      else if (getLocalStorage('loginLocation') == 'refer') {
        goto('/refer')
        await user.setValue('currentPage', 'refer')
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
      const loginResult2 = await supabase.auth.signInWithPassword({ email, password })
      loginUser = loginResult2.data?.user
      loginError = loginResult2.error?.message?.toLowerCase()  
      if (loginError.includes('invalid login credentials')){
        disableButton = false
        errorMessage = "Your login is invalid or you may have signed up using another method. Please try again."
      }
      else if (loginError.includes('email not confirmed')) {
        global.justSignedUp = true
        global.email = email
        if (getLocalStorage('loginLocation') == 'flow') {
          await createUserIfNotExists({currentPage: 'checkout'})
          await saveToPayments()
        }
        else if (getLocalStorage('loginLocation') == 'later') {
          await createUserIfNotExists({currentPage: getLocalStorage('currentPage')})
          await saveToPayments()
        }
        else if (getLocalStorage('loginLocation') == 'dashboard') {
          await user.setValue('currentPage', 'dashboard')
        }
        goto('/confirm')
      }
      else {
        disableButton = false
        errorMessage = loginResult2.error
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
{#if showForgotPassword}
  <Clickable onclick={handleForgot}>
    <div class="forgot">Forgot password</div>
  </Clickable >
{/if}
{#if disableButton}
  <ControlledButton showSpinner={true} enabled={false} dark={true} />
{:else}
  <ControlledButton text={buttonText} onclick={handleNext}/>
{/if}
<ErrorText errorMessage={errorMessage} />
<BottomText text={bottomText} />

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