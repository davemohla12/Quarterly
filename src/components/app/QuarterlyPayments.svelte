<script>
  import { formatCurrency } from "$src/utilities/utilities"
  import { convertStateToAllUpperCase, convertStateToUpperCase } from "$src/utilities/utilities"
  import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'
  import { currentTaxQuarter } from '$src/settings/settings'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  import DatePicker from '$src/components/app/DatePicker.svelte'

  let props = $props()
  let federalPayment1 = $derived(props.federalPayment1 || 0)
  let federalPayment2 = $derived(props.federalPayment2 || 0)
  let federalPayment3 = $derived(props.federalPayment3 || 0)
  let federalPayment4 = $derived(props.federalPayment4 || 0)
  let currentState = $derived(props.currentState || '')
  let statePayment1 = $derived(props.statePayment1 || 0)
  let statePayment2 = $derived(props.statePayment2 || 0)
  let statePayment3 = $derived(props.statePayment3 || 0)
  let statePayment4 = $derived(props.statePayment4 || 0)
  
  let showPaidDates = $derived(props.showPaidDates || false)
  let q1FederalPaidDate = $derived(props.q1FederalPaidDate || '')
  let q2FederalPaidDate = $derived(props.q2FederalPaidDate || '')
  let q3FederalPaidDate = $derived(props.q3FederalPaidDate || '')
  let q4FederalPaidDate = $derived(props.q4FederalPaidDate || '')
  let q1StatePaidDate = $derived(props.q1StatePaidDate || '')
  let q2StatePaidDate = $derived(props.q2StatePaidDate || '') 
  let q3StatePaidDate = $derived(props.q3StatePaidDate || '')
  let q4StatePaidDate = $derived(props.q4StatePaidDate || '')  

  let livingInCurrentStateAllThisYear = $derived(props.livingInCurrentStateAllThisYear)
  let q1State = $derived(props.q1State)
  let q2State = $derived(props.q2State)
  let q3State = $derived(props.q3State)
  let q4State = $derived(props.q4State)

  let hideBlankPayments = $derived(props.hideBlankPayments || false)
  let hideMoreMenu = $derived(props.hideMoreMenu || false)
  
  let onQ1FederalPaidDateChange = $derived(props.onQ1FederalPaidDateChange || (() => {}))
  let onQ2FederalPaidDateChange = $derived(props.onQ2FederalPaidDateChange || (() => {}))
  let onQ3FederalPaidDateChange = $derived(props.onQ3FederalPaidDateChange || (() => {}))
  let onQ4FederalPaidDateChange = $derived(props.onQ4FederalPaidDateChange || (() => {}))
  let onQ1StatePaidDateChange = $derived(props.onQ1StatePaidDateChange || (() => {}))
  let onQ2StatePaidDateChange = $derived(props.onQ2StatePaidDateChange || (() => {}))
  let onQ3StatePaidDateChange = $derived(props.onQ3StatePaidDateChange || (() => {}))
  let onQ4StatePaidDateChange = $derived(props.onQ4StatePaidDateChange || (() => {}))
  
  let onShowPaidDatesChange = $derived(props.onShowPaidDatesChange || (() => {}))

  let q1FederalDateElement = $state(null)
  let q2FederalDateElement = $state(null)
  let q3FederalDateElement = $state(null)
  let q4FederalDateElement = $state(null) 
  let q1StateDateElement = $state(null)
  let q2StateDateElement = $state(null)
  let q3StateDateElement = $state(null)
  let q4StateDateElement = $state(null)

  let showMoreDialog = $state(false)

  onMount(async () => {
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

  const handleQ1FederalPaidDateChange = (date) => {
    q1FederalPaidDate = date
    onQ1FederalPaidDateChange(date)
  }

  const handleQ2FederalPaidDateChange = (date) => {
    q2FederalPaidDate = date
    onQ2FederalPaidDateChange(date)
  }

  const handleQ3FederalPaidDateChange = (date) => {
    q3FederalPaidDate = date
    onQ3FederalPaidDateChange(date)
  }

  const handleQ4FederalPaidDateChange = (date) => {
    q4FederalPaidDate = date
    onQ4FederalPaidDateChange(date)
  }

  const handleQ1StatePaidDateChange = (date) => {
    q1StatePaidDate = date
    onQ1StatePaidDateChange(date)
  }

  const handleQ2StatePaidDateChange = (date) => {
    q2StatePaidDate = date
    onQ2StatePaidDateChange(date)
  }

  const handleQ3StatePaidDateChange = (date) => {
    q3StatePaidDate = date
    onQ3StatePaidDateChange(date)
  }

  const handleQ4StatePaidDateChange = (date) => {
    q4StatePaidDate = date
    onQ4StatePaidDateChange(date)
  }
  
  const isPastQuarter = (quarterNumber) => {
    let currentQuarterNumber = parseInt(currentTaxQuarter.split('Q')[1])
    if (quarterNumber < currentQuarterNumber) {
      return true
    }
    return false
  }

  const isCurrentOrPastQuarter = (quarterNumber) => {
    let currentQuarterNumber = parseInt(currentTaxQuarter.split('Q')[1])
    if (quarterNumber <= currentQuarterNumber) {
      return true
    }
    return false
  }

  const isCurrentQuarter = (quarterNumber) => {
    let currentQuarterNumber = parseInt(currentTaxQuarter.split('Q')[1])
    if (quarterNumber == currentQuarterNumber) {
      return true
    }
    return false
  }

  const handleMoreClick = () => {
    showMoreDialog = true
  }

  const handlePaidDatesToggle = (event) => {
    event.stopPropagation()
    onShowPaidDatesChange()
  }

  const pushFederalPaymentDown = (quarterNumber) => {
    let paidDate
    let paymentAmount
    if (quarterNumber == 1) {
      paidDate = q1FederalPaidDate
      paymentAmount = federalPayment1
    } 
    else if (quarterNumber == 2) {
      paidDate = q2FederalPaidDate
      paymentAmount = federalPayment2
    } 
    else if (quarterNumber == 3) {
      paidDate = q3FederalPaidDate
      paymentAmount = federalPayment3
    } 
    else if (quarterNumber == 4) {
      paidDate = q4FederalPaidDate
      paymentAmount = federalPayment4
    }
    if (!showPaidDates || !isCurrentOrPastQuarter(quarterNumber) || hideBlankPayments || paymentAmount == 0 || (!paidDate && !isPastQuarter(quarterNumber))) {
      return true
    }
    return false
  }

  const pushStatePaymentDown = (quarterNumber) => {
    let paidDate
    let paymentAmount
    if (quarterNumber == 1) {
      paidDate = q1StatePaidDate
      paymentAmount = statePayment1
    } 
    else if (quarterNumber == 2) {
      paidDate = q2StatePaidDate
      paymentAmount = statePayment2
    } 
    else if (quarterNumber == 3) {
      paidDate = q3StatePaidDate
      paymentAmount = statePayment3
    } 
    else if (quarterNumber == 4) {
      paidDate = q4StatePaidDate
      paymentAmount = statePayment4
    }
    if (!showPaidDates || !isCurrentOrPastQuarter(quarterNumber) || hideBlankPayments || paymentAmount == 0 || (!paidDate && !isPastQuarter(quarterNumber))) {
      return true
    }
    return false
  }

</script>

<div class="container" class:containermargin={!showPaidDates} class:containerwithstates={!livingInCurrentStateAllThisYear}>
  <div class="header">
    <div class="lefttitle">DUE</div>
    <div class="centertitle">FEDERAL</div>
      {#if livingInCurrentStateAllThisYear}
        <div class="centertitle">{convertStateToAllUpperCase(currentState)}</div>
      {:else}
        <div class="centertitle">STATE</div>
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
  <div class="row" class:rowwithstates={!livingInCurrentStateAllThisYear}>
    <div class="due">{q1DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(1)}>
      <div class="value">{formatCurrency(federalPayment1)}</div>
      {#if showPaidDates && isCurrentOrPastQuarter(1)}
        {#if q1FederalPaidDate}
          <DatePicker text={`Paid on ${dayjs(q1FederalPaidDate).format('M-D-YY')}`} date={q1FederalPaidDate} onselect={handleQ1FederalPaidDateChange} />
        {:else}
          {#if isCurrentQuarter(1) || hideBlankPayments || federalPayment1 == 0}
            <div class="paid"></div>
          {:else}
            <DatePicker text="(Add date paid)" date={q1FederalPaidDate} onselect={handleQ1FederalPaidDateChange} />
          {/if}
        {/if}
      {/if}
      <input class="dialog" bind:this={q1FederalDateElement} /> 
    </div>
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(1)}>
        {#if !livingInCurrentStateAllThisYear}
          <div class="statename">{convertStateToUpperCase(q1State)}</div>
        {/if}
        <div class="value">{formatCurrency(statePayment1)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(1)}
          {#if q1StatePaidDate}
            <DatePicker text={`Paid on ${dayjs(q1StatePaidDate).format('M-D-YY')}`} date={q1StatePaidDate} onselect={handleQ1StatePaidDateChange} />
          {:else}
            {#if isCurrentQuarter(1) || hideBlankPayments || statePayment1 == 0}
              <div class="paid"></div>
            {:else}   
              <DatePicker text="(Add date paid)" date={q1StatePaidDate} onselect={handleQ1StatePaidDateChange} />
            {/if}
          {/if}
        {/if} 
        <input class="dialog" bind:this={q1StateDateElement} />
      </div>
  </div>
  <div class="row" class:rowwithstates={!livingInCurrentStateAllThisYear}>
    <div class="due">{q2DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(2)}>
      <div class="value">{formatCurrency(federalPayment2)}</div>
      {#if showPaidDates && isCurrentOrPastQuarter(2)}
        {#if q2FederalPaidDate}
          <DatePicker text={`Paid on ${dayjs(q2FederalPaidDate).format('M-D-YY')}`} date={q2FederalPaidDate} onselect={handleQ2FederalPaidDateChange} />
        {:else}
          {#if isCurrentQuarter(2) || hideBlankPayments || federalPayment2 == 0}
            <div class="paid"></div>
          {:else}   
            <DatePicker text="(Add date paid)" date={q2FederalPaidDate} onselect={handleQ2FederalPaidDateChange} />
          {/if}
        {/if}
      {/if} 
      <input class="dialog" bind:this={q2FederalDateElement} />
    </div>
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(2)}>
        {#if !livingInCurrentStateAllThisYear}
          <div class="statename">{convertStateToUpperCase(q2State)}</div>
        {/if}
        <div class="value">{formatCurrency(statePayment2)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(2)}
          {#if q2StatePaidDate}
            <DatePicker text={`Paid on ${dayjs(q2StatePaidDate).format('M-D-YY')}`} date={q2StatePaidDate} onselect={handleQ2StatePaidDateChange} />
          {:else}
            {#if isCurrentQuarter(2) || hideBlankPayments || statePayment2 == 0}
              <div class="paid"></div>
            {:else} 
              <DatePicker text="(Add date paid)" date={q2StatePaidDate} onselect={handleQ2StatePaidDateChange} />
            {/if}
          {/if}
        {/if}
        <input class="dialog" bind:this={q2StateDateElement} />
      </div>
  </div>  
  <div class="row" class:rowwithstates={!livingInCurrentStateAllThisYear}>
    <div class="due">{q3DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(3)}>
      <div class="value">{formatCurrency(federalPayment3)}</div>  
      {#if showPaidDates && isCurrentOrPastQuarter(3)}
        {#if q3FederalPaidDate}
          <DatePicker text={`Paid on ${dayjs(q3FederalPaidDate).format('M-D-YY')}`} date={q3FederalPaidDate} onselect={handleQ3FederalPaidDateChange} />
        {:else}
          {#if isCurrentQuarter(3) || hideBlankPayments || federalPayment3 == 0}
            <div class="paid"></div>
          {:else}
            <DatePicker text="(Add date paid)" date={q3FederalPaidDate} onselect={handleQ3FederalPaidDateChange} />
          {/if}
        {/if}
      {/if} 
      <input class="dialog" bind:this={q3FederalDateElement} />
    </div>
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(3)}>
        {#if !livingInCurrentStateAllThisYear}
          <div class="statename">{convertStateToUpperCase(q3State)}</div>
        {/if}
        <div class="value">{formatCurrency(statePayment3)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(3)}
          {#if q3StatePaidDate}
            <DatePicker text={`Paid on ${dayjs(q3StatePaidDate).format('M-D-YY')}`} date={q3StatePaidDate} onselect={handleQ3StatePaidDateChange} />
          {:else}
            {#if isCurrentQuarter(3) || hideBlankPayments || statePayment3 == 0}
              <div class="paid"></div>
            {:else}
              <DatePicker text="(Add date paid)" date={q3StatePaidDate} onselect={handleQ3StatePaidDateChange} />
            {/if}
          {/if}
        {/if}
        <input class="dialog" bind:this={q3StateDateElement} />
      </div>
  </div> 
  <div class="row" class:rowwithstates={!livingInCurrentStateAllThisYear}>
    <div class="due">{q4DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(4)}>
      <div class="value">{formatCurrency(federalPayment4)}</div>
      {#if showPaidDates && isCurrentOrPastQuarter(4)}
        {#if q4FederalPaidDate}
          <DatePicker text={`Paid on ${dayjs(q4FederalPaidDate).format('M-D-YY')}`} date={q4FederalPaidDate} onselect={handleQ4FederalPaidDateChange} />
        {:else}
          {#if isCurrentQuarter(4) || hideBlankPayments || federalPayment4 == 0}
            <div class="paid"></div>
          {:else}
            <DatePicker text="(Add date paid)" date={q4FederalPaidDate} onselect={handleQ4FederalPaidDateChange} />
          {/if}
        {/if}
      {/if}
      <input class="dialog" bind:this={q4FederalDateElement} />
    </div>
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(4)}>
        {#if !livingInCurrentStateAllThisYear}
          <div class="statename">{convertStateToUpperCase(q4State)}</div>
        {/if}
        <div class="value">{formatCurrency(statePayment4)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(4)}
          {#if q4StatePaidDate}
            <DatePicker text={`Paid on ${dayjs(q4StatePaidDate).format('M-D-YY')}`} date={q4StatePaidDate} onselect={handleQ4StatePaidDateChange} />
          {:else}
            {#if isCurrentQuarter(4) || hideBlankPayments || statePayment4 == 0}
              <div class="paid"></div>
            {:else}
              <DatePicker text="(Add date paid)" date={q4StatePaidDate} onselect={handleQ4StatePaidDateChange} />
            {/if}
          {/if}
        {/if}
        <input class="dialog" bind:this={q4StateDateElement} />
      </div>
  </div>  
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: -5px
  }
  .containermargin {
    margin-bottom: -10px;
  }
  .containerwithstates {
    margin-bottom: -10px;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: var(--bold);
    margin-bottom: 15px;
    position: relative;
  }
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rowwithstates {
    margin-top: 6px;
    margin-bottom: 4px;
  }
  .lefttitle {
    width: 80px;
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
    font-size: 17px;
    margin-top: 10px;
  }
  .payment {
    width: 120px;
    height: 50px;
    text-align: center;
    position: relative;
  }
  .pushpaymentdown {
    margin-top: 10px;
  }
  .statename {
    font-size: 14px;
    color: var(--gray4);
    margin-bottom: 3px;
    margin-top: -20px;
  }
  .value {
    font-size: 17px;
  }
  .paid {
    margin-top: 2px;
    margin-left: 20px;
    font-size: 12px;
    color: var(--gray4);
  }

  .dialog {
    position: absolute;
    visibility: hidden;
    left: 0px;        
    top: 50px;        
    margin-top: 0px;
  }
  @media (min-width: 768px) {
    .more {
      right: -55px;
      top: auto;
    }
    .moredialog {
      top: 30px;
      right: -50px;
    }
    .dialog {
      left: -80px;     
      top: auto;
      margin-top: -15px;
    }
  }

</style>
