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

  const headingText = `Will you earn any salary or wages from a job this year?`
  let subheadingText = $state('')
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)  
  global.makeButtonActive = false

  onMount(async () => {
    if (getLocalStorage('filingStatus') == 'married') {
      subheadingText = `Select Yes if either of you or your spouse who you're file jointly with will have salary or wages this year`
    }
    else {
      subheadingText = ``
    } 
    if (global.loggedIn) {
      if (getLocalStorage('salaryOrWagesThisYear') == true) {
        selectedRadioButton = 'Yes'
        global.makeButtonActive = true
      }
      else if (getLocalStorage('salaryOrWagesThisYear') == false) {
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
    if (selectedRadioButton === 'Yes') {
      await payment.setValue('salaryOrWagesThisYear', true)
      goto('/22')
      await user.setValue('currentPage', '22')
    }
    else {
      await payment.setValue('salaryOrWagesThisYear', false)
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
        if (await payment.getValue('safeToSkipFederalPayment')) {   
          goto('/26')
          await user.setValue('currentPage', '26')
        }
        else {
          goto('/25')
          await user.setValue('currentPage', '25')
        }
      }
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} mobilewidth="280px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
