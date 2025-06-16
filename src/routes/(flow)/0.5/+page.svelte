<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Back from '$src/components/app/Back.svelte'
  import { store } from '$src/stores/store.svelte'  
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  
  const headingText = `Let's walk through your inputs`
  const subheadingText = `It'll take less than 5 minutes and you'll need to complete it to the end`
  const buttonText = 'NEXT'
  store.makeButtonActive = true

  onMount(() => {
    window.addEventListener('popstate', handleBack)
    return () => {
      window.removeEventListener('popstate', handleBack)
    }
  })

  const handleNext = () => {
    store.currentPage = '1'
    goto('/1')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
        handleNext()
      }
    }
    if (event.key === 'ArrowLeft') {
      store.currentPage = 'dashboard'
      goto('/dashboard')
    }
  }

  const handleBack = () => {
    event.preventDefault()
    store.currentPage = 'dashboard'
    goto('/dashboard')
  }

</script>

<svelte:window on:keydown={handleKeyDown} />

<Header />
<Avatar />
<Heading text={headingText} onBack={handleBack} desktopwidth="500px" mobilewidth="250px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="250px" />
<Button text={buttonText} onclick={handleNext} />
<Back onBack={handleBack}/>
