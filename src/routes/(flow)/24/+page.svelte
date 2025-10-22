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
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  import { currentTaxQuarter } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  
  let headingText = $state('')
  const subheadingText = `To determine this, find the number in box 17 of each W2 paycheck and then multiply by the number of W2s you plan to get this year`
  const buttonText = 'NEXT'
  const placeholderText = 'Withholdings'
  let inputValue = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (getLocalStorage('livingInCurrentStateAllThisYear')) {
      headingText = `What are your expected ${convertStateToUpperCase(getLocalStorage('currentState'))} W2 witholdings for this year?`
    }
    else {
      headingText = `What are your expected state W2 witholdings for this year?`
    }
    if (global.loggedIn) {
      if (getLocalStorage('stateWithholdingsThisYear')) {
        const stateWithholdingsThisYear = getLocalStorage('stateWithholdingsThisYear')
        if (stateWithholdingsThisYear == 0) {
          inputValue = ''
        }
        else {
          inputValue = stateWithholdingsThisYear.toString()
        }
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
    await payment.setValue('stateWithholdingsThisYear', convertCurrencyToNumber(inputValue))
    if (currentTaxQuarter == 'Q1') {
      goto('/27')
      await user.setValue('currentPage', '27')
    }
    else {
      if (await payment.getValue('safeToSkipFederalPayment')) {
        goto('/26')
        await user.setValue('currentPage', '26')
      }
      else {
        goto('/25')
        await user.setValue('currentPage', '25')
      }
    }
  }

</script>

<Header />
<Avatar screen={27} />
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="300px" />
<DollarInput placeholder={placeholderText} value={inputValue} onInput={handleInput} shouldFocus={true}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
