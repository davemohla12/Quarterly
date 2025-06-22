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

  const headingText = `Hi! I'm Zenguider`
  const subheadingText = `I'll help you estimate and pay your quarterly taxes`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  const handleNext = () => {
    user.setValue('currentPage', '1')
    goto('/1')
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

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<Subheading text={subheadingText} />
<Button text={buttonText} onclick={handleNext} />
<Later />
