<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { global } from '$src/data/global.svelte'
  import { updateLoginState } from '$src/utilities/utilities'
  import { supabase } from '$src/utilities/supabase'
  import { user } from '$src/data/user.svelte'
  import { clearLocalStorage, setLocalStorage } from '$src/utilities/utilities'

  let props = $props()
  let hideBack = props.hideBack || false
  let hideIcons = props.hideIcons || false
  let hideReset = props.hideReset || false
  let onBack = props.onBack || (() => {})
  let showAccountMenu = $state(false)
  let showAccountIcon = props.showAccountIcon || false

  onMount(() => {
      document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  const goBack = () => {
    history.back()
    onBack()
  }

  const handleLogoClick = () => {
    goto('/')
  }

  const handleAccountClick = () => {
    showAccountMenu = !showAccountMenu
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest('.accountmenu') && !event.target.closest('.account')) {
      showAccountMenu = false
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    updateLoginState(false)
    clearLocalStorage()
    setLocalStorage('loginLocation', 'home')
    goto('/')
    showAccountMenu = false
  }

  const handleDashboard = () => {
    goto('/dashboard')
    user.setValue('currentPage', 'dashboard')
    showAccountMenu = false
  }

  const handleReminders = () => {
    goto('/reminders')
    showAccountMenu = false
  }

  const handleSubscription = () => {
    showAccountMenu = false
  }

  const handleSupport = () => {
    showAccountMenu = false
  }

  const handleReset = () => {
    clearLocalStorage()
    user.setValue('currentPage', '0')
    goto('/0')
    global.makeButtonActive = true
  }

</script>

<div class="container">
  {#if !hideBack}
    <Clickable onclick={goBack}>
      <img class="back" src="/images/back.png" alt="Back" />
    </Clickable>
  {/if}
  <Clickable onclick={handleLogoClick}>
    <img class="logo" src="/images/logo.png" alt="Logo" />
  </Clickable>
  {#if !hideIcons}
    <div class="right">
      {#if !hideReset && !(global.loggedIn)}
        <Clickable onclick={handleReset}>
          <img class="reset" src="/images/reset.png" alt="Reset" />
        </Clickable>
      {/if}
      {#if global.loggedIn && showAccountIcon}
        <Clickable onclick={handleAccountClick}>
          <img class="account" src="/images/account.png" alt="Account" />
        </Clickable>
      {:else if global.loggedIn}
        <Clickable onclick={handleLogout}>
          <img class="logout" src="/images/logout.png" alt="Logout" />
        </Clickable>
      {/if}
      {#if showAccountMenu}
        <div class="accountmenu">
          <Clickable onclick={handleDashboard}>
            <div class="item">Dashboard</div>
          </Clickable>
          <Clickable onclick={handleReminders}>
            <div class="item">Reminders</div>
          </Clickable>
          <Clickable onclick={handleSubscription}>
            <div class="item">Subscription</div>
          </Clickable>
          <div class="divider"></div>
          <Clickable onclick={handleSupport}>
            <div class="item">Support</div>
          </Clickable>
          <Clickable onclick={handleLogout}>
            <div class="item">Logout</div>
          </Clickable>
          </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 20px;
  }
  .back {
    width: 12.5px;
    height: 24.5px;
    position: absolute;
    left: 20px;
  }
  .logo {
    width: 110px;
    height: 27px;
    margin-top: 5px;
  }
  .right {
    margin-top: 5px;
    position: absolute;
    right: 20px;
  }
  .reset {
    width: 18px;
    height: 21px;
    margin-right: 10px;
  }
  .logout {
    width: 21px;
    height: 21px;
    margin-left: 15px;  
    margin-right: 5px;
  }
  .account {
    width: 28px;
    height: 28px;
    margin-left: 15px;  
    margin-right: 10px;
  }
  .accountmenu {
    position: absolute;
    right: 15px;
    top: 35px;
    background: var(--dark);
    color: var(--white);
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 110px;
    z-index: 100;
    padding-left: 17px;
  }
  .item {
    color: var(--white);
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);
    margin-bottom: 20px;
  }
  .divider {
    width: calc(100% - 10px);
    border-bottom: 1px solid var(--white);  
    margin-bottom: 20px;
  }
  @media (min-width: 768px) { 
    .container {
      justify-content: flex-start;
    }
    .back {
      width: 21px;
      height: 41px;
      top: 120px;
    }
    .logo {
      margin-left: 20px;
      width: 134px;
      height: 33px;
    }
    .logout {
      margin-right: 10px;
    }
    .account {
      margin-right: 20px;
      margin-left: 10px;
    }
    .reset {
      margin-right: 20px;
    }
  }
</style>
