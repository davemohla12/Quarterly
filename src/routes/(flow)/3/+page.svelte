<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import Dropdown from '$src/components/app/Dropdown.svelte'
  import { store } from '$src/stores/store.svelte'    
  import { goto } from '$app/navigation'
  import { doesStateHaveQuarterlyTaxes, convertStateToLowerCase, convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  
  const headingText = `What state do you reside in?`
  const buttonText = 'NEXT'
  store.makeButtonActive = false
  let currentState = $state(null)

  onMount(() => {
    if (store.loggedIn) {
      if (store.currentState) {
        currentState = convertStateToUpperCase(store.currentState)
        store.makeButtonActive = true
      }
    }
  })

  const handleSelection = (selection) => {
    store.currentState = convertStateToLowerCase(selection)
    if (store.currentState != '') {
      store.makeButtonActive = true
    }
    else { 
      store.makeButtonActive = false
    }
  }

  const handleNext = () => {
    if (doesStateHaveQuarterlyTaxes(store.currentState)) {
      store.stateHasQuarterlyTaxes = true
      store.stateSupported = true
      store.currentPage = '5'
      goto('/5')
    }
    else {
      store.stateHasQuarterlyTaxes = false
      store.stateSupported = false
      store.currentPage = '4'
      goto('/4')
    }
  }

  const handleKeyDown = async (event) => {
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
<Dropdown text="State" values={store.states} selected={currentState} onselection={handleSelection}/>
<Button text={buttonText} onclick={handleNext} />
<Later />