<script>
  let props = $props()
  let text = props.text || ''
</script>

<div class="container">
  <div class="double-bounce">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  </div>
  <div class="text">{text}</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 300px);
  }
  .double-bounce {
    width: 70px;
    height: 70px;
    position: relative;
  }
  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--gray3);
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: double-bounce 2.5s infinite ease-in-out;
  }
  .double-bounce2 {
    animation-delay: -1s;
  }
  @keyframes double-bounce {
    0%, 100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
  .text {
    margin-top: 40px;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--bold);
    color: var(--gray4);
  }
</style>