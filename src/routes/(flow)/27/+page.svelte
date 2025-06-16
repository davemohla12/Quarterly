<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  const headingText = `Would you like to pay your taxes each quarter or in one single payment?`
  const radioButtons = ['Pay each quarter', 'Pay in single payment']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.payPreference == 'quarter') {
        selectedRadioButton = radioButtons[0]
        store.makeButtonActive = true
      }
      else if (store.payPreference == 'single') {
        selectedRadioButton = radioButtons[1]
        store.makeButtonActive = true
      }
    }
  })
  
  const handleSelect = (button) => {
    selectedRadioButton = button
    store.makeButtonActive = true
  }

  const handleNext = () => {
    if (selectedRadioButton== radioButtons[0]) {
      store.payPreference = 'quarter'
    }
    else {
      store.payPreference = 'single'
    }
    store.currentPage = '28'
    goto('/28')
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
<Heading text={headingText} desktopwidth="650px" mobilewidth="300px;"  />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
