<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  
  const headingText = `What are your expected deductible expenses this year?`
  const buttonText = 'NEXT'
  const placholderText1 = 'Business Expenses'
  const placholderText2 = 'Retirement Contributions'
  const placholderText3 = 'Student Loan Interest'
  const placholderText4 = 'Health Insurance'
  const placholderText5 = 'Other'

  const helpText1 = 'Includes office supplies, software, marketing, contractor payments, home office, travel'
  const helpText2 = 'Includes traditional IRA contributions'
  const helpText3 = 'Includes qualified student loan interest'
  const helpText4 = 'Includes health insurance if you are self-employed and not covered by an employer plan and health savings account (HSA) contributions'
  const helpText5 = 'Includes other rare deductions such as educator expenses or moving for the military'

  let inputValue1 = $state(null)
  let inputValue2 = $state(null)
  let inputValue3 = $state(null)
  let inputValue4 = $state(null)
  let inputValue5 = $state(null)
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.businessExpensesThisYear) {
        inputValue1 = store.businessExpensesThisYear
        store.makeButtonActive = true
      }
      if (store.retirementContributionsThisYear) {
        inputValue2 = store.retirementContributionsThisYear
        store.makeButtonActive = true
      }
      if (store.studentLoanInterestThisYear) {
        inputValue3 = store.studentLoanInterestThisYear
        store.makeButtonActive = true
      }
      if (store.healthInsuranceThisYear) {
        inputValue4 = store.healthInsuranceThisYear
        store.makeButtonActive = true
        }
      if (store.otherDeductionsThisYear) {
        inputValue5 = store.otherDeductionsThisYear
        store.makeButtonActive = true
      }
    }
  })

  const handleInput1 = (value) => {
    inputValue1 = value 
    enableButton()
  }

  const handleInput2 = (value) => {
    inputValue2 = value
    enableButton()
  }

  const handleInput3 = (value) => {
    inputValue3 = value 
    enableButton()
  }
      
  const handleInput4 = (value) => {
    inputValue4 = value
    enableButton()
  }

  const handleInput5 = (value) => {
    inputValue5 = value
    enableButton()
  }   

  const validValue = (value) => {
    if (value == null || value == '$' || value == '') {
      return false
    }
    else {
      return true
    }
  }

  const enableButton = () => {
    if (validValue(inputValue1) || validValue(inputValue2) || validValue(inputValue3) || validValue(inputValue4) || validValue(inputValue5)) {
      store.makeButtonActive = true
    }
    else {
      store.makeButtonActive = false
    }
  }

  const handleNext = () => {
    store.businessExpensesThisYear = convertCurrencyToNumber(inputValue1)
    store.retirementContributionsThisYear = convertCurrencyToNumber(inputValue2)
    store.studentLoanInterestThisYear = convertCurrencyToNumber(inputValue3)
    store.healthInsuranceThisYear = convertCurrencyToNumber(inputValue4)
    store.otherDeductionsThisYear = convertCurrencyToNumber(inputValue5)
    goto('/21')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
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
<Heading text={headingText} desktopwidth="500px"  mobilewidth="280px"/>
<DollarInput placeholder={placholderText1} value={inputValue1} onInput={handleInput1} helpText={helpText1} />
<DollarInput placeholder={placholderText2} value={inputValue2} onInput={handleInput2} helpText={helpText2} />
<DollarInput placeholder={placholderText3} value={inputValue3} onInput={handleInput3} helpText={helpText3} />
<DollarInput placeholder={placholderText4} value={inputValue4} onInput={handleInput4} helpText={helpText4} />
<DollarInput placeholder={placholderText5} value={inputValue5} onInput={handleInput5} helpText={helpText5} />
<Button text={buttonText} onclick={handleNext} />
<Later />
