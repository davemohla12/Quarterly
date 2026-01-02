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
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `View your quarterly taxes for one simple fee`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  onMount(async () => {
    const campaign = getLocalStorage('campaign')
    const keyword = getLocalStorage('keyword')
    safePostHog.capture('price_viewed', {
      campaign: campaign,
      keyword: keyword
    })
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

