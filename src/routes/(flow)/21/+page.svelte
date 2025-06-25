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

  const headingText = `Will you earn any salary or wages from a job this year?`
  let subheadingText = $state('')
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)  
  global.makeButtonActive = false

  onMount(async () => {
    if (await payment.getValue('filingStatus') == 'married') {
      subheadingText = `Select Yes if either of you or your spouse who you're file jointly with will have salary or wages this year`
    }
    else {
      subheadingText = ``
    } 
    if (global.loggedIn) {
      if (await payment.getValue('salaryOrWagesThisYear') == true) {
        selectedRadioButton = 'Yes'
        global.makeButtonActive = true
      }
      else if (await payment.getValue('salaryOrWagesThisYear') == false) {
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
      if (currentTaxQuarter == 'Q1') {
        goto('/27')
        await user.setValue('currentPage', '27')
      }
      else {
        goto('/25')
        await user.setValue('currentPage', '25')
      }
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
<Heading text={headingText} mobilewidth="280px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
