<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { store } from '$src/stores/store.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { federalRules } from '$src/rules/federal'
  import { stateRules } from '$src/rules/state'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'

  const headingText = `How much did you pay in federal income tax last year?`
  const subheadingText = `You can find this on form ${federalRules.incomeTaxPaidForm  } line ${federalRules.incomeTaxPaidLine}`
  const buttonText = 'NEXT'
  const placeholderText = 'Total Tax Due'
  let inputValue = $state(null)
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.federalTaxPaidLastYear) {
        inputValue = store.federalTaxPaidLastYear
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
    store.federalTaxPaidLastYear = convertCurrencyToNumber(inputValue)
    if (store.federalTaxPaidLastYear < federalRules.minimumTaxForQuarterlyPayments) {
      store.federalQuarterlyPayment = 0
      if (store.inMultipleStates) {
        store.currentPage = '13'
        goto(13)
      }
      else {
        store.currentPage = '12'
        goto(12)
      }
    }
    else {
      if (store.stateSupported && stateRules[store.currentState].lastYearSafeHarborRule) {
        store.currentPage = '14'
        goto(14)
      }
      else {
        store.currentPage = '17'
        goto(17)
      }
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
<Heading text={headingText} desktopwidth="500px" mobilewidth="350px" />
<Subheading text={subheadingText} desktopwidth="400px" />
<DollarInput placeholder={placeholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} enabled={false} onclick={handleNext}/>
<Later />