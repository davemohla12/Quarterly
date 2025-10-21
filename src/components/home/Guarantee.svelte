<div class="container" id="guarantee">
  <div class="heading">
    60 day guarantee
  </div>
  <div class="subheading">
    Get a full refund if you're not completely satisfied — no questions asked
  </div>
  <img class="guarantee" src="/images/guarantee.png" alt=" 60 day guarantee" loading="lazy" width="270" height="273" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--gray1);
    position: relative;
  }
  .container::before {
    content: '';
    display: block;
    position: absolute;
    top: -35px;
    left: 0;
    width: 100%;
    height: 35px;
    pointer-events: none;
  }
  .heading {
    margin-top: 35px;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    text-align: center;
    width: 400px;
  }
  .subheading {
    margin-top: 15px;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: var(--regular);
    text-align: center;
    width: 300px;
  }
  .guarantee {
    width: 238px;
    height: 242px;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 768px) {
    .container {
      margin-top: 50px;
    }
    .heading {
      font-size: 34px;
      width: 500px;
    }
    .subheading {
      margin-top: 20px;
      font-size: 16px;
      width: 300px;
    }
    .guarantee {
      width: 270px;
      height: 273px;
      margin-bottom: 50px;
    }
  }
</style>