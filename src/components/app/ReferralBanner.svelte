<script>  
  import { global } from '$src/data/global.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { fade } from 'svelte/transition'

  let props = $props()
  let onclose = $derived(props.onclose)

  const handleClose = () => {
    onclose()
  }

</script>

<div class="container" transition:fade={{ duration: 300 }}>
  <div class="text">You can now refer a friend and you both get $5 if they sign up.<a href="/refer" class="learn">Learn more</a></div>
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
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .text {
    color: var(--white);
    text-align: center;
    padding-left: 40px;
    padding-right: 40px;
  }
  .close {
    position: absolute;
    width: 14px;
    height: 14px;
    right: 15px;
  }
  .learn {
    margin-left: 7px;
    color: var(--green);
    text-decoration: none;
  }
@media (min-width: 768px) {
  .container {
    margin-top: 20px;
    margin-bottom: -25px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
}
</style>