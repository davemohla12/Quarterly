<script>
  let props = $props()
  let onclick = props.onclick
  let disabled = props.disabled || false
  let children = props.children
  let noHighlight = props.noHighlight || false
</script>

<button type="button" onclick={onclick} class:enabled={!disabled} class:noHighlight={noHighlight} onkeydown={(event) => event.key === 'Enter' && onclick()} >  
  {@render children()}
</button>

<style>
  button {
    background: none;   
    border: none;
    padding: 0;
    display: contents;
  }
  .noHighlight {
    -webkit-tap-highlight-color: transparent;
    outline: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .enabled {
    cursor: pointer;
  }
</style>