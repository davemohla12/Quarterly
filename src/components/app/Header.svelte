<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { store } from '$src/stores/store.svelte'
  import { updateLoginState } from '$src/utilities/utilities'
  import { supabase } from '$src/utilities/supabase'
  import { clearDatabase } from '$src/utilities/database'

  let props = $props()
  let hideBack = props.hideBack || false
  let hideIcons = props.hideIcons || false
  let hideReset = props.hideReset || false
  let onBack = props.onBack || (() => {})
  let showAccountMenu = $state(false)

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

  const handleReset = () => {
    localStorage.clear()
    clearDatabase()
    store.currentPage = '0'
    goto('/0')
    store.makeButtonActive = true
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
      {#if !hideReset && !(store.loggedIn && store.active)}
        <Clickable onclick={handleReset}>
          <img class="reset" src="/images/reset.png" alt="Reset" />
        </Clickable>
      {/if}
      {#if store.loggedIn}
        <Clickable onclick={handleAccountClick}>
          <img class="account" src="/images/account.png" alt="Account" />
        </Clickable>
      {/if}
      {#if showAccountMenu}
        <div class="menu">
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
  .account {
    width: 21px;
    height: 21px;
    margin-left: 15px;  
    margin-right: 10px;
  }
  .menu {
    position: absolute;
    right: 15px;
    top: 30px;
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
    .account {
      margin-right: 20px;
      margin-left: 10px;
    }
    .reset {
      margin-right: 20px;
    }
  }
</style>
