<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { store } from '$src/stores/store.svelte'

  let props = $props()
  let buttons = props.buttons
  let onselect = props.onselect
  let selectedRadioButton = $state(null)


  const handleClick = (button) => {
    selectedRadioButton = button
    onselect(button)
    store.makeButtonActive = true
  }

</script>

<div class="radiobuttons">
  {#each buttons as button}
  <Clickable onclick={() => handleClick(button)} >
    <div class="radiocontainer">
      {#if selectedRadioButton === button}
        <img class="radiobutton" src="/images/radiochecked.png" alt="Radio button" />
      {:else}
        <img class="radiobutton" src="/images/radiounchecked.png" alt="Radio button" />
      {/if}
      <div class="radiotext">{button}</div>
    </div>
  </Clickable>
  {/each}
</div>

<style>
  .radiobuttons {
    margin-top: 20px;
  }
  .radiocontainer {
    display: flex;
    align-items: center;
    background-color: var(--gray1);
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    max-width: 320px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }
  .radiobutton {
    width: 32px;
    height: 32px;
    margin-left: 20px;
  }
  .radiotext {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
    margin-left: 20px;
  }
  @media (min-width: 768px) { 
    .radiobuttons {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .radiocontainer {
      max-width: unset;
      width: 400px;
    }
  }
</style>