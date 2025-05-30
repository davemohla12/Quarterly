<script>
  let props = $props()
  let text = $derived(props.text)
  let mobilewidth = props.mobilewidth || '400px'
  let desktopwidth = props.desktopwidth || '600px'
</script>

<div class="subheading" style="--mobilewidth: {mobilewidth}; --desktopwidth: {desktopwidth}">
  {@html text}
</div>

<style>
  .subheading {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: var(--regular);
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    width: var(--mobilewidth);
    max-width: calc(100vw - 20px);
  }
  :global(.subheading a) {
    color: var(--dark);
    text-decoration: none;
  }
  :global(.subheading a:hover) {
    text-decoration: underline;
  }
  @media (min-width: 768px) { 
    .subheading {
      font-size: 16px;
      max-width: unset;
      width: var(--desktopwidth);
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>