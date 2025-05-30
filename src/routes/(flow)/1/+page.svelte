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

  const headingText = `Will you earn any income this year that isn't from a regular paycheck?`
  const subheadingText = `This includes freelance income, self-employment income, investment income, rental income, retirement withdrawals, alimony, or anything that doesn't have taxes withheld automatically`
  const radioButtons = ['Yes', 'No']
  const buttonText = 'NEXT'
  let selectedRadioButton = $state(null)
  store.makeButtonActive = false

  const handleSelect = (button) => {
    selectedRadioButton = button
    store.makeButtonActive = true
  }

  const handleNext = () => {
    if (selectedRadioButton === 'Yes') {
      store.earnNonPaycheckIncomeThisYear = true
      store.currentPage = '3'
      goto('/3')
    }
    else {
      store.earnNonPaycheckIncomeThisYear = false
      store.currentPage = '2'
      goto('/2')
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
<Heading text={headingText} />
<Subheading text={subheadingText} mobilewidth="320px"/>
<RadioButtons buttons={radioButtons} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleNext}/>
<Later />
