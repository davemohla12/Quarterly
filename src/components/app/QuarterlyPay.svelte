<script>
  import { payment } from '$src/data/payment.svelte'
  import { formatCurrency } from '$src/utilities/utilities'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { federalRules } from '$src/rules/federal'
  import { stateRules } from '$src/rules/state'
  import { convertStateToAllUpperCase, convertStateToUpperCase } from '$src/utilities/utilities'
  import { fade } from 'svelte/transition'
  import { currentTaxQuarter } from '$src/settings/settings'
  import dayjs from 'dayjs'
  import { global } from '$src/data/global.svelte'
  import { safePostHog } from '$src/utilities/posthog'
  import { onMount } from 'svelte'

  let props = $props()
  let federalQuarterAmount = $derived(props.federalQuarterAmount || 0)
  let currentState = $derived(props.currentState || '')
  let stateQuarterAmount = $derived(props.stateQuarterAmount || 0)
  let otherStatesToPay = $derived(props.otherStatesToPay || [])

  let quarterName = $derived(props.quarterName || '')
  let isFederalPaid = $derived(props.isFederalPaid || false)
  let isStatePaid = $derived(props.isStatePaid || false)
  let showHelp = $state([])
  let isOtherStatePaid = $state([])

  onMount(() => {
    isOtherStatePaid = otherStatesToPay?.map(state => state.markPaid) || []
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  const handleClickOutside = (event) => {
    if (!event.target.closest('.helpcontainer') && !event.target.closest('.help')) {
      showHelp = []
    }
  }

  const handleFederalClick = () => {
    safePostHog.capture('pay_button_clicked', {
        payee: 'federal',
        payPreference: 'quarterly'
      })
    window.open(federalRules.payLink, '_blank')
  }

  const handleStateClick = () => {
    safePostHog.capture('pay_button_clicked', {
        payee: 'state',
        payPreference: 'quarterly'
      })
    window.open(stateRules[currentState].payLink, '_blank')
  }

  const handleOtherStateClick = (state) => {
    safePostHog.capture('pay_button_clicked', {
        payee: 'state',
        payPreference: 'quarterly',
        otherState: state
      })
    window.open(stateRules[state].payLink, '_blank')
  }

  const handleMarkPaidFederal = async () => {
    safePostHog.capture('mark_paid_button_clicked', {
        payee: 'federal',
        payPreference: 'quarterly'
      })  
    isFederalPaid = true
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1FederalMarkPaid', true)
      global.q1FederalPaidDate = dayjs().toISOString()
      await payment.setValue('q1FederalPaidDate', global.q1FederalPaidDate)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2FederalMarkPaid', true)
      global.q2FederalPaidDate = dayjs().toISOString()
      await payment.setValue('q2FederalPaidDate', global.q2FederalPaidDate)
    }
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3FederalMarkPaid', true)
      global.q3FederalPaidDate = dayjs().toISOString()
      await payment.setValue('q3FederalPaidDate', global.q3FederalPaidDate)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4FederalMarkPaid', true)
      global.q4FederalPaidDate = dayjs().toISOString()
      await payment.setValue('q4FederalPaidDate', global.q4FederalPaidDate)
    }
  }

  const handleMarkPaidState = async () => {
    safePostHog.capture('mark_paid_button_clicked', {
        payee: 'state',
        payPreference: 'quarterly'
      })
    isStatePaid = true
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1StateMarkPaid', true)   
      global.q1StatePaidDate = dayjs().toISOString()
      await payment.setValue('q1StatePaidDate', global.q1StatePaidDate)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2StateMarkPaid', true)
      global.q2StatePaidDate = dayjs().toISOString()
      await payment.setValue('q2StatePaidDate', global.q2StatePaidDate)
    }
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3StateMarkPaid', true)
      global.q3StatePaidDate = dayjs().toISOString()
      await payment.setValue('q3StatePaidDate', global.q3StatePaidDate)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4StateMarkPaid', true) 
      global.q4StatePaidDate = dayjs().toISOString()
      await payment.setValue('q4StatePaidDate', global.q4StatePaidDate)
    }
  }

  const handleMarkNotPaidFederal = async () => {
    isFederalPaid = false
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1FederalMarkPaid', false)
      global.q1FederalPaidDate = null
      await payment.setValue('q1FederalPaidDate', global.q1FederalPaidDate)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2FederalMarkPaid', false)
      global.q2FederalPaidDate = null
      await payment.setValue('q2FederalPaidDate', global.q2FederalPaidDate)
    } 
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3FederalMarkPaid', false)    
      global.q3FederalPaidDate = null
      await payment.setValue('q3FederalPaidDate', global.q3FederalPaidDate)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4FederalMarkPaid', false)
      global.q4FederalPaidDate = null
      await payment.setValue('q4FederalPaidDate', global.q4FederalPaidDate)
    } 
  }

  const handleMarkNotPaidState = async () => {
    isStatePaid = false
    if (currentTaxQuarter == 'Q1') {
      await payment.setValue('q1StateMarkPaid', false)
      global.q1StatePaidDate = null
      await payment.setValue('q1StatePaidDate', global.q1StatePaidDate)
    }
    else if (currentTaxQuarter == 'Q2') {
      await payment.setValue('q2StateMarkPaid', false)
      global.q2StatePaidDate = null
      await payment.setValue('q2StatePaidDate', global.q2StatePaidDate)
    } 
    else if (currentTaxQuarter == 'Q3') {
      await payment.setValue('q3StateMarkPaid', false)    
      global.q3StatePaidDate = null
      await payment.setValue('q3StatePaidDate', global.q3StatePaidDate)
    }
    else if (currentTaxQuarter == 'Q4') {
      await payment.setValue('q4StateMarkPaid', false)
      global.q4StatePaidDate = null
      await payment.setValue('q4StatePaidDate', global.q4StatePaidDate)
    }
  }   

  const handleHelpClick = (index) => {
    showHelp[index] = true
  }

  const handleMarkPaidOtherState = async (index) => {
    isOtherStatePaid[index] = true
    let otherStates = await payment.getValue('otherStatesToPay')
    if (!Array.isArray(otherStates)) {
      otherStates = []
    }
    if (otherStates[index]) {
      otherStates[index].markPaid = true
      await payment.setValue('otherStatesToPay', otherStates)
    }
  }

  const handleMarkNotPaidOtherState = async (index) => {
    isOtherStatePaid[index] = false
    let otherStates = await payment.getValue('otherStatesToPay')
    if (!Array.isArray(otherStates)) {
      otherStates = []
    }
    if (otherStates[index]) {
      otherStates[index].markPaid = false
      await payment.setValue('otherStatesToPay', otherStates)
    }
  }


