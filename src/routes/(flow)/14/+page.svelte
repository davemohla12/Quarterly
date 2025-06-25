<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { user } from '$src/data/user.svelte'
  import { getBelowMinimumTaxText } from '$src/utilities/federaltax'
  
  let headingText = $state('')
  const buttonText = 'NEXT'
  const placholderText = 'Total Tax Due'
  
  let subheadingText = $state('')
  let inputValue = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    headingText = `How much did you pay in ${convertStateToUpperCase(await payment.getValue('currentState'))} income tax last year?`
    subheadingText = await determineSubheadingText()
    if (global.loggedIn) {
      if (await payment.getValue('stateTaxPaidLastYear')) { 
        const stateTaxPaidLastYear = await payment.getValue('stateTaxPaidLastYear')
        inputValue = stateTaxPaidLastYear.toString()
        global.makeButtonActive = true
      }
    }
  })

  const determineSubheadingText = async () => {
    if (stateRules[await payment.getValue('currentState')].incomeTaxPaidForm != null && stateRules[await payment.getValue('currentState')].incomeTaxPaidLine != null) {
      return `You can find this on ${convertStateToUpperCase(await payment.getValue('currentState'))} form ${stateRules[await payment.getValue('currentState')].incomeTaxPaidForm} line ${stateRules[await payment.getValue('currentState')].incomeTaxPaidLine}`
    }
    else if (stateRules[await payment.getValue('currentState')].incomeTaxPaidForm != null) {
      return `You can find this on ${convertStateToUpperCase(await payment.getValue('currentState'))} form ${stateRules[await payment.getValue('currentState')].incomeTaxPaidForm}`
    }
    else {
      return `You can find this on your ${convertStateToUpperCase(await payment.getValue('currentState'))} tax return`
    }      
  }

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
    await payment.setValue('stateTaxPaidLastYear', convertCurrencyToNumber(inputValue))
    if (await payment.getValue('stateTaxPaidLastYear') < stateRules[await payment.getValue('currentState')].minimumTaxForQuarterlyPayments) {
      await payment.setValue('stateSupported', true)
      await payment.setValue('q1StateQuarterlyPayment', 0)
      await payment.setValue('q2StateQuarterlyPayment', 0)
      await payment.setValue('q3StateQuarterlyPayment', 0)
      await payment.setValue('q4StateQuarterlyPayment', 0)
      await payment.setValue('singleStateDue', 0)
      await payment.setValue('singleStatePaid', 0)
      await payment.setValue('singleStateRemaining', 0)
      await payment.setValue('explanation', getBelowMinimumTaxText())
      goto('/15')
      await user.setValue('currentPage', '15')
    }
    else {
      goto('/17')
      await user.setValue('currentPage', '17')
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="290px" />
<Subheading text={subheadingText} desktopwidth="400px" />
<DollarInput placeholder={placholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />
