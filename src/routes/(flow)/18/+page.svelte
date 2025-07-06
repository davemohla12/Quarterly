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
  import { stateRules } from '$src/rules/state'
  import { convertLongToShortIncomeExpectation, convertShortToLongIncomeExpectation } from '$src/utilities/utilities'
  import { onMount } from 'svelte'  
  import { user } from '$src/data/user.svelte'
  
  const headingText = `What do you expect your income to do this year relative to last year?`
  const radioButtons = ['Increase', 'Stay about the same', 'Decrease']
  const buttonText = 'NEXT'
  
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false
  
  onMount(async () => {
    if (global.loggedIn) {
      if (await payment.getValue('incomeExpectationThisYear')) {
        selectedRadioButton = convertShortToLongIncomeExpectation(await payment.getValue('incomeExpectationThisYear'))
        global.makeButtonActive = true
      }
    }
  })

  const handleSelect = (button) => {
    selectedRadioButton = button
    global.makeButtonActive = true
  }

  const handleNext = async () => {
    await payment.setValue('incomeExpectationThisYear', convertLongToShortIncomeExpectation(selectedRadioButton))
    if (await payment.getValue('incomeExpectationThisYear') == 'decrease' 
        || (stateRules[await payment.getValue('currentState')].stateHasQuarterlyTaxes && !stateRules[await payment.getValue('currentState')].lastYearSafeHarborRule) 
        || (stateRules[await payment.getValue('currentState')].stateHasQuarterlyTaxes && await payment.getValue('livedInCurrentStateAllLastYear') == false)) {  
      goto('/19')
      await user.setValue('currentPage', '19')
    }
    else {
      goto('/21')
      await user.setValue('currentPage', '21')
    }
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
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
