<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { fade } from 'svelte/transition'

  let props = $props()
  let smallFont = props.smallFont || false
  let explanation = $derived(props.explanation || '')
  let onCloseClick = props.onCloseClick || (() => {})
  let showHide = props.showHide !== undefined ? props.showHide : true

  const handleCloseClick = () => {
    onCloseClick()
  }
</script>

  <div class="explanation" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }} class:smallFont={smallFont}>
    {explanation}
  </div>
  {#if showHide}
    <Clickable onclick={handleCloseClick}>
      <div class="hide">HIDE</div>
    </Clickable>
  {:else}
    <div class="spacer"></div>
  {/if}


<style>
  .explanation {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 15px;
    white-space: pre-wrap;
  }
  .hide {
    margin-top: 15px;
    color: var(--gray4);
    font-size: 15px;
    margin-bottom: -5px;
  }
  .spacer {
    height: 40px;
  }
  .smallFont {
    font-size: 14px;
  }
  @media (min-width: 768px) {
    .explanation {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>