<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'
  import { safePostHog } from '$src/utilities/posthog'

  const headingText = `Hi! I'm Zenguider`
  const subheadingText = `I'll help you estimate and pay your quarterly taxes`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  onMount(async () => {
    safePostHog.capture('flow_started')
  })

  const handleNext = async () => {
    goto('/1')
    await user.setValue('currentPage', '1')
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<Subheading text={subheadingText} />
<Button text={buttonText} onclick={handleNext} />
<Later />
