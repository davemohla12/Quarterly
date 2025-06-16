<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { store } from '$src/stores/store.svelte'
  import { onMount } from 'svelte'

  let props = $props()
  let buttons = props.buttons
  let selected = $derived(props.selected || null)
  let helptext = props.helptext || {}
  let onselect = props.onselect
  let selectedRadioButton = $state(null)
  let showHelp = $state(false)

  $effect(() => {
    if (selected) { 
      selectedRadioButton = selected
    }
  })

  const handleClick = (button) => {
    selectedRadioButton = button
    onselect(button)
  }

  const handleHelp = (button) => {
    event.stopPropagation()
    showHelp = !showHelp
  }

  const handleClickOutside = (event) => {
    if (showHelp) {
      if (!event.target.closest('.helptext')) {
        showHelp = false
      }
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

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
      {#if helptext.radioButton === button}
        <Clickable onclick={() => handleHelp(button)}>
          <img class="help" src="/images/help.png" alt="Help" />
        </Clickable>
        {#if showHelp}
          <div class="helptext">{helptext.text}</div>
        {/if}
      {/if}
   
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
    position: relative;
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
  .help {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  .helptext {
    position: absolute;
    left: 0px;
    top: 65px;
    color: var(--white);
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: var(--regular);
    background: var(--dark);
    z-index: 100;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--gray2);
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