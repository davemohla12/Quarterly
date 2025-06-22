<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  
  const headingText = `I can help you with just your federal quarterly taxes`
  const subheadingText = `Multi-state taxes are a bit more complicated so you'll need to estimate and pay your state taxes on your own`
  const buttonText = 'NEXT'
  global.makeButtonActive = true
  
  const handleNext = () => {
    user.setValue('currentPage', '9')
    goto('/9')
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
<Heading text={headingText} desktopwidth="500px" mobilewidth="320px" />
<Subheading text={subheadingText} desktopwidth="400px" mobilewidth="320px"/>
<Button text={buttonText} onclick={handleNext} />
<Later />
