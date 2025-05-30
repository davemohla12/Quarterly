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
  import { convertCurrencyToNumber, convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'

  const headingText = `What was your taxable income in ${convertStateToUpperCase(store.currentState)} last year?`
  const subheadingText = `You can find this on form ${stateRules[store.currentState].thisYearIncomeCalculationType.stateIncomeForm} line ${stateRules[store.currentState].thisYearIncomeCalculationType.stateIncomeLine}`
  const buttonText = 'NEXT'
  const placholderText = `Taxable State Income`
  let inputValue = $state(null)
  store.makeButtonActive = false

  const handleInput = (value) => {
    inputValue = value
  }

  const handleNext = () => {
    store.stateIncomeLastYear = convertCurrencyToNumber(inputValue)
    store.currentPage = '18'
    goto('/18')
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
<DollarInput placeholder={placholderText} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext}/>
<Later />
