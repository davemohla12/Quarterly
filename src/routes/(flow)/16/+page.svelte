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
  import { safePostHog } from '$src/utilities/posthog'
  import { getLocalStorage } from '$src/utilities/utilities'

  let headingText = $state('')
  let subheadingText = $state('')
  const buttonText = 'DONE'
  global.makeButtonActive = true
  
  onMount(async () => {
    headingText = `You don't need to pay any quarterly taxes this year`
    subheadingText = `You may still pay income tax at the end of the year but you don't need to worry about quarterly taxes`
    const campaign = getLocalStorage('campaign')
    const keyword = getLocalStorage('utm_term')
    safePostHog.capture('no_payments_viewed', {
      campaign: campaign,
      keyword: keyword,
      reason: 'below_minimum_threshold'
    })
  })

  const handleDone = async () => {
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
      await user.setValue('currentPage', 'home')
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="250px" />
<Button text={buttonText} onclick={handleDone} />
