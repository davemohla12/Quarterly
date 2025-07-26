<script>
  import Clickable from '$src/components/app/Clickable.svelte'

  let props = $props()
  let onclick = props.onclick
  let showSpinner = $derived(props.showSpinner || false)

  const handleClick = () => {
    if (!showSpinner) {
      onclick()
    }
  }
</script>

<Clickable onclick={handleClick}>
  <div class="button" >
    {#if showSpinner}
      <div class="circle"></div>
    {:else}
      <img class="google" src="/images/google.png" alt="Google" />
      <div class="text">CONTINUE WITH GOOGLE</div>
    {/if}
  </div>
</Clickable>

<style>
  .button {
    margin-top: 20px;
    height: 56px;
    max-width: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--dark);
    color: var(--white);
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--bold);
    cursor: pointer;
  }
  .google {
    width: 24px;
    height: 25px;
    margin-right: 15px;
  }
  .text {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--bold);
    color: var(--white);
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
</style>