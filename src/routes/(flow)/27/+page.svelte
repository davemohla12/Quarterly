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
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `Would you like to pay your taxes each quarter or in one single payment?`
  const radioButtons = ['Pay each quarter', 'Pay in single payment']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('payPreference') == 'quarter') {
        selectedRadioButton = radioButtons[0]
        global.makeButtonActive = true
      }
      else if (getLocalStorage('payPreference') == 'single') {
        selectedRadioButton = radioButtons[1]
        global.makeButtonActive = true
      }
    }
  })
  
  const handleSelect = (button) => {
    selectedRadioButton = button
    global.makeButtonActive = true
  }

  const handleNext = async () => {
    if (selectedRadioButton== radioButtons[0]) {
      await payment.setValue('payPreference', 'quarter')
    }
    else {
      await payment.setValue('payPreference', 'single')
    }
    goto('/28')
    await user.setValue('currentPage', '28')
  }

</script>

<Header />
<Avatar screen={30} />
<Heading text={headingText} desktopwidth="650px" mobilewidth="300px;"  />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
