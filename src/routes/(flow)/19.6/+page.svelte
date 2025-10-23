<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'  
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  
  const headingText = `How much of your income this year will be from self-employment?`
  const subheadingText = `Self-employment includes freelancing, consulting, contracting, and a solo business`
  const radioButtons = ['All of it', 'Some of it', 'None of it']
  const buttonText = 'NEXT'
  
  let selectedRadioButton = $state(null)
  global.makeButtonActive = false
  
  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('selfEmploymentIncomeExpectationThisYear')) {
        selectedRadioButton = getLocalStorage('selfEmploymentIncomeExpectationThisYear')
        global.makeButtonActive = true
      }
    }
  })

  const handleSelect = (button) => {
    selectedRadioButton = button
    global.makeButtonActive = true
  }

  const handleNext = async () => {
    await payment.setValue('selfEmploymentIncomeExpectationThisYear', selectedRadioButton)
    const selfEmploymentIncomeExpectationThisYear = selectedRadioButton
    if (selfEmploymentIncomeExpectationThisYear == 'All of it' ) {  
      const expectedTotalIncomeThisYear = getLocalStorage('expectedTotalIncomeThisYear')
      await payment.setValue('expectedSelfEmploymentIncomeThisYear', expectedTotalIncomeThisYear)
      goto('/20')
      await user.setValue('currentPage', '20')
    }
    else if (selfEmploymentIncomeExpectationThisYear == 'None of it') {
      await payment.setValue('expectedSelfEmploymentIncomeThisYear', 0)
      goto('/20')
      await user.setValue('currentPage', '20')
    }
    else {
      goto('/19.75')
      await user.setValue('currentPage', '19.75')
    }
  }

</script>

<Header />
<Avatar screen={21} />
<Heading text={headingText} desktopwidth="600px" mobilewidth="350px" />
<Subheading text={subheadingText} desktopwidth="600px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
