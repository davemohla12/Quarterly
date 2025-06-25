<script>  
  import { global } from '$src/data/global.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  onMount(() => {
    setTimeout(() => {
      global.showConfirmationBanner = false
    }, 2000)
  })

  const handleClose = () => {
    global.showConfirmationBanner = false
  }

</script>

<div class="container" transition:fade={{ duration: 300 }}>
  <div class="banner">We'll get back to you soon</div>
  <Clickable onclick={handleClose}> 
    <img class="close" src="/images/close.png" alt="Close" />
  </Clickable>
</div>

<style>
 .container {
    width: 100%;
    height: 50px;
    background-color: var(--dark);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 5px;
    margin-bottom: -10px;
  }
  .banner {
    color: var(--white);
  }
  .close {
    position: absolute;
    width: 14px;
    height: 14px;
    right: 15px;
  }
@media (min-width: 768px) {
  .container {
    margin-top: 20px;
    margin-bottom: -25px;
  }
}
</style>