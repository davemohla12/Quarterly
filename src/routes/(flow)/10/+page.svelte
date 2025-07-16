<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'  
  import { convertLongToShortFilingStatus, convertShortToLongFilingStatus } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state.js'
  import { onMount } from 'svelte'  
  import { payment } from '$src/data/payment.svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  
  const headingText = `How do you plan to file your taxes this year?`
  const radioButtons = ['Single', 'Married Filing Jointly', 'Married Filing Separately', 'Head of Household', 'Qualifying Widow(er)']
  const radioHelpText = {
    radioButton: `Qualifying Widow(er)`,
    text: `Choose this if your spouse died in the last two years, you haven’t remarried, and you’re supporting a dependent child`
  }
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('filingStatus')) {
        selectedRadioButton = convertShortToLongFilingStatus(getLocalStorage('filingStatus'))
        global.makeButtonActive = true
      }
    }
  })

  const handleSelect = (button) => {
    selectedRadioButton = button  
    global.makeButtonActive = true
  }

  const handleNext = async () => {
    await payment.setValue('filingStatus', convertLongToShortFilingStatus(selectedRadioButton))
    if (await payment.getValue('stateSupported') && (stateRules[await payment.getValue('currentState')].standardDeductionMethod?.type == 'exemptions' || !await payment.getValue('livingInCurrentStateAllThisYear'))) {
      goto('/10.5')
      await user.setValue('currentPage', '10.5')
    }
    else { 
      goto('/11')
      await user.setValue('currentPage', '11')
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} helptext={radioHelpText} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />