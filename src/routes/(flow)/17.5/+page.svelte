<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber, convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import { onMount } from 'svelte'  
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  let headingText = $state('')
  let subheadingText = $state('')
  const buttonText = 'NEXT'
  const placholderText = `Taxable State Income`
  let inputValue = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    headingText = `What was your taxable income in ${convertStateToUpperCase(getLocalStorage('currentState'))} last year?`
    subheadingText = `You can find this on form ${stateRules[getLocalStorage('currentState')].thisYearIncomeCalculationType.stateIncomeForm} line ${stateRules[getLocalStorage('currentState')].thisYearIncomeCalculationType.stateIncomeLine}`
    if (global.loggedIn) {
      if (getLocalStorage('stateIncomeLastYear')) {
        const stateIncomeLastYear = getLocalStorage('stateIncomeLastYear')
        inputValue = stateIncomeLastYear.toString()
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
    await payment.setValue('stateIncomeLastYear', convertCurrencyToNumber(inputValue))
    goto('/18')
    await user.setValue('currentPage', '18')
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="400px" />
<DollarInput placeholder={placholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext}/>
<Later />
