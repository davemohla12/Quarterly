<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { federalRules } from '$src/rules/federal'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber, convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import { onMount } from 'svelte'

  const headingText = `What was your federal adjusted gross income last year?`
  const subheadingText = `You can find this on form ${federalRules.adjustedGrossIncomeForm} line ${federalRules.adjustedGrossIncomeLine}`
  const buttonText = 'NEXT'
  const placholderText = 'Adjusted Gross Income'
  let inputValue = $state(null)
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.adjustedGrossIncomeLastYear) {
        inputValue = store.adjustedGrossIncomeLastYear
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
    store.adjustedGrossIncomeLastYear = convertCurrencyToNumber(inputValue)
    if (stateRules[store.currentState]?.thisYearIncomeCalculationType?.type == 'federalAGI' || !stateRules[store.currentState]?.lastYearSafeHarborRule) {
      store.stateIncomeLastYear = store.adjustedGrossIncomeLastYear
      store.currentPage = '18'
      goto('/18')
    }
    else { 
      store.currentPage = '17.5'
      goto('/17.5')
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
<Subheading text={subheadingText} desktopwidth="400px" />
<DollarInput placeholder={placholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext}/>
<Later />
