<script>
  import { store } from '$src/stores/store.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { fly } from 'svelte/transition'
  import { goto } from '$app/navigation'

  const handleClose = () => {
    store.showMenu = false
  }

  const handleGetStarted = () => {
    store.showMenu = false
    goto('/0')
  }

  const handleLogin = () => {
    store.showMenu = false
    goto('/login')
  }
</script>

<div class="menu" in:fly={{ x: -300, duration: 300 }}>
  <Clickable onclick={handleClose}>
    <img class="close" src="/images/close.png" alt="Close" />
  </Clickable>
  <div class="items">
    <Clickable onclick={handleGetStarted}>
      <div class="item">Get Started</div>
    </Clickable>
    <Clickable onclick={handleLogin}>
      <div class="item">Login</div>
    </Clickable>
  </div>
</div>

<style>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100vw - 80px);
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