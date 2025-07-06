<script>
  import { formatCurrency } from "$src/utilities/utilities"
  import { convertStateToAllUpperCase } from "$src/utilities/utilities"
  import dayjs from 'dayjs'
  import flatpickr from 'flatpickr'
  import 'flatpickr/dist/flatpickr.min.css'
  import { onMount } from 'svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { payment } from '$src/data/payment.svelte'

  let props = $props()
  let federalDue = $derived(props.federalDue || 0)
  let federalPaid = $derived(props.federalPaid || 0)
  let federalRemaining = $derived(props.federalRemaining || 0)
  let stateSupported = $derived(props.stateSupported || false)
  let currentState = $derived(props.currentState || '')
  let stateDue = $derived(props.stateDue || 0)
  let statePaid = $derived(props.statePaid || 0)
  let stateRemaining = $derived(props.stateRemaining || 0)

  let showPaidDates = $derived(props.showPaidDates)
  let singleFederalPaidDate = $derived(props.singleFederalPaidDate || '')
  let singleStatePaidDate = $derived(props.singleStatePaidDate || '')

  let hideMoreMenu = $derived(props.hideMoreMenu || false)

  let onFederalPaidDateChange = $derived(props.onFederalPaidDateChange || (() => {}))
  let onStatePaidDateChange = $derived(props.onStatePaidDateChange || (() => {}))

  let onShowPaidDatesChange = $derived(props.onShowPaidDatesChange || (() => {}))

  let federalDateElement = $state(null)
  let stateDateElement = $state(null)
  let federalDateDialog
  let stateDateDialog

  let showMoreDialog = $state(false)

  onMount(async () => {
    federalDateDialog = flatpickr(federalDateElement, {
      defaultDate: singleFederalPaidDate,
      clickOpens: false, 
      onChange: ([date]) => {
        onFederalPaidDateChange(dayjs(date).format('YYYY-MM-DD'))
      },
    })
    if (await payment.getValue('stateSupported')) { 
      stateDateDialog = flatpickr(stateDateElement, {
        defaultDate: singleStatePaidDate,
        clickOpens: false, 
        onChange: ([date]) => {
          onStatePaidDateChange(dayjs(date).format('YYYY-MM-DD'))
        },
      })
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })    

  const handleClickOutside = (event) => {
    if (!event.target.closest('.moredialog') && !event.target.closest('.more')) {
      showMoreDialog = false
    }
  }

  const openFederalDialog = () => {
    federalDateDialog?.open()
  }

  const openStateDialog = () => {
    stateDateDialog?.open()
  }

  const handleMoreClick = () => {
    showMoreDialog = true
  }

  const handlePaidDatesToggle = (event) => {
    event.stopPropagation()
    onShowPaidDatesChange()
  }

</script>

<div class="container" class:containermargin={!showPaidDates}>
  <div class="header">
    <div class="lefttitle"></div>
    <div class="centertitle">FEDERAL</div>
    {#if stateSupported}
      <div class="centertitle">{convertStateToAllUpperCase(currentState)}</div>
    {/if}
    {#if !hideMoreMenu}
      <Clickable onclick={handleMoreClick}>
        <img class="more" src="/images/more.png" alt="More" />
      </Clickable>
    {/if}
   {#if showMoreDialog}
    <div class="moredialog">
      <div class="moretext">Show paid dates</div>
      {#if showPaidDates} 
        <Clickable onclick={handlePaidDatesToggle}>
          <img class="checked" src="/images/checkboxchecked.png" alt="Checked" />
        </Clickable>
      {:else}
        <Clickable onclick={handlePaidDatesToggle}>
          <img class="unchecked" src="/images/checkboxunchecked.png" alt="Unchecked" />
        </Clickable>
      {/if}
    </div>
   {/if}
  </div>
  <div class="row">
    <div class="due">Due</div>
    <div class="payment">
      <div class="value">{formatCurrency(federalDue)}</div>
    </div>
    {#if stateSupported}
      <div class="payment">
        <div class="value">{formatCurrency(stateDue)}</div>
      </div>
    {/if}
  </div>
  <div class="row">
    <div class="due">Paid</div>
    <div class="payment">
      <div class="value">{formatCurrency(federalPaid)}</div>  
    </div>
    {#if stateSupported}
      <div class="payment">
        <div class="value">{formatCurrency(statePaid)}</div>    
      </div>
    {/if}
  </div>  
  <div class="divider" class:narrow={!stateSupported}></div>
  <div class="row">
    <div class="due">Remaining</div>
    <div class="payment">
      <div class="value">{formatCurrency(federalRemaining)}</div>
      {#if showPaidDates}
        {#if singleFederalPaidDate}
          <Clickable onclick={openFederalDialog}>
            <div class="paid">Paid on {dayjs(singleFederalPaidDate).format('M-D-YY')}</div>
          </Clickable>
        {/if}
      {/if}
      <input class="federaldialog" bind:this={federalDateElement} />
      </div>
    {#if stateSupported}
      <div class="payment">
        <div class="value">{formatCurrency(stateRemaining)}</div>
        {#if showPaidDates}
          {#if singleStatePaidDate}
            <Clickable onclick={openStateDialog}>
              <div class="paid">Paid on {dayjs(singleStatePaidDate).format('M-D-YY')}</div>
            </Clickable>
          {/if}
        {/if} 
        <input class="statedialog" bind:this={stateDateElement} />
      </div>
    {/if}
  </div>  
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    margin-top: 20px;
  }
  .containermargin {
    margin-bottom: -10px;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: var(--bold);
    margin-bottom: 18px;
    position: relative;
  }
  .row {
    display: flex;
  }
  .lefttitle {
    width: 80px;
    text-align: center;
  }
  .centertitle {
    width: 120px;
    text-align: center;
  }
  .more {
    position: absolute;
    width: 4px;
    height: 16px;
    right: 0px;
    padding: 10px;
    top: -70px;
  }
  .moredialog {
    position: absolute;
    border: 0;
    background-color: var(--dark);
    display: flex;
    padding: 15px 20px;
    top: -35px;
    right: 0px;
    z-index: 1000;
  }
  .moretext {
    color: var(--white);
    font-weight: var(--regular);
    margin-right: 20px;
    margin-top: 2px;
  }
  .unchecked {
    width: 26px;
    height: 26px;
  }
  .checked {
    width: 26px;
    height: 26px;
  }
  .due {
    width: 80px;
    height: 50px;
    font-size: 17px
  }
  .payment {
    width: 120px;
    text-align: center;
    position: relative;
  }
  .value {
    font-size: 17px;
  }
  .paid {
    font-size: 12px;
    font-weight: var(--regular);
    color: var(--gray4);
    margin-top: 5px;
  }
  .federaldialog {
    position: absolute;
    visibility: hidden;
    left: -80px;
    margin-top: -15px;
  }
  .statedialog {
    position: absolute;
    visibility: hidden;
    left: -80px;
    margin-top: -15px;
  }
  .divider {
    margin-left: 100px;
    width: 200px;
    height: 1px;
    background-color: var(--gray4);
    margin-top: -15px;
    margin-bottom: 15px;
  }
  .narrow {
    width: 100px;
  }
  @media (min-width: 768px) { 
    .lefttitle {
      width: 80px;
    }
    .centertitle {
      width: 150px;
    }
    .more {
      right: -55px;
      top: auto;
    }
    .moredialog {
      top: 30px;
      right: -50px;
    }
    .due {
      height: 50px;
    }
    .payment {
      width: 150px;
      height: 50px;
      text-align: center;
    }
    .divider {
      width: 300px;
    }
  }

</style>
