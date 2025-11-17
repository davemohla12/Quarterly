<script>
  const props = $props()
  let value = $derived(props.value || '')
  let oninput = props.oninput || (() => {})
  let placeholder = props.placeholder || ''
  let height = props.height || '300px'

  const handleInput = (event) => {
    oninput(event.target.innerHTML)
  }

</script>

<div class="container">
  <div class="message" contenteditable="true" innerHTML={value} oninput={handleInput} data-placeholder={placeholder} style:height={height}></div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .message {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
    width: 100%;
    margin-left:25px;
    margin-right:25px;
    border: 1px solid var(--gray2);
    padding: 20px;
    margin-bottom: 10px;
    outline: none;
  }
  .message:empty:before {
    content: attr(data-placeholder);
    color: var(--gray4);
    pointer-events: none;
  }
  @media (min-width: 768px) { 
    .message {
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: var(--regular);
      width: 600px;
      border: 1px solid var(--gray2);
      padding: 20px;
      margin-bottom: 10px;
      outline: none;
    }
  }
</style>