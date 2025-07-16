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
  import { onMount } from 'svelte'
  import { currentTaxQuarter } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  
  const headingText = `What are your expected federal W2 witholdings for this year?`
  const subheadingText = `To determine this, find the number in box 2 of each W2 paycheck and then multiply by the number of W2s you plan to get this year`
  const buttonText = 'NEXT'
  const placeholderText = 'Withholdings'
  global.makeButtonActive = false
  let inputValue = $state(null)

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('federalWithholdingsThisYear')) {
        const federalWithholdingsThisYear = getLocalStorage('federalWithholdingsThisYear')
        inputValue = federalWithholdingsThisYear.toString()
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
    await payment.setValue('federalWithholdingsThisYear', convertCurrencyToNumber(inputValue))
    if (await payment.getValue('stateSupported')) {
      goto('/24')
      await user.setValue('currentPage', '24')
    }
    else {
      if (currentTaxQuarter == 'Q1') {
        if (await payment.getValue('livingInCurrentStateAllThisYear')) {
          goto('/27')
          await user.setValue('currentPage', '27')
        }
        else {
          goto('/28')
          await user.setValue('currentPage', '28')
        }
      }
      else {
        goto('/25')
        await user.setValue('currentPage', '25')
      }
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="300px" />
<DollarInput placeholder={placeholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />
