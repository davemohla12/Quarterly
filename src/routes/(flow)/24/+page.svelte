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
  
  const headingText = `What are your expected ${convertStateToUpperCase(store.currentState)} W2 witholdings for this year?`
  const subheadingText = `To determine this, find the number in box 17 of each W2 paycheck and then multiply by the number of W2s you plan to get this year`
  const buttonText = 'NEXT'
  const placeholderText = 'Withholdings'
  let inputValue = $state(null)
  store.makeButtonActive = false

  const handleInput = (value) => {
    inputValue = value
  }

  const handleNext = () => {
    store.stateWithholdingsThisYear = convertCurrencyToNumber(inputValue)
    if (store.currentQuarter == 'Q1') {
      store.currentPage = '28'
      goto('/28')
    }
    else {
      store.currentPage = '25'
      goto('/25')
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="300px" />
<DollarInput placeholder={placeholderText} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />
