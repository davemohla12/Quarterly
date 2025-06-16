<script>
  import { store } from '$src/stores/store.svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'

  let props = $props()
  let onBack = props.onBack || null

  const handleBack = () => {
    onBack()
  }
</script>

<Clickable onclick={handleBack}>
  <div class="later">BACK TO DASHBOARD</div>
</Clickable>


<style>
  .later {
    margin-top: 25px;
    margin-left: 20px;
    margin-right: 20px;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
    color: var(--gray4);
    cursor: pointer;
  }
  @media (min-width: 768px) { 
    .later {
      margin-left: auto;
      margin-right: auto;
      margin-top: 27px;
    }
  }
</style>
