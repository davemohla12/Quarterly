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
  import { convertLongToShortFilingStatus, convertShortToLongFilingStatus } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state.js'
  import { onMount } from 'svelte'  

  const headingText = `How do you plan to file your taxes this year?`
  const radioButtons = ['Single', 'Married Filing Jointly', 'Married Filing Separately', 'Head of Household', 'Qualifying Widow(er)']
  const radioHelpText = {
    radioButton: `Qualifying Widow(er)`,
    text: `Choose this if your spouse died in the last two years, you haven’t remarried, and you’re supporting a dependent child`
  }
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.filingStatus) {
        selectedRadioButton = convertShortToLongFilingStatus(store.filingStatus)
        store.makeButtonActive = true
      }
    }
  })

  const handleSelect = (button) => {
    selectedRadioButton = button  
    store.makeButtonActive = true
  }

  const handleNext = () => {
    store.filingStatus = convertLongToShortFilingStatus(selectedRadioButton)
    if (store.stateSupported && stateRules[store.currentState].standardDeductionMethod.type == 'exemptions') {
      store.currentPage = '10.5'
      goto('/10.5')
    }
    else { 
      store.currentPage = '11'
      goto('/11')
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
<RadioButtons buttons={radioButtons} helptext={radioHelpText} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />