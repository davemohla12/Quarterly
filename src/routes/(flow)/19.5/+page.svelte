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
  import { stateRules } from '$src/rules/state'
  import { getNoExpectedIncomeText } from '$src/utilities/federaltax'
  import { safePostHog } from '$src/utilities/posthog'
  import { currentTaxYear } from '$src/settings/settings'
  import { onMount } from 'svelte'

  const headingText = `You don't need to pay any quarterly taxes this year`
  const subheadingText = `Since you don't expect to have any income this year you don't need to worry about quarterly taxes`
  const buttonText = 'DONE'
  global.makeButtonActive = true

  onMount(async () => {
    if (await user.getValue('latestTaxYearPaid') != currentTaxYear) {
      safePostHog.capture('flow_no_payments_viewed', {
        reason: 'no_expected_income'
      })
    }
  })

  const handleDone = async () => {
    await payment.setValue('safeToSkipFederalPayment', true)
    await payment.setValue('safeToSkipStatePayment', true)
    if (global.loggedIn) {
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
        await payment.setValue('explanation', getNoExpectedIncomeText())
      }
      else {
        await payment.setValue('q1federalQuarterlyPayment', 0)
        await payment.setValue('q2federalQuarterlyPayment', 0)
        await payment.setValue('q3federalQuarterlyPayment', 0)
        await payment.setValue('q4federalQuarterlyPayment', 0)
        await payment.setValue('singleFederalDue', 0)
        await payment.setValue('singleFederalPaid', 0)
        await payment.setValue('singleFederalRemaining', 0)
        await payment.setValue('explanation', getNoExpectedIncomeText())
      }
      goto('/dashboard')
      await user.setValue('currentPage', 'dashboard')
    }
    else {
      goto('/')
      await user.setValue('currentPage', 'home')
    }
  }

  const handleKeyDown = (event) => {
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
