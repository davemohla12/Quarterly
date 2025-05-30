<script>
  let props = $props()  
  let errorMessage = $state(props.errorMessage)

  $effect(() => {
    errorMessage = props.errorMessage
  })
</script>

<div class="error">{errorMessage}</div> 

<style>
  .error {
    color: var(--red);
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);
    margin-top: 20px;
    text-align: center;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
</style>