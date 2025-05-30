<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import DollarInput from '$src/components/app/DollarInput.svelte'
  import { store } from '$src/stores/store.svelte'
  import { goto } from '$app/navigation'
  import { convertCurrencyToNumber } from '$src/utilities/utilities'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'

  const headingText = `What did you pay in ${convertStateToUpperCase(store.currentState)} quarterly payments this year?`
  const subheadingText = `To determine this, find the number in box 17 of each W2 paycheck and then multiply by the number of W2s you plan to get this year`
  const buttonText = 'NEXT'
  let placeholderText1 = $state('')
  let placeholderText2 = $state('')
  let placeholderText3 = $state('')
  let inputValue1 = $state(null)
  let inputValue2 = $state(null)
  let inputValue3 = $state(null)
  store.makeButtonActive = false


  onMount(() => {
    if (store.currentQuarter == 'Q2') {
      placeholderText1 = 'April Payment'
    }
    else if (store.currentQuarter == 'Q3') {
      placeholderText1 = 'April Payment'
      placeholderText2 = 'June Payment'
    }
    else if (store.currentQuarter == 'Q4') {
      placeholderText1 = 'April Payment'
      placeholderText2 = 'June Payment'
      placeholderText3 = 'September Payment'
    }
  })

  const handleInput1 = (value) => {
    inputValue1 = value
  }   

  const handleInput2 = (value) => {
    inputValue2 = value
  }
  
  const handleInput3 = (value) => {  
    inputValue3 = value
  }
  
  const handleNext = () => {
    store.q1StatePaymentMade = convertCurrencyToNumber(inputValue1)
    store.q2StatePaymentMade = convertCurrencyToNumber(inputValue2)
    store.q3StatePaymentMade = convertCurrencyToNumber(inputValue3) 
    store.currentPage = '28'
    goto('/28')
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
<Heading text={headingText} desktopwidth="550px" mobilewidth="300px" />
{#if placeholderText1 != ''}
  <DollarInput placeholder={placeholderText1} onInput={handleInput1} />
{/if}
{#if placeholderText2 != ''}
  <DollarInput placeholder={placeholderText2} onInput={handleInput2} />
{/if}
{#if placeholderText3 != ''}
  <DollarInput placeholder={placeholderText3} onInput={handleInput3} />
{/if}
<Button text={buttonText} onclick={handleNext} />
<Later />
