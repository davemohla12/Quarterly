<script>
  import { payment } from '$src/data/payment.svelte'
  import { formatCurrency } from '$src/utilities/utilities'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { federalRules } from '$src/rules/federal'
  import { stateRules } from '$src/rules/state'
  import { convertStateToAllUpperCase } from '$src/utilities/utilities'
  import { fade } from 'svelte/transition'
  import dayjs from 'dayjs'
  import { global } from '$src/data/global.svelte'
  import { safePostHog } from '$src/utilities/posthog'

  let props = $props()
  let federalSingleAmount = $derived(props.federalSingleAmount || 0)
  let currentState = $derived(props.currentState || '')
  let stateSingleAmount = $derived(props.stateSingleAmount || 0)
  let isFederalPaid = $derived(props.isFederalPaid || false)
  let isStatePaid = $derived(props.isStatePaid || false)

  const handleFederalClick = () => {
    safePostHog.capture('pay_button_clicked', {
        payee: 'federal',
        payPreference: 'single'
      })
    window.open(federalRules.payLink, '_blank')
  }

  const handleStateClick = () => {
    safePostHog.capture('pay_button_clicked', {
        payee: 'state',
        payPreference: 'single'
      })
    window.open(stateRules[currentState].payLink, '_blank')
  }

  const handleMarkPaidFederal = async () => {
    safePostHog.capture('mark_paid_button_clicked', {
        payee: 'federal',
        payPreference: 'single'
      })
    isFederalPaid = true
    await payment.setValue('singleFederalMarkPaid', true)
    global.singleFederalPaidDate = dayjs().toISOString()
    await payment.setValue('singleFederalPaidDate', global.singleFederalPaidDate)
  }

  const handleMarkPaidState = async () => {
    safePostHog.capture('mark_paid_button_clicked', {
        payee: 'state',
        payPreference: 'single'
      })
    isStatePaid = true  
    await payment.setValue('singleStateMarkPaid', true) 
    global.singleStatePaidDate = dayjs().toISOString()
    await payment.setValue('singleStatePaidDate', global.singleStatePaidDate)
  }

  const handleMarkNotPaidFederal = async () => {
    isFederalPaid = false
    await payment.setValue('singleFederalMarkPaid', false)
    global.singleFederalPaidDate = null
    await payment.setValue('singleFederalPaidDate', global.singleFederalPaidDate)
  }

  const handleMarkNotPaidState = async () => {
    isStatePaid = false
    await payment.setValue('singleStateMarkPaid', false)
    global.singleStatePaidDate = null
    await payment.setValue('singleStatePaidDate', global.singleStatePaidDate)
  }   

</script>

<div class="container">
  <div class="title">Pay remaining amount</div>
  <div class="header">FEDERAL</div>
  {#if federalSingleAmount > 0}
    {#if !isFederalPaid}
      <div in:fade={{ duration: 200 }} >
        <div class="description">Pay {formatCurrency(federalSingleAmount)} to cover the rest of this year</div>
        <div class="buttons">
          <Clickable onclick={handleMarkPaidFederal}> 
            <div class="secondbutton">MARK PAID</div>
          </Clickable>
          <Clickable onclick={handleFederalClick}>
            <div class="primarybutton">PAY</div>
          </Clickable>
        </div>
      </div>
      {:else}
      <div in:fade={{ duration: 200 }} >
        <div class="completedcontainer">
          <img class="greencheck" src="/images/greencheck.png"  alt="Completed" />
          <div class="completedtext">Completed payment of {formatCurrency(federalSingleAmount)}</div>
        </div>
        <Clickable onclick={handleMarkNotPaidFederal}>
          <div class="notpaid">MARK NOT PAID</div>
        </Clickable>
      </div>
      {/if}
  {:else}
    <div class="description">No federal payment is needed this year</div>
    <div class="spacer"></div>
  {/if} 
    <div class="header">{convertStateToAllUpperCase(currentState)}</div>
    {#if stateSingleAmount > 0}
      {#if !isStatePaid}
        <div in:fade={{ duration: 200 }} >
          <div class="description">Pay {formatCurrency(stateSingleAmount)} to cover the rest of this year</div>
          <div class="buttons">
          <Clickable onclick={handleMarkPaidState}>
            <div class="secondbutton">MARK PAID</div>
          </Clickable>
          <Clickable onclick={handleStateClick}>
            <div class="primarybutton">PAY</div>
          </Clickable>
          </div>
        </div>
      {:else}
        <div in:fade={{ duration: 200 }} >
          <div class="completedcontainer">
            <img class="greencheck" src="/images/greencheck.png"  alt="Completed" />
            <div class="completedtext">Completed payment of {formatCurrency(stateSingleAmount)}</div>
          </div>
          <Clickable onclick={handleMarkNotPaidState}>
            <div class="notpaid">MARK NOT PAID</div>
          </Clickable>
        </div>
      {/if}
    {:else}
      <div class="description">No state payment is required this year</div>
      <div class="spacer"></div>
    {/if}
</div>

<style>
  .container {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 7px;
    text-align: center;
  }
  .header {
    font-size: 17px;
    font-weight: var(--bold);
    text-align: center;
    margin-top: 20px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .secondbutton {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: var(--medium);
    color: var(--green);
    background-color: var(--white);
    border: 1px solid var(--green);
    border-radius: 5px;
    min-width: 120px;
    padding-left: 15px;
    padding-right: 15px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 15px;
  }
  .primarybutton {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: var(--bold);
    color: var(--white);
    background-color: var(--green);
    border-radius: 5px;
    min-width: 120px;
    padding-left: 15px;
    padding-right: 15px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .completedcontainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .greencheck { 
    width: 15px;
    height: 11px;
    margin-right: 10px;
  }
  .notpaid {
    margin-top: 15px;
    color: var(--gray4);
    font-size: 16px;
    margin-bottom: 10px;
  }
  .spacer {
    height: 20px;
  }
  .description {
    text-align: center;
    margin-top: 8px;
  }
  @media (min-width: 768px) {
    .container {
      width: 500px;
    }
    .title {
      font-size: 34px;
    }
  }
</style>