<script>
  import { formatCurrency } from "$src/utilities/utilities"
  import SecondButton from "$src/components/app/SecondButton.svelte"

  let props = $props()
  let userValues = $derived(props.userValues || {})
  let onReason = $derived(props.onReason || (() => {}))
  let onRefund = $derived(props.onRefund || (() => {}))
  let refundProcessing = $derived(props.refundProcessing || false)
  let showConfirmation = $derived(props.showConfirmation || false)
  let refundAmount = $derived(props.refundAmount || 0)
  let refundError = $derived(props.refundError || null)

  const handleIssueRefund = () => {
    onRefund()
  }

  const handleInput = (event) => {
    onReason(event.target.innerHTML)
  }
  
</script>

<div class="container">
  <div class="section">USER</div>
  <div class="field">Latest Tax Year Paid</div>
  <div class="value">{userValues.latestTaxYearPaid || 'blank'}</div>
  <div class="field">Last Payment Amount</div>
  <div class="value">{formatCurrency(userValues.lastPaymentAmount) || 'blank'}</div>
  <div class="field">Tax Years Paid</div>
  <div class="value">{userValues.taxYearsPaid?.join(', ') || 'blank'}</div>
  <div class="field">Refunded Tax Years</div>
  <div class="value">{userValues.refundedTaxYears?.join(', ') || 'blank'}</div>
  <div class="field">Last Stripe Payment ID</div>
  <div class="value">{userValues.lastPaymentId || 'blank'}</div>
  <div class="field">Stripe Customer ID</div>
  <div class="value">{userValues.stripeCustomerId || 'blank'}</div>
  <div class="divider"></div>

  <div class="section">REFUND</div>
  {#if showConfirmation}
    <div class="confirmation">A refund of {formatCurrency(refundAmount)} has been issued</div>
  {:else if refundError}
    <div class="confirmation">{refundError}</div>
  {:else}
    <div class="field">Reason</div>
    <div class="reason" contenteditable="true" oninput={handleInput} data-placeholder="Enter an optional reason"></div>
    {#if refundProcessing}
      <SecondButton text="REFUND" makeButtonActive={false} showSpinner={true} />
    {:else}
      <SecondButton text="REFUND" onclick={handleIssueRefund} makeButtonActive={true} />
    {/if}
  {/if}

</div>

<style>
  .container {
    margin-bottom: 50px;
  }
  .section {
    margin-top: 15px;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    text-align: center;
    font-weight: var(--bold);
  }
  .field {
    margin-top: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    text-align: center;
    color: var(--gray4);
  }
  .value {
    margin-top: 2px;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    text-align: center;
  }
  .divider {
    width: 320px;
    margin-left: auto;
    margin-right: auto;
    height: 1px;
    background-color: var(--gray3);
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .reason {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
    width: 300px;
    height: 50px;
    border: 1px solid var(--gray2);
    padding: 15px;
    margin-bottom: 15px;
    outline: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
  }
  .reason:empty::before {
    content: attr(data-placeholder);
    color: var(--gray4);
    pointer-events: none;
  }
  .reason:focus:empty::before {
    content: attr(data-placeholder);
    color: var(--gray4);
    pointer-events: none;
  }
  .confirmation {
    margin-top: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    text-align: center;
  }
  @media (min-width: 768px) { 
  .divider {
    max-width: 400px;
  }
}
</style>