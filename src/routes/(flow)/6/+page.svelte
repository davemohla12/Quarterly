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
  import { stateRules } from '$src/rules/state' 
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  let headingText = $state('')
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    headingText = `Do you plan to live in ${convertStateToUpperCase(getLocalStorage('currentState'))} all of this year?`
    if (global.loggedIn) {
      if (getLocalStorage('livingInCurrentStateAllThisYear') == true) {
        selectedRadioButton = 'Yes'
        global.makeButtonActive = true
      }
      else if (getLocalStorage('livingInCurrentStateAllThisYear') == false) {
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
      await payment.setValue('livingInCurrentStateAllThisYear', true)
      if (!await payment.getValue('stateHasQuarterlyTaxes')) {
        goto('/6.25')
        await user.setValue('currentPage', '6.25')
        await payment.setValue('stateSupported', false)
      }
      else {
        if (stateRules[await payment.getValue('currentState')].lastYearSafeHarborRule && await payment.getValue('livedInCurrentStateAllLastYear')) {
          goto('/8')
          await user.setValue('currentPage', '8')
        }
        else {
          goto('/9')
          await user.setValue('currentPage', '9')
        }
      }
    }
    else {
      await payment.setValue('livingInCurrentStateAllThisYear', false)
      goto('/6.5')
      await user.setValue('currentPage', '6.5')
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
