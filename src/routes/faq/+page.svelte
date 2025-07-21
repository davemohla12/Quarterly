<script> 
  import { global } from '$src/data/global.svelte'
  import Menu from '$src/components/home/Menu.svelte'
  import Overlay from '$src/components/home/Overlay.svelte'
  import Header from '$src/components/home/Header.svelte'
  import Faq from '$src/components/home/Faq.svelte'
  import Footer from '$src/components/home/Footer.svelte' 
  import { safePostHog } from '$src/utilities/posthog'
  import { onMount } from 'svelte'

  onMount(() => {
    safePostHog.capture('faq_viewed')
  })
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

{#if global.showMenu}
  <Menu />
  <Overlay />
{/if}
<Header />
<Faq />
<Footer />

