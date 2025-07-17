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
  import { global } from '$src/data/global.svelte'
  import { onMount } from 'svelte'
  import { clearLocalStorage, setLocalStorage } from '$src/utilities/utilities'
  import { safePostHog } from '$src/utilities/posthog'
  import Referral from '$src/components/home/Referral.svelte'
  import { page } from '$app/stores'
  import { getReferrerEmail } from '$src/utilities/database'
  import { user } from '$src/data/user.svelte'

  let showReferralDialog = $state(false)

  onMount(async () => {
    clearLocalStorage()
    setLocalStorage('loginLocation', 'home')
    const referralCode = $page.url.searchParams.get('refer') || ''
    if (referralCode) {
      const referrerEmail = await getReferrerEmail(referralCode)
      if (referrerEmail) {
        showReferralDialog = true
        await user.setValue('referrerEmail', referrerEmail)
      }
    }
    safePostHog.capture('home_viewed')
  })

  $effect(() => {
    if (showReferralDialog || global.showMenu) {
      document.body.style.overflow = 'hidden'
    } 
    else {
      document.body.style.overflow = 'auto'
    }
  })

  const dismissMenu = () => {
    global.showMenu = false
  }

  const dismissReferral = () => {
    showReferralDialog = false
  }
  
</script>

<div class="page">
  {#if showReferralDialog}
    <Referral ondismiss={dismissReferral} />
    <Overlay ondismiss={dismissReferral} />
  {/if}
  {#if global.showMenu}
    <Menu />
    <Overlay ondismiss={dismissMenu} />
  {/if}
  <Header />
  <Stressfree />
  <Flow />
  <Penalties />
  <Reminders />
  <Both />
  <Guarantee />
  <Price />
  <Footer />
</div>

<style>
  .page {
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>


