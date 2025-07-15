<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  import { currentTaxYear } from '$src/settings/settings'
  import { removeCredits } from '$src/utilities/database'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  const headingText = `Your credits covered the full purchase price`
  let subheadingText = $state('')
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  onMount(async () => {
    const creditsUsed = $page.url.searchParams.get('credits') || 0
    await user.setValue('latestTaxYearPaid', currentTaxYear)
    await user.addValue('taxYearsPaid', currentTaxYear)
    let remainingCredits 
    if (creditsUsed > 0) {
      await removeCredits(global.email, creditsUsed)
      remainingCredits = await user.getValue('credits')
      subheadingText = `You've used $${creditsUsed} in credits and have $${remainingCredits} in credits remaining`
    }
  })

  const handleNext = async () => {
    goto('/dashboard')
    await user.setValue('currentPage', 'dashboard')
  }

</script>


<Header />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="250px" />
<Button text={buttonText} onclick={handleNext} />
