<script>
  let props = $props()
  let text = props.text
</script>


<div class="text">{@html text}</div>

<style>
  .text {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: var(--regular);
    color: var(--dark);
    margin-top: 25px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  :global(.text a) {
    color: var(--dark);
    text-decoration: none;
  }
  :global(.text a:hover) {
    text-decoration: underline;
  }
</style>
