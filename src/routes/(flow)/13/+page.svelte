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
  import { safePostHog } from '$src/utilities/posthog'
  import { currentTaxYear } from '$src/settings/settings'
  import { onMount } from 'svelte'

  const headingText = `You don't need to pay any federal quarterly taxes this year`
  const subheadingText = `Since you're living in multiple states this year, I can't estimate your state taxes — but you're all set on the federal side`
  const buttonText = 'DONE'
  global.makeButtonActive = true

  onMount(async () => {
    if (await user.getValue('latestTaxYearPaid') != currentTaxYear) {
      safePostHog.capture('flow_no_payments_viewed', {
        reason: 'below_minimum_threshold'
      })
    }
  })
  
  const handleDone = async () => {
    await payment.setValue('safeToSkipFederalPayment', true)
    if (global.loggedIn) {
      await payment.setValue('stateSupported', false)
      await payment.setValue('q1federalQuarterlyPayment', 0)
      await payment.setValue('q2federalQuarterlyPayment', 0)
      await payment.setValue('q3federalQuarterlyPayment', 0)
      await payment.setValue('q4federalQuarterlyPayment', 0)
      await payment.setValue('singleFederalDue', 0)
      await payment.setValue('singleFederalPaid', 0)
      await payment.setValue('singleFederalRemaining', 0)
      await payment.setValue('explanation', getBelowMinimumTaxText())
      goto('/dashboard')
      await user.setValue('currentPage', 'dashboard')
    }
    else {
      goto('/')
      await user.setValue('currentPage', 'home')
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
