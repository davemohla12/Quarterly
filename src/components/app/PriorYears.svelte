<script>
  let props = $props()
  let years = $derived(props.years)

</script>

<div class="container">
  {#if years.length > 0}
    {#each years as year}
      <a href={`/year?year=${year}`} class="year">{year}</a>
    {/each}
  {:else}
    <div class="noyears">No prior years found</div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  a {
    text-decoration: none;
    color: var(--dark);
  }
  .year {
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    margin-bottom: 20px;
  }
  .year:hover {
    text-decoration: underline;
  }
  .noyears {
    font-size: 18px;
  }
</style>