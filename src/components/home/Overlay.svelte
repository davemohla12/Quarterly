<script>
  import Clickable from '$src/components/app/Clickable.svelte'

  let props = $props()
  let ondismiss = $derived(props.ondismiss)
</script>

<Clickable onclick={ondismiss}>
  <div class="overlay"></div>
</Clickable>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 50;
  }
</style>