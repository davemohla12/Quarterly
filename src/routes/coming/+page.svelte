<script>
  import { showComingSoon } from '$src/settings/settings'
</script>

<div class="container">
  <img class="logo" src="/images/logo.png" alt="logo" />
  <div class="coming">Coming soon...</div>
</div>

<svelte:head>
  <title>Zenguider | Coming Soon</title>
  {#if showComingSoon}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
</svelte:head>


<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-top: -20px;
  }
  .logo { 
    width: 205px;
    height: 50px;
  }
  .coming {
    margin-top: 30px;
    font-size: 20px;
  }
  @media (min-width: 768px) { 
    .container {
      margin-top: -40px;
    }
    .logo { 
      width: 240px;
      height: 59px;
    }
    .coming {
      margin-top: 40px;
    }
  }

</style>