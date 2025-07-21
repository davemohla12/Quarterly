<script>
  import Clickable from './Clickable.svelte'

  let props = $props()  
  let rating = $derived(props.rating || null)
  let onratingclick = $derived(props.onratingclick || (() => {}))

  const handleBadClick = () => {
    onratingclick('bad')
  }
  const handleGoodClick = () => {
    onratingclick('good')
  }
</script>

<div class="container">
  <Clickable onclick={handleBadClick}>
    <div class="ratingcontainer">
      {#if rating === 'bad'}
        <img class="rating" src="/images/sadgreen.png" alt="Bad" />
      {:else}
        <img class="rating" src="/images/sadgray.png" alt="Bad" />
      {/if}
    </div>
  </Clickable>
  <Clickable onclick={handleGoodClick}>
    <div class="ratingcontainer">
      {#if rating === 'good'}
        <img class="rating" src="/images/happygreen.png" alt="Good" />
      {:else}
        <img class="rating" src="/images/happygray.png" alt="Good" />
      {/if}
    </div>
  </Clickable>
</div>

<style>
  .container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ratingcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 125px;
    height: 100px;
    background-color: var(--gray1);
    border-radius: 5px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .rating {
    width: 47px;
    height: 47px;
  }
</style>