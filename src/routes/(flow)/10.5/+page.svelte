<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'  
  import NumberInput from '$src/components/app/NumberInput.svelte'
  import { onMount } from 'svelte'  

  const headingText = `How many exemptions do you have?`
  const subheadingText = `This usually includes you, your spouse, and any dependents`
  const buttonText = 'NEXT'
  const placeholderText = 'Number of Exemptions'
  let inputValue = $state(null)
  store.makeButtonActive = false

  onMount(() => {
    if (store.loggedIn) {
      if (store.exemptions) {
        inputValue = store.exemptions
        store.makeButtonActive = true
      }
    }
  })

  const handleInput = (value) => {
    inputValue = value
    if (inputValue != '') {
      store.makeButtonActive = true
    }
    else { 
      store.makeButtonActive = false
    }
  }

  const handleNext = () => {
    store.exemptions = inputValue
    store.currentPage = '11'
    goto('/11')
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
<Heading text={headingText} desktopwidth="600px" mobilewidth="275px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="275px" />
<NumberInput placeholder={placeholderText} value={inputValue} onInput={handleInput} />
<Button text={buttonText} onclick={handleNext} />
<Later />