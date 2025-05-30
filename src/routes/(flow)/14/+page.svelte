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
  import { store } from '$src/stores/store.svelte'  
  import { onMount, tick } from 'svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'

  const headingText = `How much did you pay in ${convertStateToUpperCase(store.currentState)} income tax last year?`
  const buttonText = 'NEXT'
  const placholderText = 'Total Tax Due'
  
  let subheadingText = $state('')
  let inputValue = $state(null)
  store.makeButtonActive = false

  onMount(async() => {
    subheadingText = determineSubheadingText()
  })

  const determineSubheadingText = () => {
    if (stateRules[store.currentState].incomeTaxPaidForm != null && stateRules[store.currentState].incomeTaxPaidLine != null) {
      return `You can find this on ${convertStateToUpperCase(store.currentState)} form ${stateRules[store.currentState].incomeTaxPaidForm} line ${stateRules[store.currentState].incomeTaxPaidLine}`
    }
    else if (stateRules[store.currentState].incomeTaxPaidForm != null) {
      return `You can find this on ${convertStateToUpperCase(store.currentState)} form ${stateRules[store.currentState].incomeTaxPaidForm}`
    }
    else {
      return `You can find this on your ${convertStateToUpperCase(store.currentState)} tax return`
    }      
  }

  const handleInput = (value) => {
    inputValue = value
  }

  const handleNext = () => {
    store.stateTaxPaidLastYear = convertCurrencyToNumber(inputValue)
    if (store.stateTaxPaidLastYear < stateRules[store.currentState].minimumTaxForQuarterlyPayments) {
      store.stateQuarterlyPayment = 0
      store.stateSupported = false
      store.currentPage = '15'
      goto('/15')
    }
    else {
      store.currentPage = '17'
      goto('/17')
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="290px" />
<Subheading text={subheadingText} desktopwidth="400px" />
<DollarInput placeholder={placholderText} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />
