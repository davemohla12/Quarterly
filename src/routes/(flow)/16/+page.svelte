<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { getBelowMinimumTaxText } from '$src/utilities/federaltax'
  import { stateRules } from '$src/rules/state'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'

  let headingText = $state('')
  let subheadingText = $state('')
  const buttonText = 'DONE'
  global.makeButtonActive = true
  
  onMount(async () => {
    headingText = `You don't need to pay any quarterly taxes this year`
    subheadingText = `You may still pay income tax at the end of the year but you don't need to worry about quarterly taxes`
  })

  const handleDone = async () => {
    if (global.loggedIn && await user.getValue('latestTaxYearPaid') == currentTaxYear) {
      if (stateRules[await payment.getValue('currentState')].stateHasQuarterlyTaxes == true) { 
        await payment.setValue('stateSupported', true)
        await payment.setValue('q1federalQuarterlyPayment', 0)
        await payment.setValue('q2federalQuarterlyPayment', 0)
        await payment.setValue('q3federalQuarterlyPayment', 0)
        await payment.setValue('q4federalQuarterlyPayment', 0)  
        await payment.setValue('q1StateQuarterlyPayment', 0)
        await payment.setValue('q2StateQuarterlyPayment', 0)
        await payment.setValue('q3StateQuarterlyPayment', 0)
        await payment.setValue('q4StateQuarterlyPayment', 0)
        await payment.setValue('singleFederalDue', 0)
        await payment.setValue('singleFederalPaid', 0)
        await payment.setValue('singleFederalRemaining', 0)
        await payment.setValue('singleStateDue', 0)
        await payment.setValue('singleStatePaid', 0)
        await payment.setValue('singleStateRemaining', 0)
        await payment.setValue('explanation', getBelowMinimumTaxText())
      }
      else {
        await payment.setValue('q1federalQuarterlyPayment', 0)
        await payment.setValue('q2federalQuarterlyPayment', 0)
        await payment.setValue('q3federalQuarterlyPayment', 0)
        await payment.setValue('q4federalQuarterlyPayment', 0)
        await payment.setValue('singleFederalDue', 0)
        await payment.setValue('singleFederalPaid', 0)
        await payment.setValue('singleFederalRemaining', 0)
        await payment.setValue('explanation', getBelowMinimumTaxText())
      }
      goto('/dashboard')
      await user.setValue('currentPage', 'dashboard')
    }
    else {
      goto('/')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
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
