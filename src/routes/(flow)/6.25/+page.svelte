<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import Note from '$src/components/app/Note.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'

  const headingText = `You'll just pay federal quarterly taxes`
  let subheadingText = $state('')
  const buttonText = 'NEXT'
  let showNote = $state(false)
  global.makeButtonActive = true

  onMount(async () => {
    const currentState = await payment.getValue('currentState')
    subheadingText = `${convertStateToUpperCase(currentState)} doesn't require quarterly taxes`
    showNote = stateRules[currentState]?.note
  })

  const handleNext = async () => {
    await payment.setValue('stateSupported', false)
    await user.setValue('currentPage', '9')
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
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
{#if showNote}
  <Note text={showNote} desktopwidth="450px" mobilewidth="300px" />
{:else}
  <Subheading text={subheadingText} />
{/if}
<Button text={buttonText} onclick={handleNext} />
<Later />