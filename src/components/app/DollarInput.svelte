<script>
  import { store } from '$src/stores/store.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { onMount } from 'svelte'

  let props = $props()
  let onInput = props.onInput
  let placeholder = props.placeholder || ''
  let helpText = props.helpText || ''
  let isFocused = $state(false)
  let inputValue = $state('')
  let showHelp = $state(false)

  const formatCurrency = (value) => {
    if (!value) return ''
    const number = parseFloat(value.replace(/[$,]/g, ''))
    if (isNaN(number)) return ''
    const hasDecimal = value.includes('.')
    const formattedNumber = number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
    return `$${formattedNumber}`
  }
  
  const enableButton = () => {
    if (inputValue == null || inputValue == '$' || inputValue == '') {
      store.makeButtonActive = false
    }
    else {
      store.makeButtonActive = true
    }
  }

  const handleInput = (event) => {
    const value = event.target.value
    const cleanValue = value.replace(/[$,]/g, '')
    if (cleanValue === '') {
      inputValue = ''
      enableButton()
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
    enableButton()
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
      enableButton()
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
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })


</script>

<div class="container">
  <input class="input" class:shorter={helpText != ''} type="text" value={inputValue} onfocus={handleFocus} onblur={handleBlur} oninput={handleInput} />
  {#if helpText != ''}
    <Clickable onclick={toggleHelp}>
      <img class="help" src="/images/help.png" alt="Help" />
    </Clickable>
  {/if}
  {#if showHelp}
    <div class="helpText">{helpText}</div>
  {/if}
  <div class="placeholder" class:active={isFocused || inputValue} >{placeholder}</div>
</div>

<style>
  .container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: calc(100% - 40px);
    width: 320px;
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
  .helpText {
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
  @media (min-width: 768px) { 
    .container {
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
    }
  }
</style>

