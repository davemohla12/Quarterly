<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { federalRules } from '$src/rules/federal'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { user } from '$src/data/user.svelte'
  import { stateRules } from '$src/rules/state'

  const headingText = `You don't need to pay any federal quarterly taxes this year`
  const subheadingText = `Because you owed less than $${federalRules.minimumTaxForQuarterlyPayments} in federal tax last year, the IRS doesn't require you to make estimated payments this year`
  const buttonText = 'NEXT'
  
  global.makeButtonActive = true

  const handleNext = async () => {
    await payment.setValue('safeToSkipFederalPayment', true)
    if (await payment.getValue('stateSupported')) {
      if (!stateRules[await payment.getValue('currentState')].lastYearSafeHarborRule || !await payment.getValue('livedInCurrentStateAllLastYear') || !await payment.getValue('livingInCurrentStateAllThisYear')) {
        goto('/19')
        await user.setValue('currentPage', '19')
      }
      else {
        goto('/14')
        await user.setValue('currentPage', '14')
      }
    }
    else {
      goto('/16')
      await user.setValue('currentPage', '16')
    }
  }

  const handleKeyDown = (event) => {
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
<Heading text={headingText} mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="300px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
