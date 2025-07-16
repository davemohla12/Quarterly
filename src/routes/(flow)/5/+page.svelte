<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  let headingText = $state('')
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)  
  global.makeButtonActive = false
  
  onMount(async () => {
    headingText = `Did you live in ${convertStateToUpperCase(await payment.getValue('currentState'))} all of last year?`
    if (global.loggedIn) {
      if (getLocalStorage('livedInCurrentStateAllLastYear') == true) {
        selectedRadioButton = 'Yes'
        global.makeButtonActive = true
      }
      else if (getLocalStorage('livedInCurrentStateAllLastYear') == false) {
        selectedRadioButton = 'No'
        global.makeButtonActive = true
      }
    }
  })

  const handleSelect = (button) => {
    selectedRadioButton = button
    global.makeButtonActive = true
  }

  const handleNext = async () => {
    if (selectedRadioButton == 'Yes') {
      await payment.setValue('livedInCurrentStateAllLastYear', true)
    }
    else {
      await payment.setValue('livedInCurrentStateAllLastYear', false)
    }
    goto('/6')
    await user.setValue('currentPage', '6')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect} />
<Button text={buttonText} onclick={handleNext} />
<Later />
