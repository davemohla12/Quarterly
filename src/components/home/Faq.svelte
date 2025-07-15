<script>
  import { price } from '$src/settings/settings'
</script>

<div class="content">
  <div class="header">Frequently Asked Questions</div>
  <div class="question"><span class="number">1.</span>What is Zenguider?</div>
  <div class="answer">
    Zenguider is a web app that helps you calculate and pay your federal and state quarterly income tax payments. We break down exactly what you need to pay each quarter and remind you before each due date so you never miss a payment.
  </div>
  <div class="question"><span class="number">2.</span>Why should I use it?</div>
  <div class="answer">
    If you're self-employed, you likely need to pay quarterly taxes. Zenguider calculates your quarterly payments, provides links to pay, and reminds you when payments are due. We save you time, help you avoid IRS penalties, and give you peace of mind since you know exactly what to pay and when.
  </div>
  <div class="question"><span class="number">3.</span>How does it work?</div>
  <div class="answer">
    You'll answer a few short questions about your income and state. We then calculate your payments for the full tax year, break them down by quarter or give you a single amount to pay if you'd prefer to pay it all at once, and send you email reminders before each deadline.
  </div>
  <div class="question"><span class="number">4.</span>How does it calculate payments?</div>
  <div class="answer">
    We use the latest federal and state tax rules to determine your quarterly payments. We select the correct ones based on your income and filing status, and follow IRS “safe harbor” guidelines to help you avoid penalties while keeping your payments as low as possible.
  </div>
  <div class="question"><span class="number">5.</span>What if I missed a past payment?</div>
  <div class="answer">
    No problem. We automatically adjust your future payments to make up for it. The most important thing is to start now — paying sooner reduces any potential penalties.
  </div>
  <div class="question"><span class="number">6.</span>How much does it cost?</div>
  <div class="answer">
    Zenguider is ${price} for the full tax year. You get personalized quarterly payment estimates for both your federal and state taxes and helpful reminders, all for a single flat fee.
  </div>
  <div class="question"><span class="number">7.</span>How long does it take to use?</div>
  <div class="answer">
    Most users get their quarterly payments in under 10 minutes from start to finish. If you have your documents ready, you’ll be done even faster.
  </div>
  <div class="question"><span class="number">8.</span>How do I get started?</div>
  <div class="answer">
    Just click "Get Started" on the homepage and answer a few questions. We'll walk you through everything step-by-step. We're fast, easy, and ensure you are on top of your taxes.
  </div>
  <div class="question"><span class="number">9.</span>What if I'm not satisfied?</div>
  <div class="answer">
    If you are not 100% satisfied with our service, just reach out to us at support@zenguider.com within 60 days of purchase and we'll gladly refund the ${price} fee.  
  </div>
  <div class="spacer"></div>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 100px;
    margin-left: 20px;
    margin-right: 20px;
    font-family: 'Lato', sans-serif;
  }
  .header {
    font-weight: section;
    align-self: center;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    margin-bottom: 5px;
  }
  .question {
    font-weight: var(--bold);
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .number {
    margin-right: 7px;
  }
  .spacer {
    height: 50px;
  }
  @media (min-width: 768px) {
    .content {
      width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>