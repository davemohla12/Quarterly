<script>
  import validator from 'validator'
  import Clickable from './Clickable.svelte'

  let props = $props()
  let onInput = props.onInput
  let placeholder = props.placeholder || ''
  let showClear = props.showClear || false
  let onclear = props.onclear || (() => {})
  let hideError = props.hideError || false
  let isFocused = $state(false)
  let inputValue = $state(props.value || '')
  let hasBlurred = $state(false)
  let error = $state('')

  $effect(() => {
    inputValue = props.value || ''
  })

  const validateEmail = (value) => {
    const isValidEmail = validator.isEmail(value)
    if (hasBlurred && !isValidEmail && !hideError) {
      error = 'Enter a valid email address'
    } 
    else {
      error = ''
    }
    onInput(value, isValidEmail)
  }

  const handleInput = (event) => {
    inputValue = event.target.value
    validateEmail(inputValue)
  }
  
  const handleFocus = () => {
    error = ''
    isFocused = true
  }

  const handleBlur = () => {
    isFocused = false
    hasBlurred = true
    validateEmail(inputValue)
  }
</script>

<div class="container">
  <input class="input" class:errorinput={error !== ''} type="email" value={inputValue} onfocus={handleFocus} onblur={handleBlur} oninput={handleInput} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-1p-ignore="true"/>
  <div class="placeholder" class:active={isFocused || inputValue} class:errorplaceholder={error !== ''}>{placeholder}</div>
  {#if showClear && inputValue}
    <Clickable onclick={onclear}>
      <img class="clear" src="/images/clear.png" alt="Clear" />
    </Clickable>
  {/if}
  <div class="error">{error}</div>
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
  .errorinput {
    border: 1.5px solid var(--red);
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
  .clear {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 20px;
    top: 22px;
  }
  .error {
    color: var(--red);
    font-size: 16px;
    margin-top: 10px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);  
    text-align: center;
  }
  @media (min-width: 768px) { 
    .container {
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
    }
  }
</style>

