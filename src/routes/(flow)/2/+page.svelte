<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { getNoIncomeText } from '$src/utilities/federaltax'
  import { user } from '$src/data/user.svelte'
  import { currentTaxYear } from '$src/settings/settings'
  
  const headingText = `You don't need to pay any quarterly taxes this year`
  const subheadingText = `Since all your income has taxes automatically withheld, the IRS doesn't require you to make separate quarterly payments.`
  const buttonText = 'DONE' 
  global.makeButtonActive = true

  const handleDone = async () => {
    if (global.loggedIn && await user.getValue('latestTaxYearPaid') == currentTaxYear) {
      await payment.setValue('stateSupported', true)
      await payment.setValue('currentState', 'State')
      awaitpayment.setValue('q1federalQuarterlyPayment', 0)
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
      await payment.setValue('explanation', getNoIncomeText())
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
<Heading text={headingText} desktopwidth="500px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="320px" />
<Button text={buttonText} onclick={handleDone} />
