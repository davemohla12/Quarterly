<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { store } from '$src/stores/store.svelte'  
  import { goto } from '$app/navigation'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import Note from '$src/components/app/Note.svelte'
  
  const headingText = `You'll just pay federal quarterly taxes`
  const subheadingText = `${convertStateToUpperCase(store.currentState)} doesn't require quarterly taxes`
  const buttonText = 'NEXT'
  store.makeButtonActive = true

  const handleNext = () => {
    store.currentPage = '9'
    goto('/9')
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
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
{#if stateRules[store.currentState].note}
  <Note text={stateRules[store.currentState].note} desktopwidth="450px" mobilewidth="300px" />
{:else}
  <Subheading text={subheadingText} />
{/if}
<Button text={buttonText} onclick={handleNext} />
<Later />