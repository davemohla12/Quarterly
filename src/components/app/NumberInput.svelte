<script>
  import { store } from '$src/stores/store.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'

  let props = $props()
  let onInput = props.onInput
  let placeholder = props.placeholder || ''
  let isFocused = $state(false)
  let inputValue = $state('')

  const formatNumber = (value) => {
    const num = parseInt(value)
    if (isNaN(num) || num <=0) {
      return ''
    }
    else {
      return num.toString()
    }
  }

  const handleInput = (event) => {
    const value = event.target.value
    if (value === '') {
      inputValue = ''
      store.makeButtonActive = false
      onInput('')
      return
    }
    if (value.includes('.')) {
      event.target.value = inputValue
      return
    }
    const num = parseInt(value)
    if (isNaN(num) || num <= 0) {
      event.target.value = inputValue
      return
    }
    inputValue = num.toString()
    store.makeButtonActive = true
    onInput(inputValue)
  }
  
  const handleFocus = () => {
    isFocused = true
  }

  const handleBlur = (event) => {
    isFocused = false
    if (inputValue) {
      inputValue = formatNumber(inputValue)
    }
  }

</script>

<div class="container">
  <input class="input" type="number" inputmode="numeric" pattern="[1-9][0-9]*" value={inputValue} onfocus={handleFocus} onblur={handleBlur} oninput={handleInput} />
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

