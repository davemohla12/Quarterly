<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Back from '$src/components/app/Back.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'

  const headingText = `Let's walk through your inputs`
  const subheadingText = `It'll take less than 5 minutes and you'll need to complete it to the end`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  onMount(() => {
    window.addEventListener('popstate', handleBack)
    return () => {
      window.removeEventListener('popstate', handleBack)
    }
  })

  const handleNext = async () => {
    goto('/1')
    await user.setValue('currentPage', '1')
  }

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
        handleNext()
      }
    }
    if (event.key === 'ArrowLeft') {
      goto('/dashboard')
      await user.setValue('currentPage', 'dashboard')
    }
  }

  const handleBack = async (event) => {
    event.preventDefault()
    goto('/dashboard')
    await user.setValue('currentPage', 'dashboard')
  }

</script>

<svelte:window on:keydown={handleKeyDown} />

<Header />
<Avatar />
<Heading text={headingText} onBack={handleBack} desktopwidth="500px" mobilewidth="250px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="250px" />
<Button text={buttonText} onclick={handleNext} />
<Back onBack={(event) =>handleBack(event)}/>
