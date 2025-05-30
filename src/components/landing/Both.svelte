<div class="container">
  <div class="heading">
    Pay both federal and state 
  </div>
  <div class="subheading">
    Stay compliant with both - no extra apps or tools needed
  </div>
  <img class="both" src="images/federalstate.png" alt="Federal and State" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35px;
  }
  .heading {
    margin-top: 0px;
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
    width: 200px;
  }
  .both {
    width: 262px;
    height: 208px;
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
      width: 230px;
    }
    .both {
      width: 353px;
      height: 280px;
      margin-bottom: 50px;
    }
  }
</style>