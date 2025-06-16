<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'
  import { getBelowMinimumTaxText } from '$src/utilities/federaltax'
  import { stateRules } from '$src/rules/state'

  const headingText = `You don't need to pay any quarterly taxes this year`
  const subheadingText = `You may still pay income tax at the end of the year but you don't need to worry about quarterly taxes`
  const buttonText = 'DONE'
  store.makeButtonActive = true
  
  const handleDone = () => {
    if (store.loggedIn && store.active == true) {
      if (stateRules[store.currentState].stateHasQuarterlyTaxes == true) { 
        store.stateSupported = true
        store.q1federalQuarterlyPayment = 0
        store.q2federalQuarterlyPayment = 0
        store.q3federalQuarterlyPayment = 0
        store.q4federalQuarterlyPayment = 0  
        store.q1StateQuarterlyPayment = 0
        store.q2StateQuarterlyPayment = 0
        store.q3StateQuarterlyPayment = 0
        store.q4StateQuarterlyPayment = 0
        store.singleFederalDue = 0
        store.singleFederalPaid = 0
        store.singleFederalRemaining = 0
        store.singleStateDue = 0
        store.singleStatePaid = 0
        store.singleStateRemaining = 0
        store.explanation = getBelowMinimumTaxText()
      }
      else {
        store.q1federalQuarterlyPayment = 0
        store.q2federalQuarterlyPayment = 0
        store.q3federalQuarterlyPayment = 0
        store.q4federalQuarterlyPayment = 0
        store.singleFederalDue = 0
        store.singleFederalPaid = 0
        store.singleFederalRemaining = 0
        store.explanation = getBelowMinimumTaxText()
        store.currentPage = 'dashboard'
        goto('/dashboard')
      }
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="250px" />
<Button text={buttonText} onclick={handleDone} />
