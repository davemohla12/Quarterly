<script>
  import { store } from '$src/stores/store.svelte'
  import validator from 'validator'
  import Clickable from '$src/components/app/Clickable.svelte'

  let props = $props()
  let onInput = props.onInput
  let placeholder = props.placeholder || ''
  let isFocused = $state(false)
  let inputValue = $state(props.value || '')
  let hasBlurred = $state(false)
  let error = $state('')  
  let showPassword = $state(false)

  $effect(() => {
    inputValue = props.value || ''
  })

  const validatePassword = (value) => {
    const isValidPassword = validator.isLength(value, { min: 8 })
    if (hasBlurred && !isValidPassword) {
      error = 'Your password must be at least 8 characters long'
    } 
    else {
      error = ''
    }
    onInput(value, isValidPassword)
  }

  const handleInput = (event) => {
    inputValue = event.target.value
    validatePassword(inputValue)
  }
  
  const handleFocus = () => {
    isFocused = true
  }

  const handleBlur = () => {
    isFocused = false
    hasBlurred = true
    validatePassword(inputValue)
  }

  const toggleShowPassword = () => {
    showPassword = !showPassword
  }

</script>

<div class="container">
  <input class="input" class:errorinput={error !== ''} type="text" style="display: {showPassword ? 'block' : 'none'}" value={inputValue} onfocus={handleFocus} onblur={handleBlur} oninput={handleInput} />
  <input class="input" class:errorinput={error !== ''} type="password" style="display: {showPassword ? 'none' : 'block'}" value={inputValue} onfocus={handleFocus} onblur={handleBlur} oninput={handleInput} />
  <div class="placeholder" class:active={isFocused || inputValue} class:errorplaceholder={error !== ''}>{placeholder}</div>
  {#if showPassword}
    <Clickable onclick={toggleShowPassword} >
      <img src="/images/hide.png" class="hide" alt="Hide" />
    </Clickable>
  {:else}
    <Clickable onclick={toggleShowPassword} >
      <img src="/images/show.png" class="show" alt="Show" />
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
    position: relative;
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
  .show {
    width: 22px;
    height: 15px;
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .hide {
    width: 22px;
    height: 15px;
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .active {
    top: -7px;
    left: 16px;
    font-size: 12px;
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

