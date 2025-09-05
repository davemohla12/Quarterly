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
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `Will you earn any income this year that isn't from a regular paycheck?`
  const subheadingText = `This includes freelance income, self-employment income, investment income, rental income, retirement withdrawals, alimony, or anything that doesn't have taxes withheld automatically`
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'

  let selectedRadioButton = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('earnNonPaycheckIncomeThisYear') == true) {
        selectedRadioButton = 'Yes'
        global.makeButtonActive = true
      }
      else if (getLocalStorage('earnNonPaycheckIncomeThisYear') == false) {
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
      await payment.setValue('earnNonPaycheckIncomeThisYear', true)
      goto('/3')
      await user.setValue('currentPage', '3')
    }
    else {
      await payment.setValue('earnNonPaycheckIncomeThisYear', false)
      goto('/2')
      await user.setValue('currentPage', '2')
    }
  }

</script>

<Header />
<Avatar screen={2} />
<Heading text={headingText} />
<Subheading text={subheadingText} mobilewidth="320px"/>
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext}/>
<Later />
