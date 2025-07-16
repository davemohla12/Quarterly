<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'  
  import NumberInput from '$src/components/app/NumberInput.svelte'
  import { onMount } from 'svelte'  
  import { payment } from '$src/data/payment.svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'

  const headingText = `How many exemptions do you have?`
  const subheadingText = `This usually includes you, your spouse, and any dependents`
  const buttonText = 'NEXT'
  const placeholderText = 'Number of Exemptions'
  let inputValue = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    if (global.loggedIn) {
      if (getLocalStorage('exemptions')) {
        inputValue = getLocalStorage('exemptions')
        global.makeButtonActive = true
      }
    }
  })

  const handleInput = (value) => {
    inputValue = value
    if (inputValue != '') {
      global.makeButtonActive = true
    }
    else { 
      global.makeButtonActive = false
    }
  }

  const handleNext = async () => {
    await payment.setValue('exemptions', inputValue)
    goto('/11')
    await user.setValue('currentPage', '11')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<Header />
<Avatar />
<Heading text={headingText} desktopwidth="600px" mobilewidth="275px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="275px" />
<NumberInput placeholder={placeholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />