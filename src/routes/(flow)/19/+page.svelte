<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'

  const headingText = `What is your expected total income this year?`
  const subheadingText = `Total income includes income from freelance work, your own business, wages & salaries, investments, rentals, retirement withdrawals, and alimony`
  const buttonText = 'NEXT'
  const placholderText = 'Total Income'
  let inputValue = $state(null) 
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.expectedTotalIncomeThisYear) {
        inputValue = store.expectedTotalIncomeThisYear
        store.makeButtonActive = true
      }
    }
  })

  const handleInput = (value) => {
    inputValue = value
    if (inputValue == null || inputValue == '$' || inputValue == '') {
      store.makeButtonActive = false
    }
    else {
      store.makeButtonActive = true
    }
  }

  const handleNext = () => {
    store.expectedTotalIncomeThisYear = convertCurrencyToNumber(inputValue)
    if (store.expectedTotalIncomeThisYear == 0) {
      store.currentPage = '30'
      goto('/30')
    }
    else {
      store.currentPage = '20'
      goto('/20')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
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
<Heading text={headingText} desktopwidth="500px"  />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<DollarInput placeholder={placholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />