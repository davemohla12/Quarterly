<script>
  let props = $props()
  let text = $derived(props.text)
  let mobilewidth = props.mobilewidth || '400px'
  let desktopwidth = props.desktopwidth || '600px'
  let mobilelarge = props.mobilelarge || false
</script>

<div class="heading" class:mobilelarge={mobilelarge} style="--mobilewidth: {mobilewidth}; --desktopwidth: {desktopwidth}">
  {@html text}
</div>

<style>
  .heading {
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 20px;
    width: var(--mobilewidth);
    max-width: calc(100vw - 20px);
  }
  .mobilelarge {
    font-size: 26px;
  }
  @media (min-width: 768px) { 
    .heading {
      font-size: 34px;
      max-width: unset;
      width: var(--desktopwidth);
      margin-top: 40px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>