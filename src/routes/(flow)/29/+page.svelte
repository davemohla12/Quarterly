<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import Price from '$src/components/app/Price.svelte'
  import Bullets from '$src/components/app/Bullets.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  import { setLocalStorage } from '$src/utilities/utilities'
  import { safePostHog } from '$src/utilities/posthog'
  import { onMount } from 'svelte'

  const headingText = `View your quarterly taxes for one simple fee`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  onMount(async () => {
    safePostHog.capture('flow_price_page_viewed')

    setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-1040756020/3nAmCP_Sy_UaEt1TevAD',
          'value': 1.0,
          'currency': 'USD'
        })
        console.log('Conversion fired!')
      } 
      else {
        console.error('gtag not available')
      }
    }, 1000)
  })

  const handleNext = async () => {
    if (global.loggedIn) {
      goto('/checkout')
      await user.setValue('currentPage', 'checkout')
    }
    else {
      setLocalStorage('loginLocation', 'flow')
      goto('/signup')
    }
  }

</script>


<Header hideReset={true} />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="320px" />
<Price />
<Bullets />
<Button text={buttonText} onclick={handleNext} />
<Later />

