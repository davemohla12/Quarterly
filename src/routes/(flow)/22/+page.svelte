<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'
  import { onMount } from 'svelte'
  import { currentQuarter } from '$src/settings/settings'
  
  const headingText = `Do you have W2 paychecks for your salaries and wages?`
  const subheadingText = `If so, we can lower your quarterly payment. If not, we'll keep your payments higher and you'll get refunded when you file your annual taxes`
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.hasW2 == true) {
        selectedRadioButton = 'Yes'
        store.makeButtonActive = true
      }
      else if (store.hasW2 == false) {
        selectedRadioButton = 'No'
        store.makeButtonActive = true
      }
    }
  })

  const handleSelect = (button) => {
    selectedRadioButton = button  
    store.makeButtonActive = true
  }

  const handleNext = () => {
    if (selectedRadioButton == 'Yes') {
      store.hasW2 = true
      store.currentPage = '23'
      goto('/23')
    }
    else {
      store.hasW2 = false
      if (currentQuarter == 'Q1') {
        store.currentPage = '27'
        goto('/27')
      }
      else {
        store.currentPage = '25'
        goto('/25')
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
<Heading text={headingText} mobilewidth="320px" />
<Subheading text={subheadingText} desktopwidth="550px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect} />   
<Button text={buttonText} onclick={handleNext} />
<Later />
