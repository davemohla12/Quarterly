<script>
  import { store } from '$src/stores/store.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { updateLoginState } from '$src/utilities/utilities'
  import { supabase } from '$src/utilities/supabase'
  
  let showAccountMenu = $state(false)
  let buttonText = $state('GET STARTED')

  $effect(() => {
    if (store.loggedIn) {
      if (store.currentPage == 'dashboard') {
        buttonText = 'DASHBOARD'
      }
      else {
        buttonText = 'RESUME'
      }
    }
    else {
      buttonText = 'GET STARTED'
    }
  })

  onMount(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
    document.removeEventListener('click', handleClickOutside)
  }
  })

  const handleMenuClick = () => {
    store.showMenu = true
  }

  const handleGetStarted = () => {
    goto('/0')
  }

  const handleLogin = () => {
    goto('/login')
  }

  const handleLogoClick = () => {
    goto('/')
  }

  const handleAccountClick = () => {
    showAccountMenu = !showAccountMenu
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest('.menu') && !event.target.closest('.account')) {
      showAccountMenu = false
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    updateLoginState(false)
    localStorage.clear()
    goto('/')
    showAccountMenu = false
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
    <Clickable onclick={handleGetStarted}>
      <div class="get">{buttonText}</div>
    </Clickable>
    {#if store.loggedIn}
      <Clickable onclick={handleAccountClick}>
        <img class="account" src="/images/account.png" alt="Account" />
      </Clickable>
    {:else}
      <Clickable onclick={handleLogin}>
        <div class="login">LOGIN</div>
      </Clickable>
    {/if}
    {#if showAccountMenu}
      <div class="accountmenu">
        <Clickable onclick={handleLogout}>
          <div class="item">Logout</div>
        </Clickable>
      </div>
      {/if}
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
  .get {
    display: none;
  }
  .account {
    width: 31px;
    height: 31px;
    margin-left: 35px;
  }
  .login {
    display: none;
  }
  .accountmenu {
    position: absolute;
    right: 0px;
    top: 50px;
    background: var(--dark);
    color: var(--white);
    padding-top: 15px;
    padding-bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    z-index: 100;
  }
  .item {
    color: var(--white);
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);
    margin-bottom: 20px;
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
    .get {
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
      margin-left: 40px;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: var(--regular);
      color: var(--dark);
      cursor: pointer;
    }
  }
</style>