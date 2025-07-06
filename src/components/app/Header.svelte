<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { global } from '$src/data/global.svelte'
  import { updateLoginState } from '$src/utilities/utilities'
  import { supabase } from '$src/utilities/supabase'
  import { user } from '$src/data/user.svelte'
  import { clearLocalStorage } from '$src/utilities/utilities'
  import { safePostHog } from '$src/utilities/posthog'

  let props = $props()
  let hideBack = $derived(props.hideBack || false)
  let hideIcons = $derived(props.hideIcons || false)
  let hideReset = $derived(props.hideReset || false)
  let showDownload = $derived(props.showDownload || false)
  let ondownloadclick = $derived(props.ondownloadclick || (() => {}))
  let onBack = $derived(props.onBack || (() => {}))
  let showAccountIcon = $derived(props.showAccountIcon || false)
  let showAccountMenu = $state(false)
  let showAdminLogout = $derived(props.showAdminLogout || false)

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
    goto('/')
    showAccountMenu = false
  }

  const handleDashboard = async () => {
    showAccountMenu = false
    goto('/dashboard')
    await user.setValue('currentPage', 'dashboard')
  }

  const handleReminders = () => {
    safePostHog.capture('reminders_clicked')
    goto('/reminders')
    showAccountMenu = false
  }

  const handlePriorYears = () => {  
    safePostHog.capture('prior_years_clicked')
    goto('/prior')
    showAccountMenu = false
  }

  const handleSupport = () => {
    safePostHog.capture('support_clicked')
    goto('/support')
    showAccountMenu = false
  }

  const handleReset = async () => {
    global.makeButtonActive = true
    clearLocalStorage()
    goto('/0')
    await user.setValue('currentPage', '0')
  }

  const handleDownloadClick = () => {
    ondownloadclick()
  }

  const handleAdminLogout = () => {
    clearLocalStorage()
    goto('/admin/login')
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
      {#if showDownload}
        <Clickable onclick={handleDownloadClick}>
          <img class="download" src="/images/download.png" alt="Download" />
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
      {#if showAdminLogout}
        <Clickable onclick={handleAdminLogout}>
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
          <Clickable onclick={handlePriorYears}>
            <div class="item">Prior Years</div>
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
  .download {
    width: 26px;
    height: 26px;
    margin-left: 15px;  
    margin-right: 5px;
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
    .download { 
      margin-right: 15px;
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