</script>

<div class="container">
  <div class="title">Pay your {quarterName} payment</div>
  <div class="header">FEDERAL</div>
  {#if federalQuarterAmount > 0}
    {#if !isFederalPaid}
      <div in:fade={{ duration: 200 }} >
        <div class="description">Pay {formatCurrency(federalQuarterAmount)} to cover this quarter</div>
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
          <div class="completedtext">Completed payment of {formatCurrency(federalQuarterAmount)}</div>
        </div>
        <Clickable onclick={handleMarkNotPaidFederal}>
          <div class="notpaid">MARK NOT PAID</div>
        </Clickable>
      </div>
      {/if}
  {:else}
    <div class="description">No federal payment is needed this quarter</div>
    <div class="spacer"></div>
  {/if} 
    <div class="header">{convertStateToAllUpperCase(currentState)}</div>
    {#if stateQuarterAmount > 0}
      {#if !isStatePaid}
        <div in:fade={{ duration: 200 }} >
          <div class="description">Pay {formatCurrency(stateQuarterAmount)} to cover this quarter</div>
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
            <div class="completedtext">Completed payment of {formatCurrency(stateQuarterAmount)}</div>
          </div>
          <Clickable onclick={handleMarkNotPaidState}>
            <div class="notpaid">MARK NOT PAID</div>
          </Clickable>
        </div>
      {/if}
    {:else}
      <div class="description">No state payment is required this quarter</div>
      <div class="spacer"></div>
    {/if}
    {#if otherStatesToPay?.length > 0}
    {#each otherStatesToPay || [] as state, index}
    <div class="header">{convertStateToAllUpperCase(state.state)}</div>
      {#if !isOtherStatePaid[index]}
          <div in:fade={{ duration: 200 }} >
            <div class="descriptioncontainer">
              <div class="description">Pay {formatCurrency(state.amount)} to finish your {convertStateToUpperCase(state.state)} payments</div>
              <Clickable onclick={() => handleHelpClick(index)}>
                <img class="help" src="/images/help.png" alt="Help" />
              </Clickable>
              {#if showHelp[index]}
                <div class="helpcontainer">
                  <div class="helptext">You lived in {convertStateToUpperCase(state.state)} earlier this year and didn’t pay the full quarterly amounts so this finishes what you owe there</div>
                </div>
              {/if}
            </div>
            <div class="buttons">
            <Clickable onclick={() => handleMarkPaidOtherState(index)}>
              <div class="secondbutton">MARK PAID</div>
            </Clickable>
            <Clickable onclick={() => handleOtherStateClick(state.state)}>
              <div class="primarybutton">PAY</div>
            </Clickable>
            </div>
          </div>
        {:else}
          <div in:fade={{ duration: 200 }} >
            <div class="completedcontainer">
              <img class="greencheck" src="/images/greencheck.png"  alt="Completed" />
              <div class="completedtext">Completed payment of {formatCurrency(state.amount)}</div>
            </div>
            <Clickable onclick={() => handleMarkNotPaidOtherState(index)}>
              <div class="notpaid">MARK NOT PAID</div>
            </Clickable>
          </div>
      {/if}
    {/each}
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
  .descriptioncontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .description {
    text-align: center;
    margin-top: 8px;
  }
  .help {
    width: 16px;
    height: 16px;
    margin-left: 5px;
    margin-bottom: -7px;
  }
  .helpcontainer {
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    background-color: var(--dark);
    color: var(--white);
    padding: 10px 15px;
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