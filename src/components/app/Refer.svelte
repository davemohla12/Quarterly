<script>
    import Clickable from '$src/components/app/Clickable.svelte'
    import { referralAmount } from '$src/settings/settings'

    let props = $props()
    let referralCode = $derived(props.referralCode)
    let credits = $derived(props.credits || 0)
    let copied = $state(false)

    const handleCopy = () => {
    navigator.clipboard.writeText(`https://zenguider.com/?refer=${referralCode}`)
    copied = true
    setTimeout(() => {
      copied = false
    }, 2000)
  }
</script>

<div class="container">
  <img src="/images/refer.png" class="refer" alt="Refer a friend"/>
  <div class="text">For every user that signs up, you get ${referralAmount} in credit to use for the next tax year</div>
  <div class="linkcontainer">
    <div class="linktext">Share this link:</div>
    {#if !copied}
      <Clickable onclick={handleCopy}>
        <div class="copycontainer">
          <div class="link">https://zenguider.com/?refer={referralCode}</div>
          <div class="iconcontainer">
            <img src="/images/copy.png" class="copy" alt="Copy"/>
          </div>
        </div>
      </Clickable>
    {:else}
      <div class="copycontainer">
        <div class="link">https://zenguider.com/?refer={referralCode}</div>
        <div class="iconcontainer">
          <img src="/images/copied.png" class="copied" alt="Copied"/>
        </div>
      </div>
    {/if}
  </div>
  <div class="creditstext">Your credits:</div>
  <div class="credits">{credits}</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .refer {
    width: 219px;
    height: 242px;
  }
  .text {
    margin-top: 20px;
    text-align: center;
    width: 275px;
  }
  .linkcontainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid var(--gray3);
  }
  .copycontainer {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .link {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--normal);
    color: var(--dark);
  }
  .iconcontainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    width: 16px;
    height: 15px;
  }
  .copy {
    margin-left: 7px;
    width: 12.5px;
    height: 15px;
  }
  .copied {
    margin-left: 7px;
    width: 16px;
    height: 12px;
  }
  .creditstext {
    margin-top: 20px;
  }
  .credits {
    margin-bottom: 30px;
  }
  @media (min-width: 768px) {
    .container {
      margin-top: 30px;
    }
  }
</style>