<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage, convertNumberToRoundedCurrency } from '$src/utilities/utilities'

  const headingText = `What is your expected income from self-employment this year?`
  let subheadingText = $state()
  const buttonText = 'NEXT'
  const placholderText = 'Self-employment income'
  let inputValue = $state(null) 
  global.makeButtonActive = false

  onMount(async () => {
    const expectedTotalIncomeThisYear = getLocalStorage('expectedTotalIncomeThisYear')
    subheadingText = `Of the ${convertNumberToRoundedCurrency(expectedTotalIncomeThisYear)} in total income you expect this year, how much of will come from self-employment such as freelancing, consulting, or a solo business?`
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
    await payment.setValue('expectedSelfEmploymentIncomeThisYear', convertCurrencyToNumber(inputValue))
    goto('/20')
    await user.setValue('currentPage', '20')
  }

</script>

<Header />
<Avatar screen={21} />
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="550px" mobilewidth="350px" />
<DollarInput placeholder={placholderText} value={inputValue} onInput={handleInput} shouldFocus={true}/>
<Button text={buttonText} onclick={handleNext} />
<Later />