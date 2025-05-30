<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import Image from '$src/components/app/Image.svelte'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'
  const headingText = `You'll need your federal tax return from last year`
  const buttonText = 'NEXT'
  store.makeButtonActive = true
  
  const handleNext = () => {
    store.currentPage = '10'
    goto('/10')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
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
