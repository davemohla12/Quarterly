<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import GoogleButton from '$src/components/app/GoogleButton.svelte'
  import Or from '$src/components/app/Or.svelte'
  import BottomText from '$src/components/app/BottomText.svelte'
  import { goto } from '$app/navigation'
  import EmailInput from '$src/components/app/EmailInput.svelte'
  import PasswordInput from '$src/components/app/PasswordInput.svelte'
  import { global } from '$src/data/global.svelte'
  import { supabase } from '$src/utilities/supabase'
  import ErrorText from '$src/components/app/ErrorText.svelte'
  import { saveToPayments, createUserIfNotExists } from '$src/utilities/database'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `Let's create your  account`
  const subheadingText = `By continuing, you agree with our <a href="/terms" target="_blank">terms</a> and <a href="/privacy" target="_blank">privacy policy</a>`
  const buttonText = 'NEXT'
  const placeholderText1 = 'EMAIL'
  const placeholderText2 = 'PASSWORD'
  const bottomtextText = 'Already have an account?&nbsp;&nbsp;<a href="/login">Login</a>'
  
  global.makeButtonActive = false
  let email = $state(null)
  let password = $state(null)
  let validEmail = $state(false)
  let validPassword = $state(false)
  let emailError = $state('')
  let passwordError = $state('')
  let errorMessage = $state('')
  let disableButton = $state(false)

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
    if (event.key === 'ArrowLeft') {
      history.back()
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
        global.showResumeBanner = true
        goto('/')
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
      const loginResult = await supabase.auth.signInWithPassword({ email, password })
      loginUser = loginResult.data?.user
      loginError = loginResult.error?.message?.toLowerCase()  
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
        errorMessage = loginResult.error
      }
    }
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
{#if disableButton}
  <Button showSpinner={true} enabled={false} dark={true} />
{:else}
  <Button text={buttonText} onclick={handleNext}/>
{/if}
<ErrorText errorMessage={errorMessage} />
<BottomText text={bottomtextText} />




