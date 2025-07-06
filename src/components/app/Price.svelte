<script>
  import { price } from '$src/settings/settings'
</script>

<div class="container">
  <div class="price">$0</div>
  <div class="strikeprice">${price} for a full tax year</div>
</div>

<style>
  .container {
    margin-top: 20px;
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
  .strikeprice {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: var(--regular);
    color: var(--gray4);
    text-decoration: line-through;
  }
</style>