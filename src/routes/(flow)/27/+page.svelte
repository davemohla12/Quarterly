<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'

  const headingText = `Would you like to pay your taxes each quarter or in one single payment?`
  const radioButtons = ['Pay each quarter', 'Pay in single payment']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (await payment.getValue('payPreference') == 'quarter') {
        selectedRadioButton = radioButtons[0]
        global.makeButtonActive = true
      }
      else if (await payment.getValue('payPreference') == 'single') {
        selectedRadioButton = radioButtons[1]
        global.makeButtonActive = true
      }
    }
  })
  
  const handleSelect = (button) => {
    selectedRadioButton = button
    global.makeButtonActive = true
  }

  const handleNext = () => {
    if (selectedRadioButton== radioButtons[0]) {
      payment.setValue('payPreference', 'quarter')
    }
    else {
      payment.setValue('payPreference', 'single')
    }
    user.setValue('currentPage', '28')
    goto('/28')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
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
