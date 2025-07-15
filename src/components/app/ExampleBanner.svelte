<script>
  let props = $props()
  let narrow = $derived(props.narrow || false)
</script>

<div class="container" class:narrow={narrow}>
  <div class="banner">This is an example. Your tax estimates will be based on your actual income and state.</div>
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
  .narrow {
    height: 30px;
  }
  .banner {
    color: var(--white);
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
  }
@media (min-width: 768px) {
  .container {
    margin-top: 20px;
    margin-bottom: -25px;
  }
}
</style>