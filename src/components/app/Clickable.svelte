<script>
  let props = $props()
  let onclick = props.onclick
  let disabled = props.disabled || false
  let children = props.children
</script>

<button type="button" onclick={onclick} onkeydown={(event) => event.key === 'Enter' && onclick()} class:enabled={!disabled}>  
  {@render children()}
</button>

<style>
  button {
    background: none;   
    border: none;
    padding: 0;
    display: contents;
  }
  .enabled {
    cursor: pointer;
  }
</style>