<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import Dropdown from '$src/components/app/Dropdown.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { doesStateHaveQuarterlyTaxes, convertStateToLowerCase, convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { safePostHog } from '$src/utilities/posthog'
  import { currentTaxYear } from '$src/settings/settings'

  const headingText = `What state do you reside in?`
  const buttonText = 'NEXT'
  global.makeButtonActive = false
  let currentState = $state()

  onMount(async () => {
    if (await user.getValue('latestTaxYearPaid') != currentTaxYear) {
      safePostHog.capture('flow_state_viewed')
    }
    if (global.loggedIn) {
      if (await payment.getValue('currentState')) {
        currentState = convertStateToUpperCase(await payment.getValue('currentState'))
        global.makeButtonActive = true
      }
    }
  })

  const handleSelection = async (selection) => {
    await payment.setValue('currentState', convertStateToLowerCase(selection))  
    if (await payment.getValue('currentState') != '') {
      global.makeButtonActive = true
    }
    else {
      global.makeButtonActive = false
    }
  }

  const handleNext = async () => {
    if (doesStateHaveQuarterlyTaxes(await payment.getValue('currentState'))) {
      await payment.setValue('stateHasQuarterlyTaxes', true)
      await payment.setValue('stateSupported', true)
      await user.setValue('currentPage', '5')
      goto('/5')
    }
    else {
      await payment.setValue('stateHasQuarterlyTaxes', false)
      await payment.setValue('stateSupported', false)
      await user.setValue('currentPage', '4')
      goto('/4')
    }
  }

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
        handleNext()
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
<Heading text={headingText} />
<Dropdown text="State" values={global.states} selected={currentState} onselection={handleSelection}/>
<Button text={buttonText} onclick={handleNext} />
<Later />