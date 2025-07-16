<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { onMount } from 'svelte'
  import { currentTaxQuarter } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  
  const headingText = `Do you have W2 paychecks for your salaries and wages?`
  const subheadingText = `If so, we can lower your quarterly payment. If not, we'll keep your payments higher and you'll get refunded when you file your annual taxes`
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('hasW2') == true) {
        selectedRadioButton = 'Yes'
        global.makeButtonActive = true
      }
      else if (getLocalStorage('hasW2') == false) {
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
      await payment.setValue('hasW2', true)
      if (await payment.getValue('safeToSkipFederalPayment')) {
        goto('/24')
        await user.setValue('currentPage', '24')
      }
      else {
        goto('/23')
        await user.setValue('currentPage', '23')
      }
    }
    else {
      await payment.setValue('hasW2', false)
      await payment.setValue('federalWithholdingsThisYear', 0)
      await payment.setValue('stateWithholdingsThisYear', 0)
      if (currentTaxQuarter == 'Q1') {
        if (await payment.getValue('livingInCurrentStateAllThisYear')) {
          goto('/27')
          await user.setValue('currentPage', '27')
        }
        else {
          goto('/28')
          await user.setValue('currentPage', '28')
        }
      }
      else {
        goto('/25')
        await user.setValue('currentPage', '25')
      }
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} mobilewidth="320px" />
<Subheading text={subheadingText} desktopwidth="550px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect} />   
<Button text={buttonText} onclick={handleNext} />
<Later />
