<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import Image from '$src/components/app/Image.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'
  import { safePostHog } from '$src/utilities/posthog'
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `You'll need your federal tax return from last year`
  const buttonText = 'NEXT'
  global.makeButtonActive = true
  
  onMount(async () => {
    const campaign = getLocalStorage('campaign')
    const keyword = getLocalStorage('keyword')
    safePostHog.capture('returns_viewed', {
      campaign: campaign,
      keyword: keyword,
      returns: 'federal'
    })
  })

  const handleNext = async () => {
    goto('/10')
    await user.setValue('currentPage', '10')
  }

</script>

<Header />
<Avatar screen={10} />
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<Image src="/images/federal.png" alt="Federal Tax Return" width="179px" height="233px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
