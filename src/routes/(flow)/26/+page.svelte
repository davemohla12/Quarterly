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
  import { getLocalStorage } from '$src/utilities/utilities'

  let headingText = $state('')
  const buttonText = 'NEXT'
  let placeholderText1 = $state('')
  let placeholderText2 = $state('')
  let placeholderText3 = $state('')
  let inputValue1 = $state(null)
  let inputValue2 = $state(null)
  let inputValue3 = $state(null)
  global.makeButtonActive = false
  let livingInCurrentStateAllThisYear = $state(false)
  let q1State = $state('')
  let q2State = $state('')
  let q3State = $state('')

  onMount(async () => {
    livingInCurrentStateAllThisYear = getLocalStorage('livingInCurrentStateAllThisYear')
    if (livingInCurrentStateAllThisYear) {
      headingText = `What did you pay in ${convertStateToUpperCase(getLocalStorage('currentState'))} quarterly payments this year?`
      placeholderText1 = `April Payment`
      placeholderText2 = `June Payment`
      placeholderText3 = `September Payment`
    }
    else {
      headingText = `What did you pay in state quarterly payments this year?`
      q1State = convertStateToUpperCase(getLocalStorage('q1State'))
      q2State = convertStateToUpperCase(getLocalStorage('q2State'))
      q3State = convertStateToUpperCase(getLocalStorage('q3State'))
      placeholderText1 = `${q1State} April Payment`
      placeholderText2 = `${q2State} June Payment`
      placeholderText3 = `${q3State} September Payment`
    }
   
    if (global.loggedIn) {
      if (getLocalStorage('q1StatePaymentMade')) {
        const q1StatePaymentMade = getLocalStorage('q1StatePaymentMade')
        inputValue1 = q1StatePaymentMade.toString()
        global.makeButtonActive = true
      }
      if (getLocalStorage('q2StatePaymentMade')) {
        const q2StatePaymentMade = getLocalStorage('q2StatePaymentMade')
        inputValue2 = q2StatePaymentMade.toString()
        global.makeButtonActive = true
      }
      if (getLocalStorage('q3StatePaymentMade')) {
        const q3StatePaymentMade = getLocalStorage('q3StatePaymentMade')
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
    if (livingInCurrentStateAllThisYear) {
      goto('/27')
      await user.setValue('currentPage', '27')
    }
    else {
      await payment.setValue('payPreference', 'quarter')
      goto('/28')
      await user.setValue('currentPage', '28')
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
{#if currentTaxQuarter == 'Q2' || currentTaxQuarter == 'Q3' || currentTaxQuarter == 'Q4'}
  <DollarInput placeholder={placeholderText1} value={inputValue1} onInput={handleInput1} />
{/if}
{#if currentTaxQuarter == 'Q3' || currentTaxQuarter == 'Q4'}
  <DollarInput placeholder={placeholderText2} value={inputValue2} onInput={handleInput2} />
{/if}
{#if currentTaxQuarter == 'Q4'}
  <DollarInput placeholder={placeholderText3} value={inputValue3} onInput={handleInput3} />
{/if}
<Button text={buttonText} onclick={handleNext} />
<Later />
