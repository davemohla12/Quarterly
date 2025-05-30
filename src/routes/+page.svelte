<script>
  import Header from '$src/components/landing/Header.svelte'
  import Stressfree from '$src/components/landing/Stressfree.svelte'
  import Flow from '$src/components/landing/Flow.svelte'
  import Penalties from '$src/components/landing/Penalties.svelte'
  import Reminders from '$src/components/landing/Reminders.svelte'
  import Both from '$src/components/landing/Both.svelte'
  import Guarantee from '$src/components/landing/Guarantee.svelte'
  import Price from '$src/components/landing/Price.svelte'
  import Footer from '$src/components/landing/Footer.svelte'
  import Menu from '$src/components/landing/Menu.svelte'
  import Overlay from '$src/components/landing/Overlay.svelte'
  import { store } from '$src/stores/store.svelte'
  import { onMount } from 'svelte'
  
  onMount(() => {
    store.loginLocation = 'home'
    if (!store.loggedIn) {
      localStorage.clear()
    }
  })
  
</script>

<div class="page">
  {#if store.showMenu}
    <Menu />
    <Overlay />
  {/if}
  <Header />
  <Stressfree />
  <Flow />
  <Penalties />
  <Reminders />
  <Both />
  {#if false}
    <Guarantee />
  {/if}
  <Price />
  <Footer />
</div>

<style>
  .page {
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>


