<script>
  import { price } from '$src/settings/settings'
</script>

<div class="container">
  <div class="price">${price}</div>
  <div class="subprice">for full tax year</div>
</div>

<style>
  .container {
    margin-top: 8px;
    margin-bottom: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .price {
    font-family: 'Lato', sans-serif;
    font-size: 62px;
    font-weight: var(--regular);
    color: var(--dark);
  }
  .subprice {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: var(--regular);
  }
</style>