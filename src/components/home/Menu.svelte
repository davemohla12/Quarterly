<script>
  import { global } from '$src/data/global.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { supabase } from '$src/utilities/supabase'
  import { updateLoginState } from '$src/utilities/utilities'
  import { clearLocalStorage, setLocalStorage } from '$src/utilities/utilities'

  let logInText = $state('')

  onMount(() => {
    if (global.loggedIn) {
      logInText = 'Logout'
    }
    else { 
      logInText = 'Login'
    }
  })

  const handleClose = () => {
    global.showMenu = false
  }

  const handleHome = () => {
    global.showMenu = false
    goto('/')
  }

  const handleGetStarted = () => {
    global.showMenu = false
    goto('/0')
  }

  const handleFaq = () => {
    global.showMenu = false
    goto('/faq')
  }

  const handleLogin = async () => {
    if (logInText == 'Login') {
      global.showMenu = false
      setLocalStorage('loginLocation', 'home')
      goto('/login')
    }
    else {
      await supabase.auth.signOut()
      updateLoginState(false)
      clearLocalStorage()
      global.showMenu = false
    }
  }
</script>

<div class="menu" in:fly={{ x: -300, duration: 300 }}>
  <Clickable onclick={handleClose}>
    <img class="close" src="/images/close.png" alt="Close" />
  </Clickable>
  <div class="items">
    <Clickable onclick={handleHome}>
      <div class="item">Home</div>
    </Clickable>
    <Clickable onclick={handleGetStarted}>
      <div class="item">Get Started</div>
    </Clickable>
    <Clickable onclick={handleFaq}>
      <div class="item">FAQ</div>
    </Clickable>
    <Clickable onclick={handleLogin}>
      <div class="item">{logInText}</div>
    </Clickable>
  </div>
</div>

<style>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: var(--dark);
    z-index: 100;
  }
  .close {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 25px;
    margin-left: 35px;
  }
  .item {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: var(--regular);
    color: var(--white);
    margin-top: 15px;
    margin-bottom: 15px;
  }

</style>