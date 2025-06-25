<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { global } from '$src/data/global.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { federalRules } from '$src/rules/federal'
  import { stateRules } from '$src/rules/state'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { payment } from '$src/data/payment.svelte'
  import { user } from '$src/data/user.svelte'
  import { getBelowMinimumTaxText } from '$src/utilities/federaltax'

  const headingText = `How much did you pay in federal income tax last year?`
  const subheadingText = `You can find this on form ${federalRules.incomeTaxPaidForm  } line ${federalRules.incomeTaxPaidLine}`
  const buttonText = 'NEXT'
  const placeholderText = 'Total Tax Due'
  let inputValue = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (await payment.getValue('federalTaxPaidLastYear')) {
        const federalTaxPaidLastYear = await payment.getValue('federalTaxPaidLastYear')
        inputValue = federalTaxPaidLastYear.toString()
        global.makeButtonActive = true
      }
    }
  })

  const handleInput = (value) => {
    inputValue = value
    if (inputValue == null || inputValue == '$' || inputValue == '') {
      global.makeButtonActive = false
    }
    else {
      global.makeButtonActive = true
    }
  }

  const handleNext = async () => {
    await payment.setValue('federalTaxPaidLastYear', convertCurrencyToNumber(inputValue))
    if (await payment.getValue('federalTaxPaidLastYear') < federalRules.minimumTaxForQuarterlyPayments) {
      await payment.setValue('q1federalQuarterlyPayment', 0)
      await payment.setValue('q2federalQuarterlyPayment', 0)
      await payment.setValue('q3federalQuarterlyPayment', 0)
      await payment.setValue('q4federalQuarterlyPayment', 0)
      await payment.setValue('singleFederalDue', 0)
      await payment.setValue('singleFederalPaid', 0)
      await payment.setValue('singleFederalRemaining', 0)
      await payment.setValue('explanation', getBelowMinimumTaxText())
      if (await payment.getValue('inMultipleStates')) {
        goto(13)
        await user.setValue('currentPage', '13')
      }
      else {
        goto(12)
        await user.setValue('currentPage', '12')
      }
    }
    else {
      if (await payment.getValue('stateSupported') && stateRules[await payment.getValue('currentState')].lastYearSafeHarborRule) {
        goto(14)
        await user.setValue('currentPage', '14')
      }
      else {
        goto(17)
        await user.setValue('currentPage', '17')
      }
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
<Heading text={headingText} desktopwidth="500px" mobilewidth="350px" />
<Subheading text={subheadingText} desktopwidth="400px" />
<DollarInput placeholder={placeholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} enabled={false} onclick={handleNext}/>
<Later />