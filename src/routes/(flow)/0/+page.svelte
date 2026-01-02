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
  import { page } from '$app/stores'
  import { setLocalStorage } from '$src/utilities/utilities'

  const headingText = `Hi! I'm Zenguider`
  const subheadingText = `I’m a tax expert with 30+ years of experience helping people avoid penalties and pay the right amount.<br /><br />I'll help you estimate and pay your quarterly taxes.<br /><br />It takes about 10 minutes and you can save and return anytime.<br /><br />Your information stays private and is never shared with anyone.`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  onMount(async () => {
    const campaign = $page.url.searchParams.get('campaign')
    const keyword = $page.url.searchParams.get('utm_term')
    safePostHog.capture('landing_viewed', {
      campaign: campaign,
      keyword: keyword
    })
    setLocalStorage('campaign', campaign)
    setLocalStorage('keyword', keyword)
  })

  const handleNext = async () => {
    goto('/1')
    await user.setValue('currentPage', '1')
  }

</script>

<Header />
<Avatar screen={1} />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="350px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
