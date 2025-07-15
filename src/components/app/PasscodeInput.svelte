<script>
  let props = $props()
  let placeholder = $derived(props.placeholder || '')
  let onInput = $derived(props.onInput)
  let error = $derived(props.error || null)
  let isFocused = $state(false)
  let inputValue = $state('')

  const handleFocus = () => {
    isFocused = true
  }

  const handleBlur = () => {
    isFocused = false
  }

  const handleInput = (event) => {
    inputValue = event.target.value
    onInput(inputValue)
  }
  
</script>

<div class="container">
  <input class="input" type="password" value={inputValue} onfocus={handleFocus} onblur={handleBlur} oninput={handleInput} />
  <div class="placeholder" class:active={isFocused || inputValue} >{placeholder}</div>
  {#if error}
    <div class="error">{error}</div>
  {/if}
</div>

<style>
  .container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 100%;
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
  .error {
    color: var(--red);
    font-size: 16px;
    margin-top: 10px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);  
    text-align: center;
  }
</style>

