<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'  
  import { onMount } from 'svelte'

  const headingText = `Will you earn any salary or wages from a job this year?`
  let subheadingText = $state('')
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)  
  store.makeButtonActive = false

  onMount(() => {
    if (store.filingStatus == 'married') {
      subheadingText = `Select Yes if either of you or your spouse who you're file jointly with will have salary or wages this year`
    }
    else {
      subheadingText = ``
    } 
  })

  const handleSelect = (button) => {
    selectedRadioButton = button
  }

  const handleNext = () => {
    if (selectedRadioButton === 'Yes') {
      store.salaryOrWagesThisYear = true
      store.currentPage = '22'
      goto('/22')
    }
    else {
      store.salaryOrWagesThisYear = false
      if (store.currentQuarter == 'Q1') {
        store.currentPage = '27'
        goto('/27')
      }
      else {
        store.currentPage = '25'
        goto('/25')
      }
    }
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
<Heading text={headingText} mobilewidth="280px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<RadioButtons buttons={radioButtons} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext} />
<Later />
