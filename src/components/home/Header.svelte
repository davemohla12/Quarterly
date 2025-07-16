<script>
  import { global } from '$src/data/global.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'
  import { updateLoginState } from '$src/utilities/utilities'
  import { supabase } from '$src/utilities/supabase'
  import { user } from '$src/data/user.svelte'
  import { clearLocalStorage, setLocalStorage } from '$src/utilities/utilities'

  let showSpinner = $state(true)
  let buttonText = $state('')

  $effect(async () => {
    showSpinner = true
    if (global.loggedIn) {
      const currentPage = await user.getValue('currentPage')
      if (currentPage == 'dashboard') {
        buttonText = 'DASHBOARD'
      }
      else if (currentPage == 'home' || !currentPage) {
        await user.setValue('currentPage', 'home')
        buttonText = 'GET STARTED'
      }
      else {
        buttonText = 'RESUME'
      }
    }
    else {
      buttonText = 'GET STARTED'
    }
    showSpinner = false
  })


  const handleMenuClick = () => {
    global.showMenu = true
  }

  const handleButtonClick = async () => {
    showSpinner = true
    if (buttonText == 'GET STARTED') {
      goto('/0')
      await user.setValue('currentPage', '0')
    }
    else if (buttonText == 'RESUME') {
      goto('/0.6')
    }
    else if (buttonText == 'DASHBOARD') {
      goto(`/dashboard`)     
      await user.setValue('currentPage', 'dashboard')
    }
  }

  const handleLogin = () => {
    setLocalStorage('loginLocation', 'home')
    goto('/login')
  }

  const handleLogoClick = () => {
    goto('/')
  }

  const handleFaq = () => {
    goto('/faq')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    updateLoginState(false)
    clearLocalStorage()
    goto('/')
  }
  
</script>

<div class="header">
  <Clickable onclick={handleMenuClick}>
    <img class="menu" src="images/menu.png" alt="Menu" />
  </Clickable>
  <Clickable onclick={handleLogoClick}>
    <img class="logo" src="images/logo.png" alt="Logo" />
  </Clickable>
  <div class="buttons">
    <Clickable onclick={handleFaq}>
      <div class="faq">FAQ</div>
    </Clickable>
    {#if global.loggedIn}
      <Clickable onclick={handleLogout}>
        <div class="login">LOGOUT</div>
      </Clickable>
    {:else}
      <Clickable onclick={handleLogin}>
        <div class="login">LOGIN</div>
      </Clickable>
    {/if}
    <Clickable onclick={handleButtonClick}>
      <div class="button">
        {#if showSpinner}
          <div class="circle"></div>
        {:else}
          {buttonText}
        {/if}
      </div>
    </Clickable>
  </div>
  <div class="line"></div>
</div>

<style>
  .header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    position: fixed;
    background-color: var(--white);
  }
  .menu {
    width: 20px;
    height: 10px;
    position: absolute;
    top: 30px;
    left: 20px;
  }
  .logo {
    margin-top: 25px;
    width: 110px;
    height: 27px;
  }
  .buttons {
    display: flex;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .faq {
    display: none;
  }
  .button {
    display: none;
  }
  .circle {
    width: 19px;
    height: 19px;
    border: 2px solid var(--white);
    border-top-color: transparent;
    border-radius: 50%;
    animation: circle 0.8s linear infinite;
    }
  @keyframes circle {
    to {
      transform: rotate(360deg);
    }
  }
  .login {
    display: none;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: var(--gray2);
  }
  @media (min-width: 768px) {
    .menu {
      display: none;
    }
    .logo {
      margin-top: 22px;
      width: 138px;
      height: 34px;
    }
    .buttons {
      right: 30px;
    }
    .faq {
      display: block;
      margin-right: 50px;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      cursor: pointer;
    }
    .button {
      display: block;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: var(--regular);
      color: var(--white);
      background-color: var(--dark);
      width: 140px;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .login {
      display: block;
      margin-right: 15px;
      margin-right: 50px;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: var(--regular);
      color: var(--dark);
      cursor: pointer;
    }
  }
</style>