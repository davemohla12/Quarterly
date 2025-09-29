<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { global } from '$src/data/global.svelte'
  import { referralAmount } from '$src/settings/settings'

  let props = $props()
  let ondismiss = $derived(props.ondismiss)
  global.makeButtonActive = true

</script>

<div class="dialog">
  <div class="header">Credits applied</div>
  <div class="text">We've applied ${referralAmount} in credits to your account</div>
  <div class="button">
    <Button text="OK" onclick={ondismiss} />
  </div>
  <Clickable onclick={ondismiss}>
    <img class="dismiss" src="/images/dismiss.png" alt="Dismiss" />
  </Clickable>
</div>

<style>
  .dialog {
    position: fixed;
    margin-top: -50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 40px);
    max-width: 575px;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .header {
    font-family: 'Merriweather', serif;
    font-size: 30px;
    margin-top: 40px;
  }
  .text {
    margin-top: 20px;
  }
  .button {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .dismiss {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  @media (min-width: 768px) {
    .header {
      font-size: 36px;
    }
  }
</style>