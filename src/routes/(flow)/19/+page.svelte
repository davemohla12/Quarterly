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
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `What is your expected total income this year?`
  const subheadingText = `Total income includes income from freelance work, your own business, wages & salaries, investments, rentals, retirement withdrawals, and alimony`
  const buttonText = 'NEXT'
  const placholderText = 'Total Income'
  let inputValue = $state(null) 
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('expectedTotalIncomeThisYear')) {
        const expectedTotalIncomeThisYear = getLocalStorage('expectedTotalIncomeThisYear')
        inputValue = expectedTotalIncomeThisYear.toString()
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
    await payment.setValue('expectedTotalIncomeThisYear', convertCurrencyToNumber(inputValue))
    if (await payment.getValue('expectedTotalIncomeThisYear') == 0) {
      goto('/19.5')
      await user.setValue('currentPage', '30')
    }
    else {
      goto('/20')
      await user.setValue('currentPage', '20')
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
<Heading text={headingText} desktopwidth="500px"  />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<DollarInput placeholder={placholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />