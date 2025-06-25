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
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  import { currentTaxQuarter } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'

  let headingText = $state('')
  const buttonText = 'NEXT'
  let placeholderText1 = $state('')
  let placeholderText2 = $state('')
  let placeholderText3 = $state('')
  let inputValue1 = $state(null)
  let inputValue2 = $state(null)
  let inputValue3 = $state(null)
  global.makeButtonActive = false


  onMount(async () => {
    headingText = `What did you pay in ${convertStateToUpperCase(await payment.getValue('currentState'))} quarterly payments this year?`
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
      if (await payment.getValue('q1StatePaymentMade')) {
        const q1StatePaymentMade = await payment.getValue('q1StatePaymentMade')
        inputValue1 = q1StatePaymentMade.toString()
        global.makeButtonActive = true
      }
      if (await payment.getValue('q2StatePaymentMade')) {
        const q2StatePaymentMade = await payment.getValue('q2StatePaymentMade')
        inputValue2 = q2StatePaymentMade.toString()
        global.makeButtonActive = true
      }
      if (await payment.getValue('q3StatePaymentMade')) {
        const q3StatePaymentMade = await payment.getValue('q3StatePaymentMade')
        inputValue3 = q3StatePaymentMade.toString()
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
    await payment.setValue('q1StatePaymentMade', convertCurrencyToNumber(inputValue1))
    await payment.setValue('q2StatePaymentMade', convertCurrencyToNumber(inputValue2))
    await payment.setValue('q3StatePaymentMade', convertCurrencyToNumber(inputValue3)) 
    goto('/27')
    await user.setValue('currentPage', '27')
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
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
