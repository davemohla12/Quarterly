<script>
  import Clickable from '$src/components/app/Clickable.svelte'

  const handleSeeClick = () => {
    window.open('/example', '_blank')
  }
</script>

<div class="container">
  <div class="row">
    <img class="check" src="images/check.png" alt="Checkmark" />
    <div class="text">Avoid costly IRS penalties</div>
  </div>
  <div class="row">
    <img class="check" src="images/check.png" alt="Checkmark" />
    <div class="text">Receive payment reminders</div>
  </div>
  <div class="row">
    <img class="check" src="images/check.png" alt="Checkmark" />
    <div class="text">Pay once — no subscription</div>
  </div>
  <div class="row">
    <img class="check" src="images/check.png" alt="Checkmark" />
    <div class="text">60 day money-back guarantee</div>
  </div>
  <Clickable onclick={handleSeeClick}>
    <div class="see">
      <div class="seetext">See what you'll get</div>
      <img class="newtab" src="images/newtab.png" alt="New Tab" />
    </div>
</Clickable>
</div>

<style>
  .container {
    margin-top: 25px;
    margin-bottom: 27px;
    margin-left: auto;
    margin-right: auto;
    max-width: 400px;
    transform: translateX(85px);
  }
  .row {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .check {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .text { 
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
    color: var(--dark);
  }
  .see {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    width: 250px;
  }
  .seetext {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
    color: var(--dark);
  }
  .seetext:hover {
    text-decoration: underline;
  }
  .newtab {
    width: 11px;
    height: 11px;
    margin-left: 6px;
    margin-bottom: 6px;
  }
</style>
