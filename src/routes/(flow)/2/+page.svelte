<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'
  import { getNoIncomeText } from '$src/utilities/federaltax'
  
  const headingText = `You don't need to pay any quarterly taxes this year`
  const subheadingText = `Since all your income has taxes automatically withheld, the IRS doesn't require you to make separate quarterly payments.`
  const buttonText = 'DONE' 
  store.makeButtonActive = true

  const handleDone = () => {
    if (store.loggedIn && store.active == true) {
      store.stateSupported = true
      store.currentState = 'State'
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
      store.explanation = getNoIncomeText()
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
<Heading text={headingText} desktopwidth="500px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="320px" />
<Button text={buttonText} onclick={handleDone} />
