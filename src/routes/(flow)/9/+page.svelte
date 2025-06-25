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

  const headingText = `You'll need your federal tax return from last year`
  const buttonText = 'NEXT'
  global.makeButtonActive = true
  
  const handleNext = async () => {
    goto('/10')
    await user.setValue('currentPage', '10')
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
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<Image src="/images/federal.png" alt="Federal Tax Return" width="179px" height="233px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
