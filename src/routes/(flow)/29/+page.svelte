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
  import { currentTaxYear } from '$src/settings/settings'
  import { onMount } from 'svelte'

  const headingText = `View your quarterly taxes for FREE for a limited time`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  onMount(async () => {
    if (await user.getValue('latestTaxYearPaid') != currentTaxYear) {
      safePostHog.capture('flow_price_page_viewed')
    }
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        if (global.makeButtonActive == true) {
        handleNext()
      }
    }
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<Header hideReset={true} />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilewidth="320px" />
<Price />
<Bullets />
<Button text={buttonText} onclick={handleNext} />
<Later />

