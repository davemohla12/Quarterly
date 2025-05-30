<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { doesStateHaveQuarterlyTaxes } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'

  const headingText = `Did you live in ${convertStateToUpperCase(store.currentState)} all of last year?`
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)  
  store.makeButtonActive = false

  const handleSelect = (button) => {
    selectedRadioButton = button
  }

  const handleNext = () => {
    if (selectedRadioButton == 'Yes') {
      store.livedInCurrentStateAllLastYear = true
    }
    else {
      store.livedInCurrentStateAllLastYear = false
    }
    if (selectedRadioButton === 'No' && stateRules[store.currentState].stateHasQuarterlyTaxes) {
      store.inMultipleStates = true
      store.stateSupported = false
      store.currentPage = '7'
      goto('/7')
    }
    else {
      store.currentPage = '6'
      goto('/6')
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
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} onselect={handleSelect} />
<Button text={buttonText} onclick={handleNext} />
<Later />
