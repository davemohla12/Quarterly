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
  import Loved from '$src/components/home/Loved.svelte'
  import { global } from '$src/data/global.svelte'
  import { onMount } from 'svelte'
  import { clearLocalStorage, setLocalStorage, getLocalStorage } from '$src/utilities/utilities'
  import { safePostHog } from '$src/utilities/posthog'
  import Referral from '$src/components/home/Referral.svelte'
  import { page } from '$app/stores'
  import { getReferrerEmail } from '$src/utilities/database'
  import { user } from '$src/data/user.svelte'
  import CreditsApplied from '$src/components/home/CreditsApplied.svelte'
  import NewUsers from '$src/components/home/NewUsers.svelte'

  let showReferralDialog = $state(false)
  let showCreditsAppliedDialog = $state(false)
  let showNewUsersDialog = $state(false)

  onMount(async () => {
    showCreditsAppliedDialog = getLocalStorage('showCreditsAppliedDialog')
    showNewUsersDialog = getLocalStorage('showNewUsersDialog') 
    const showReferralCredits = getLocalStorage('showReferralCredits')
    clearLocalStorage()
    setLocalStorage('showCreditsAppliedDialog', showCreditsAppliedDialog)
    setLocalStorage('showNewUsersDialog', showNewUsersDialog)
    setLocalStorage('showReferralCredits', showReferralCredits)
    setLocalStorage('loginLocation', 'home')
    const referralCode = $page.url.searchParams.get('refer') || ''
    if (referralCode) {
      const referrerEmail = await getReferrerEmail(referralCode)
      if (referrerEmail) {
        showReferralDialog = true
        await user.setValue('referrerEmail', referrerEmail)
      }
    }
    setTimeout(() => {
      const anchor = $page.url.hash.replace('#', '')
      const campaign = $page.url.searchParams.get('campaign')
      const keyword = $page.url.searchParams.get('keyword')
      console.log(anchor)
      setLocalStorage('keyword', keyword)
      setLocalStorage('campaign', campaign)
      safePostHog.capture('home_viewed', {
        anchor: anchor,
        campaign: campaign,
        keyword: keyword
      })
    }, 100)
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

  const dismissCreditsApplied = () => {
    showCreditsAppliedDialog = false
    setLocalStorage('showCreditsAppliedDialog', false)
  }

  const dismissNewUsersDialog = () => {
    showNewUsersDialog = false
    setLocalStorage('showNewUsersDialog', false)
  }
  
</script>

<svelte:head>
  <title>Zenguider | Quarterly Taxes Made Simple </title>
  <meta name="description" content="The stress-free way for freelancers and solo business owners to calculate and pay quarterly taxes." />

  <meta property="og:title" content="Zenguider | Quarterly Taxes Made Simple" />
  <meta property="og:description" content="The stress-free way for freelancers and solo business owners to calculate and pay quarterly taxes." />
  <meta property="og:image" content="https://zenguider.com/images/og/home.png" />
  <meta property="og:url" content="https://zenguider.com/" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Zenguider | Quarterly Taxes Made Simple" />
  <meta name="twitter:description" content="The stress-free way for freelancers and solo business owners to calculate and pay quarterly taxes." />
  <meta name="twitter:image" content="https://zenguider.com/images/og/home.png" />
</svelte:head>

<div class="page">
  {#if showReferralDialog}
    <Referral ondismiss={dismissReferral} />
    <Overlay ondismiss={dismissReferral} />
  {/if}
  {#if showCreditsAppliedDialog}
    <CreditsApplied ondismiss={dismissCreditsApplied} />
    <Overlay ondismiss={dismissCreditsApplied} />
  {/if}
  {#if showNewUsersDialog}
    <NewUsers ondismiss={dismissNewUsersDialog} />
    <Overlay ondismiss={dismissNewUsersDialog} />
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
  <Loved />
  <Price />
  <Footer />
</div>

<style>
  .page {
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>


