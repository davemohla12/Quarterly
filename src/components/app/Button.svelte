<script>
  import { global } from '$src/data/global.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'

  let props = $props()
  let text = $derived(props.text)
  let onclick = $derived(props.onclick)
  let dark = $derived(props.dark || false)
  
  let enabled = $state()
  let showSpinner = $state(false)

  $effect(() => {
    if (global.makeButtonActive) {
      enabled = true
    }
    else {
      enabled = false
    }
  })

  const handleClick = () => {
    if (enabled) {
      showSpinner = true
      onclick()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (enabled) {
        handleClick()
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />


{#if showSpinner }
  <div class="button disabled spinner" class:dark={dark}>
    <div class="circle"></div>
  </div>
{:else}
  <Clickable onclick={handleClick} disabled={!enabled}>
    <div class="button enabled" class:enabled={enabled} class:dark={dark}>  
      {text}
    </div>
  </Clickable>
{/if}

<style>
  .button {
    margin-top: 22px;
    margin-left: auto;
    margin-right: auto;
    max-width: 320px;
    background-color: var(--gray3);
    color: var(--white);
    border-radius: 5px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lato', sans-serif;
    font-size: 16px;  
    font-weight: var(--bold);
    cursor: default;
  }
  .enabled {
    background-color: var(--green);
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.15);
    cursor: pointer;
  }
  .dark {
    background-color: var(--dark);
    color: var(--white);
  }
  .spinner {
    background-color: var(--gray4);
  }
  .circle {
    width: 24px;
    height: 24px;
    border: 2px solid var(--white);
    border-top-color: transparent;
    border-radius: 50%;
    animation: circle 0.8s linear infinite;
  }
  @keyframes circle {
    to {
      transform: rotate(360deg);
    }
  }
  @media (min-width: 768px) { 
    .button {
      margin-left: auto;
      margin-right: auto;
      max-width: 200px;
    }
  }
</style>
