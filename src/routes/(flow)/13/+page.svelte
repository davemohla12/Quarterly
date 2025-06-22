<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'
  import { getBelowMinimumTaxText } from '$src/utilities/federaltax'
  import { payment } from '$src/data/payment.svelte'
  import { user } from '$src/data/user.svelte'

  const headingText = `You don't need to pay any federal quarterly taxes this year`
  const subheadingText = `Since you're living in multiple states this year, I can't estimate your state taxes — but you're all set on the federal side`
  const buttonText = 'DONE'
  global.makeButtonActive = true
  
  const handleDone = async () => {
    if (global.loggedIn && await user.getValue('lastTaxYearPaid') == currentTaxYear) {
      payment.setValue('stateSupported', false)
      payment.setValue('q1federalQuarterlyPayment', 0)
      payment.setValue('q2federalQuarterlyPayment', 0)
      payment.setValue('q3federalQuarterlyPayment', 0)
      payment.setValue('q4federalQuarterlyPayment', 0)
      payment.setValue('singleFederalDue', 0)
      payment.setValue('singleFederalPaid', 0)
      payment.setValue('singleFederalRemaining', 0)
      payment.setValue('explanation', getBelowMinimumTaxText())
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
<Heading text={headingText} mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<Button text={buttonText} onclick={handleDone} />
