<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  let headingText = $state('')
  let subheadingText = $state('')
  const buttonText = 'NEXT'
  
  global.makeButtonActive = true

  onMount(async () => {
    headingText = `You don't need to pay any ${convertStateToUpperCase(getLocalStorage('currentState'))} quarterly taxes this year `
    subheadingText = `Because you owed less than $${stateRules[getLocalStorage('currentState')].minimumTaxForQuarterlyPayments} in ${convertStateToUpperCase(getLocalStorage('currentState'))} tax last year, you are not required to make estimated payments there this year`
  })

  const handleNext = async () => {
    await payment.setValue('safeToSkipStatePayment', true)
    await payment.setValue('stateSupported', false)
    if (await payment.getValue('safeToSkipFederalPayment')) {
      goto('/16')
      await user.setValue('currentPage', '16')
    } 
    else {
      goto('/17')
      await user.setValue('currentPage', '17')
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
<Heading text={headingText} mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
