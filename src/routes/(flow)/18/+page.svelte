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
  import { getLocalStorage } from '$src/utilities/utilities'
  
  const headingText = `What do you expect your income to do this year relative to last year?`
  const radioButtons = ['Increase', 'Stay about the same', 'Decrease']
  const buttonText = 'NEXT'
  
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false
  
  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('incomeExpectationThisYear')) {
        selectedRadioButton = convertShortToLongIncomeExpectation(getLocalStorage('incomeExpectationThisYear'))
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
    if     (await payment.getValue('incomeExpectationThisYear') == 'decrease' 
        || (await payment.getValue('stateSupported') && !stateRules[await payment.getValue('currentState')].lastYearSafeHarborRule) 
        || (await payment.getValue('stateSupported') && !await payment.getValue('livedInCurrentStateAllLastYear'))
        || (await payment.getValue('stateSupported') && !await payment.getValue('livingInCurrentStateAllThisYear'))
      ) {  
      goto('/19')
      await user.setValue('currentPage', '19')
    }
    else {
      goto('/21')
      await user.setValue('currentPage', '21')
    }
  }

</script>

<Header />
<Avatar screen={19} />
<Heading text={headingText} desktopwidth="500px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
