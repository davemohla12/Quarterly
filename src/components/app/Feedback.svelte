<script>
  const props = $props()
  let rating = $derived(props.rating || null)
  let oninput = props.oninput || (() => {})

  const handleInput = (event) => {
    oninput(event.target.innerHTML)
  }

  const getPlaceholderText = () => {
    if (rating === 'good') {
      return `What did you like about it?`
    } 
    else {
      return `What didn't go as expected?`
    }
  }

</script>

<div class="container">
  <div class="feedback" contenteditable="true" oninput={handleInput} data-placeholder={getPlaceholderText()}></div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: -5px;
  }
  .feedback {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
    width: 100%;
    margin-left:25px;
    margin-right:25px;
    height: 150px;
    border: 1px solid var(--gray2);
    padding: 20px;
    margin-bottom: 10px;
    outline: none;
  }
  .feedback:empty:before {
    content: attr(data-placeholder);
    color: var(--gray4);
    pointer-events: none;
  }
  @media (min-width: 768px) { 
    .feedback {
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      font-weight: var(--regular);
      width: 400px;
      height: 150px;
      border: 1px solid var(--gray2);
      padding: 20px;
      margin-bottom: 10px;
      outline: none;
    }
  }
</style>