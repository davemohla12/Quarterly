<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { stateRules } from '$src/data/stateRules.svelte'
  import { getNoExpectedIncomeText } from '$src/utilities/federaltax'

  const headingText = `You don't need to pay any quarterly taxes this year`
  const subheadingText = `Since you don't expect to have any income this year you don't need to worry about quarterly taxes`
  const buttonText = 'DONE'
  global.makeButtonActive = true

  const handleDone = async () => {
    if (global.loggedIn && await user.getValue('lastTaxYearPaid') == currentTaxYear) {
      if (stateRules[await payment.getValue('currentState')].stateHasQuarterlyTaxes == true) { 
        payment.setValue('stateSupported', true)
        payment.setValue('q1federalQuarterlyPayment', 0)
        payment.setValue('q2federalQuarterlyPayment', 0)
        payment.setValue('q3federalQuarterlyPayment', 0)
        payment.setValue('q4federalQuarterlyPayment', 0)  
        payment.setValue('q1StateQuarterlyPayment', 0)
        payment.setValue('q2StateQuarterlyPayment', 0)
        payment.setValue('q3StateQuarterlyPayment', 0)
        payment.setValue('q4StateQuarterlyPayment', 0)
        payment.setValue('singleFederalDue', 0)
        payment.setValue('singleFederalPaid', 0)
        payment.setValue('singleFederalRemaining', 0)
        payment.setValue('singleStateDue', 0)
        payment.setValue('singleStatePaid', 0)
        payment.setValue('singleStateRemaining', 0)
        payment.setValue('explanation', getNoExpectedIncomeText())
      }
      else {
        payment.setValue('q1federalQuarterlyPayment', 0)
        payment.setValue('q2federalQuarterlyPayment', 0)
        payment.setValue('q3federalQuarterlyPayment', 0)
        payment.setValue('q4federalQuarterlyPayment', 0)
        payment.setValue('singleFederalDue', 0)
        payment.setValue('singleFederalPaid', 0)
        payment.setValue('singleFederalRemaining', 0)
        payment.setValue('explanation', getNoExpectedIncomeText())
      }
      user.setValue('currentPage', 'dashboard')
      goto('/dashboard')
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
