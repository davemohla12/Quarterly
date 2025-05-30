<script>
  let props = $props()
  let text = $derived(props.text)
  let mobilewidth = props.mobilewidth || '400px'
  let desktopwidth = props.desktopwidth || '600px'
</script>

<div class="note" style="--mobilewidth: {mobilewidth}; --desktopwidth: {desktopwidth}">
  {@html text}
</div>

<style>
  .note {
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
    background-color: var(--gray1);
    border-radius: 5px;
    padding: 20px;
  }
  @media (min-width: 768px) { 
    .note {
      font-size: 16px;
      max-width: unset;
      width: var(--desktopwidth);
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>