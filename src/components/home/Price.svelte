<script>
  import { price } from '$src/settings/settings'
</script>

<div class="container">
  <div class="heading">
    Free for a limited time
  </div>
  <div class="subheading">
    Participate in our beta and we'll waive our fee
  </div>
  <div class="price">$0</div>
  <div class="strikethrough">${price} per tax year</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--gray1);
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
    font-size: 90px;
    font-weight: var(--regular);
    text-align: center;
    margin-top: 20px;
  }
  .strikethrough {
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: var(--regular);
    text-decoration: line-through;
    color: var(--gray4);
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
      font-size: 120px;
    }
    .strikethrough {
      font-size: 30px;
      margin-bottom: 60px;
    }
  }
  
</style>