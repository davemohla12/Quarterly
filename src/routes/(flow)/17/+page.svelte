<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { federalRules } from '$src/rules/federal'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `What was your federal adjusted gross income last year?`
  const subheadingText = `You can find this on form ${federalRules.adjustedGrossIncomeForm} line ${federalRules.adjustedGrossIncomeLine}`
  const buttonText = 'NEXT'
  const placholderText = 'Adjusted Gross Income'
  let inputValue = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('adjustedGrossIncomeLastYear')) {
        const adjustedGrossIncomeLastYear = getLocalStorage('adjustedGrossIncomeLastYear')
        inputValue = adjustedGrossIncomeLastYear.toString()
        global.makeButtonActive = true
      }
    }
  })

  const handleInput = (value) => {
    inputValue = value
    if (inputValue == null || inputValue == '$' || inputValue == '') {
      global.makeButtonActive = false
    }
    else {
      global.makeButtonActive = true
    }
  }

  const handleNext = async () => {
    await payment.setValue('adjustedGrossIncomeLastYear', convertCurrencyToNumber(inputValue))
    if (await payment.getValue('stateSupported') && (stateRules[await payment.getValue('currentState')].thisYearIncomeCalculationType?.type == 'federalAGI' || !stateRules[await payment.getValue('currentState')].lastYearSafeHarborRule || !await payment.getValue('livedInCurrentStateAllLastYear') || !await payment.getValue('livingInCurrentStateAllThisYear'))) {
      await payment.setValue('stateIncomeLastYear', await payment.getValue('adjustedGrossIncomeLastYear'))
      goto('/18')
      await user.setValue('currentPage', '18')
    }
    else { 
      if (await payment.getValue('stateSupported')) {
        goto('/17.5')
        await user.setValue('currentPage', '17.5')
      }
      else {
        goto('/18')
        await user.setValue('currentPage', '18')
      }
    }
  }

</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="400px" />
<DollarInput placeholder={placholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext}/>
<Later />
