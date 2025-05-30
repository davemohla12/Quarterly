<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { stateRules } from '$src/rules/state'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  
  const headingText = `What do you expect your income to do this year relative to last year?`
  const radioButtons = ['Increase', 'Stay about the same', 'Decrease']
  const buttonText = 'NEXT'
  
  let selectedRadioButton = $state(null)
  store.makeButtonActive = false
  
  const handleSelect = (button) => {
    selectedRadioButton = button
  }

  const handleNext = () => {
    if (selectedRadioButton == 'Increase') {
      store.incomeExpectationThisYear = 'increase'
    }
    else if (selectedRadioButton == 'Stay about the same') {
      store.incomeExpectationThisYear = 'same'
    }
    else {
      store.incomeExpectationThisYear = 'decrease'
    }
    if (store.incomeExpectationThisYear == 'decrease' || (stateRules[store.currentState].stateHasQuarterlyTaxes && !stateRules[store.currentState].lastYearSafeHarborRule)) {  
      store.currentPage = '19'
      goto('/19')
    }
    else {
      store.currentPage = '21'
      goto('/21')
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
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
