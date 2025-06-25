<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  import { currentTaxQuarter } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'

  const headingText = `What did you pay in federal quarterly payments this year?`
  const buttonText = 'NEXT'
  let placeholderText1 = $state('')
  let placeholderText2 = $state('')
  let placeholderText3 = $state('')
  let inputValue1 = $state(null)
  let inputValue2 = $state(null)
  let inputValue3 = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (currentTaxQuarter == 'Q2') {
      placeholderText1 = 'April Payment'
    }
    else if (currentTaxQuarter == 'Q3') {
      placeholderText1 = 'April Payment'
      placeholderText2 = 'June Payment'
    }
    else if (currentTaxQuarter == 'Q4') {
      placeholderText1 = 'April Payment'
      placeholderText2 = 'June Payment'
      placeholderText3 = 'September Payment'
    }
    if (global.loggedIn) {
      if (await payment.getValue('q1FederalPaymentMade')) { 
        const q1FederalPaymentMade = await payment.getValue('q1FederalPaymentMade')
        inputValue1 = q1FederalPaymentMade.toString()
        global.makeButtonActive = true
      }
      if (await payment.getValue('q2FederalPaymentMade')) {
        const q2FederalPaymentMade = await payment.getValue('q2FederalPaymentMade')
        inputValue2 = q2FederalPaymentMade.toString()
        global.makeButtonActive = true
      }
      if (await payment.getValue('q3FederalPaymentMade')) {
        const q3FederalPaymentMade = await payment.getValue('q3FederalPaymentMade')
        inputValue3 = q3FederalPaymentMade.toString()
        global.makeButtonActive = true
      }
    }
  })  

  const handleInput1 = (value) => {
    inputValue1 = value
    enableButton()
  } 

  const handleInput2 = (value) => {
    inputValue2 = value
    enableButton()
  }

  const handleInput3 = (value) => {
    inputValue3 = value
    enableButton()
  } 

  const validValue = (value) => {
    if (value == null || value == '$' || value == '') {
      return false
    }
    else {
      return true
    }
  }

  const enableButton = () => {
    if (validValue(inputValue1) || validValue(inputValue2) || validValue(inputValue3)) {
      global.makeButtonActive = true
    }
    else {
      global.makeButtonActive = false
    }
  }

  const handleNext = async () => {
    await payment.setValue('q1FederalPaymentMade', convertCurrencyToNumber(inputValue1))
    await payment.setValue('q2FederalPaymentMade', convertCurrencyToNumber(inputValue2))
    await payment.setValue('q3FederalPaymentMade', convertCurrencyToNumber(inputValue3))
    if (await payment.getValue('stateSupported')) {
      goto('/26')
      await user.setValue('currentPage', '26')
    }
    else {
      goto('/27')
      await user.setValue('currentPage', '27')
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="320px" />
{#if placeholderText1 != ''}
  <DollarInput placeholder={placeholderText1} value={inputValue1} onInput={handleInput1} />
{/if}
{#if placeholderText2 != ''}
  <DollarInput placeholder={placeholderText2} value={inputValue2} onInput={handleInput2} />
{/if}
{#if placeholderText3 != ''}
  <DollarInput placeholder={placeholderText3} value={inputValue3} onInput={handleInput3} />
{/if}
<Button text={buttonText} onclick={handleNext} />
<Later />
