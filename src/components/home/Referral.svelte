<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { global } from '$src/data/global.svelte'

  let props = $props()
  let ondismiss = $derived(props.ondismiss)
  let buttonText = 'OK'
  global.makeButtonActive = true

</script>

<div class="dialog">
  <div class="header">You'll get $5 off</div>
  <img class="refer" src="/images/refer.png" alt="Referral" />
  <div class="text">You were referred by another user</div>
  <div class="subtext">Only valid for new users</div>
  <div class="button">
    <Button text={buttonText} onclick={ondismiss} />
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
    width: 575px;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .refer {
    width: 149px;
    height: 164px;
  }
  .header {
    font-family: 'Merriweather', serif;
    font-size: 36px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .text {
    margin-top: 20px;
  }
  .subtext {
    margin-top: 20px;
    margin-bottom: 0px;
  }
  .button {
    width: 100%;
    margin-bottom: 30px;
  }
  .dismiss {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 20px;
    right: 20px;

  }
</style>