<script>
  import { totalScreens } from '$src/settings/settings'

  let props = $props()
  let screen = $derived(props.screen || null)

  let screenPercent = $derived(screen / totalScreens * 100)
  
</script>

<div class="container">
  <div class="line"></div>
  <img class="avatar" src="/images/avatar.png" alt="Avatar" />
</div>
{#if screen != null}
  <div class="progresscontainer"> 
    <div class="progressbar" style="width: {screenPercent.toFixed(2)}%"></div>
  </div>
{/if}

<style>
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-top: 20px;
  }
  .line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-bottom: 1px solid var(--gray2);
    z-index: 1;
    transform: translateY(-50%);
  }
  .avatar {
    position: relative;
    z-index: 2;
    width: 55px;
    height: 55px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0;
  }
  .progresscontainer {
    width: 300px;
    height: 5px;
    background-color: var(--gray2);
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .progressbar {
    height: 5px;
    background-color: var(--green);
  }
  @media (min-width: 768px) { 
    .container {
      margin-top: 0px;
    }
    .avatar {
      width: 81px;
      height: 81px;
    }
    .progresscontainer {
      width: 400px;
      height: 6px;
      margin-top: 40px;
      margin-bottom: -10px;
    }
    .progressbar {
      height: 6px;
    }
  }
</style>