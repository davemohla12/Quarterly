<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { onMount } from 'svelte'

  let props = $props()
  let onInput = props.onInput
  let placeholder = props.placeholder || ''
  let value = $derived(props.value || '')
  let helpText = props.helpText || ''
  let isFocused = $state(false)
  let inputValue = $derived(formatCurrency(value))
  let showHelp = $state(false)
  let showReset = $derived(props.showReset || false)
  let onreset = props.onreset

  onMount(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  $effect(() => {
    if (value) {
      inputValue = formatCurrency(value)
    }
  })

  const formatCurrency = (value) => {
    if (!value) return ''
    const number = parseFloat(value.replace(/[$,]/g, ''))
    if (isNaN(number)) return ''
    const formattedNumber = number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
    return `$${formattedNumber}`
  }

  const handleInput = (event) => {
    const value = event.target.value
    const cleanValue = value.replace(/[$,]/g, '')
    if (cleanValue === '') {
      inputValue = ''
      onInput('')
      return
    }
    if (cleanValue === '.') {
      inputValue = '$0.'
      return
    }
    if (!/^\d*\.?\d{0,2}$/.test(cleanValue)) {
      event.target.value = inputValue
      return
    }
    const formattedValue = formatCurrency(cleanValue)
    inputValue = formattedValue
    onInput(inputValue)
  }
  
  const handleFocus = () => {
    isFocused = true
  }

  const handleBlur = (event) => {
    isFocused = false
    if (inputValue) {
      const formattedValue = formatCurrency(inputValue)
      inputValue = formattedValue
      onInput(inputValue)
      event.target.value = formattedValue
    }
  }

  const toggleHelp = () => {
    showHelp = !showHelp
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest('.container')) {
      showHelp = false
    }
  }

  const handleReset = () => {
    onreset()
  }
</script>

<div class="container">
  <input class="input" type="text" inputmode="decimal" class:shorter={helpText != ''} value={inputValue} onfocus={handleFocus} onblur={handleBlur} oninput={handleInput} />
  {#if helpText != ''}
    <Clickable onclick={toggleHelp}>
      <img class="help" src="/images/help.png" alt="Help" />
    </Clickable>
  {/if}
  {#if showHelp}
    <div class="helptext">{helpText}</div>
  {/if}
  <div class="placeholder" class:active={isFocused || inputValue} >{placeholder}</div>
  {#if showReset}
    <Clickable onclick={() => handleReset()}>   
      <img class="reset" src="/images/resetfield.png" alt="Reset"/>
    </Clickable>
  {/if}
</div>

<style>
  .container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    max-width: 320px;
  }
  .input {
    border: 1px solid var(--gray2);
    height: 56px;
    width: 100%;
    border-radius: 5px;
    padding-left: 20px;
    outline: none;  
    display: block;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);
    font-size: 16px;
    color: var(--dark);
    background: transparent;
  }
  .shorter {
    width: calc(100% - 40px);
  }
  .help {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 20px;
  }
  .helptext {
    position: absolute;
    left: 0px;
    top: 58px;
    color: var(--white);
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);
    background: var(--dark);
    z-index: 100;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--gray2);
  }
  .placeholder {
    position: absolute;
    left: 20px;
    top: 18px;
    color: var(--gray4);
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
    background: white;
    padding: 0 4px;
  }
  .active {
    top: -7px;
    left: 16px;
    font-size: 12px;
  }
  .reset {
    position: absolute;
    right: -45px;
    top: 17px;
    width: 18px;
    height: 21px;
  }
  @media (min-width: 768px) { 
    .container {
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
    }
  }
</style>

