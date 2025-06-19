<script>
  import Header from '$src/components/home/Header.svelte'
  import Stressfree from '$src/components/home/Stressfree.svelte'
  import Flow from '$src/components/home/Flow.svelte'
  import Penalties from '$src/components/home/Penalties.svelte'
  import Reminders from '$src/components/home/Reminders.svelte'
  import Both from '$src/components/home/Both.svelte'
  import Guarantee from '$src/components/home/Guarantee.svelte'
  import Price from '$src/components/home/Price.svelte'
  import Footer from '$src/components/home/Footer.svelte'
  import Menu from '$src/components/home/Menu.svelte'
  import Overlay from '$src/components/home/Overlay.svelte'
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
  <Header showDashboardOption={true} />
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


