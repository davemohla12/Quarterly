<script>
  import { price } from '$src/settings/settings'
</script>

<div class="container">
  <div class="heading">
     Simple pricing
  </div>
  <div class="subheading">
    A one-time price and no hidden fees
  </div>
  <div class="price">${price}</div>
  <div class="subprice">for full tax year</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--white);
  }
  .heading {
    margin-top: 40px;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    text-align: center;
    width: 400px;
  }
  .subheading {
    margin-top: 15px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: var(--regular);
    text-align: center;
    width: 220px;
  }
  .price {
    font-family: 'Lato', sans-serif;
    font-size: 80px;
    font-weight: var(--regular);
    text-align: center;
    margin-top: 20px;
  }
  .subprice {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: var(--regular);
    text-align: center;
    margin-top: 10px;
    margin-bottom: 50px;
  }
  @media (min-width: 768px) {
    .heading {
      font-size: 34px;
      width: 500px;
    }
    .subheading {
      margin-top: 20px;
      font-size: 16px;
      width: 250px;
    }
    .price {
      font-size: 108px;
    }
    .subprice {
      font-size: 22px;
    }
  }
  
</style>