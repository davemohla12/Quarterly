<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { getBelowMinimumTaxText } from '$src/utilities/federaltax'
  
  const headingText = `You don't need to pay any federal quarterly taxes this year`
  const subheadingText = `Since you're living in multiple states this year, I can't estimate your state taxes — but you're all set on the federal side`
  const buttonText = 'DONE'
  store.makeButtonActive = true
  
  const handleDone = () => {
    if (store.loggedIn && store.active == true) {
      store.stateSupported = false
      store.q1federalQuarterlyPayment = 0
      store.q2federalQuarterlyPayment = 0
      store.q3federalQuarterlyPayment = 0
      store.q4federalQuarterlyPayment = 0
      store.explanation = getBelowMinimumTaxText()
      store.currentPage = 'dashboard'
      goto('/dashboard')
    }
    else {
      goto('/')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
        handleDone()
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
<Heading text={headingText} mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<Button text={buttonText} onclick={handleDone} />
