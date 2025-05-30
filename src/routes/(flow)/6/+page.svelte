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
  import { stateRules } from '$src/rules/state'

  const headingText = `Do you plan to live in ${convertStateToUpperCase(store.currentState)} all of this year?`
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  
  let selectedRadioButton = $state(null)
  store.makeButtonActive = false

  const handleSelect = (button) => {
    selectedRadioButton = button
  }

  const handleNext = () => {
    if (selectedRadioButton == 'Yes') {
      store.livingInCurrentStateAllThisYear = true
      store.inMultipleStates = false
      if (stateRules[store.currentState].lastYearSafeHarborRule) {
        store.currentPage = '8'
        goto('/8')
      }
      else {
        store.currentPage = '9'
        goto('/9')
      }
    }
    else {
      store.livingInCurrentStateAllThisYear = false
      store.inMultipleStates = true
      store.stateSupported = false
      store.currentPage = '7'
      goto('/7')
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
