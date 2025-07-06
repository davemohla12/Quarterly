<script>
  import { formatCurrency } from "$src/utilities/utilities"
  import { convertStateToAllUpperCase } from "$src/utilities/utilities"
  import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'
  import { currentTaxQuarter } from '$src/settings/settings'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'
  import flatpickr from 'flatpickr' 
  import 'flatpickr/dist/flatpickr.min.css'
  import Clickable from '$src/components/app/Clickable.svelte'
  import { payment } from '$src/data/payment.svelte'

  let props = $props()
  let federalPayment1 = $derived(props.federalPayment1 || 0)
  let federalPayment2 = $derived(props.federalPayment2 || 0)
  let federalPayment3 = $derived(props.federalPayment3 || 0)
  let federalPayment4 = $derived(props.federalPayment4 || 0)
  let stateSupported = $derived(props.stateSupported || false)
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
  let q1FederalDialog
  let q2FederalDialog
  let q3FederalDialog
  let q4FederalDialog
  let q1StateDialog
  let q2StateDialog
  let q3StateDialog
  let q4StateDialog

  let showMoreDialog = $state(false)

  const currentDate = dayjs().format('YYYY-MM-DD')

  onMount(async () => {
    q1FederalDialog = flatpickr(q1FederalDateElement, {
      defaultDate: q1FederalPaidDate || currentDate,
      clickOpens: false, 
      onChange: (selectedDates) => {
        onQ1FederalPaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
      },
    })

    q2FederalDialog = flatpickr(q2FederalDateElement, {
      defaultDate: q2FederalPaidDate || currentDate,
      clickOpens: false, 
      onChange: (selectedDates) => {
        onQ2FederalPaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
        },
      })

    q3FederalDialog = flatpickr(q3FederalDateElement, {
      defaultDate: q3FederalPaidDate || currentDate,
      clickOpens: false, 
      onChange: (selectedDates) => {
        onQ3FederalPaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
      },
    })

    q4FederalDialog = flatpickr(q4FederalDateElement, {
      defaultDate: q4FederalPaidDate || currentDate,
      clickOpens: false, 
      onChange: (selectedDates) => {
        onQ4FederalPaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
      },
    })

    if (await payment.getValue('stateSupported')) { 
      q1StateDialog = flatpickr(q1StateDateElement, {
        defaultDate: q1StatePaidDate || currentDate,
        clickOpens: false, 
        onChange: (selectedDates) => {
          onQ1StatePaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
        },
      })

      if (q2StatePaidDate) {
        q2StateDialog = flatpickr(q2StateDateElement, {
          defaultDate: q2StatePaidDate || currentDate,
          clickOpens: false, 
          onChange: (selectedDates) => {
            onQ2StatePaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
          },
        })  
      }

      if (q3StatePaidDate) {
        q3StateDialog = flatpickr(q3StateDateElement, {
          defaultDate: q3StatePaidDate || currentDate,
          clickOpens: false, 
          onChange: (selectedDates) => {
            onQ3StatePaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
          },
        })  
      }

      if (q4StatePaidDate) {
        q4StateDialog = flatpickr(q4StateDateElement, {
          defaultDate: q4StatePaidDate || currentDate,
          clickOpens: false, 
          onChange: (selectedDates) => {
            onQ4StatePaidDateChange(dayjs(selectedDates[0]).format('YYYY-MM-DD'))
          },
        })
      }
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

  const openQ1FederalDialog = () => {
    q1FederalDialog?.open()
  }
  const openQ2FederalDialog = () => {
    q2FederalDialog?.open()
  }
  const openQ3FederalDialog = () => { 
    q3FederalDialog?.open()
  }
  const openQ4FederalDialog = () => {
    q4FederalDialog?.open()
  }
  const openQ1StateDialog = () => {
    q1StateDialog?.open()
  }
  const openQ2StateDialog = () => {
    q2StateDialog?.open()
  }
  const openQ3StateDialog = () => {
    q3StateDialog?.open()
  }
  const openQ4StateDialog = () => {
    q4StateDialog?.open()
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
    if (!showPaidDates || !isCurrentOrPastQuarter(quarterNumber) || hideBlankPayments || paymentAmount == 0 || !paidDate) {
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
    if (!showPaidDates || !isCurrentOrPastQuarter(quarterNumber) || hideBlankPayments || paymentAmount == 0 || !paidDate) {
      return true
    }
    return false
  }

</script>

<div class="container" class:containermargin={!showPaidDates}>
  <div class="header">
    <div class="lefttitle">DUE</div>
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
    <div class="due">{q1DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(1)}>
      <div class="value">{formatCurrency(federalPayment1)}</div>
      {#if showPaidDates && isCurrentOrPastQuarter(1)}
        {#if q1FederalPaidDate}
          <Clickable onclick={openQ1FederalDialog}>
            <div class="paidcontainer">
              <div class="paid">Paid on {dayjs(q1FederalPaidDate).format('M-D-YY')}</div>
              <img class="edit" src="/images/edit.png" alt="Edit"  />
            </div>
          </Clickable>
        {:else}
          {#if isCurrentQuarter(1) || hideBlankPayments || federalPayment1 == 0}
            <div class="paid"></div>
          {:else}
            <Clickable onclick={openQ1FederalDialog}>
              <div class="paidcontainer">
                <div class="paid">(Add date paid)</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {/if}
        {/if}
      {/if}
      <input class="dialog" bind:this={q1FederalDateElement} />
    </div>
    {#if stateSupported}
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(1)}>
        <div class="value">{formatCurrency(statePayment1)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(1)}
          {#if q1StatePaidDate}
            <Clickable onclick={openQ1StateDialog}>
              <div class="paidcontainer">
                <div class="paid">Paid on {dayjs(q1StatePaidDate).format('M-D-YY')}</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {:else}
            {#if isCurrentQuarter(1) || hideBlankPayments || statePayment1 == 0}
              <div class="paid"></div>
            {:else}   
              <Clickable onclick={openQ1StateDialog}>
                <div class="paidcontainer">
                  <div class="paid">(Add date paid)</div>
                  <img class="edit" src="/images/edit.png" alt="Edit"  />
                </div>
              </Clickable>
            {/if}
          {/if}
        {/if} 
        <input class="dialog" bind:this={q1StateDateElement} />
      </div>
    {/if}
  </div>
  <div class="row">
    <div class="due">{q2DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(2)}>
      <div class="value">{formatCurrency(federalPayment2)}</div>
      {#if showPaidDates && isCurrentOrPastQuarter(2)}
        {#if q2FederalPaidDate}
          <Clickable onclick={openQ2FederalDialog}>
            <div class="paidcontainer">
              <div class="paid">Paid on {dayjs(q2FederalPaidDate).format('M-D-YY')}</div>
              <img class="edit" src="/images/edit.png" alt="Edit"  />
            </div>
          </Clickable>
        {:else}
          {#if isCurrentQuarter(2) || hideBlankPayments || federalPayment2 == 0}
            <div class="paid"></div>
          {:else}   
            <Clickable onclick={openQ2FederalDialog}>
              <div class="paidcontainer">
                <div class="paid">(Add date paid)</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {/if}
        {/if}
      {/if} 
      <input class="dialog" bind:this={q2FederalDateElement} />
    </div>
    {#if stateSupported}
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(2)}>
        <div class="value">{formatCurrency(statePayment2)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(2)}
          {#if q2StatePaidDate}
            <Clickable onclick={openQ2StateDialog}>
              <div class="paidcontainer">
                <div class="paid">Paid on {dayjs(q2StatePaidDate).format('M-D-YY')}</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {:else}
            {#if isCurrentQuarter(2) || hideBlankPayments || statePayment2 == 0}
              <div class="paid"></div>
            {:else} 
              <Clickable onclick={openQ2StateDialog}>
                <div class="paidcontainer">
                  <div class="paid">(Add date paid)</div>
                  <img class="edit" src="/images/edit.png" alt="Edit"  />
                </div>
              </Clickable>
            {/if}
          {/if}
        {/if}
        <input class="dialog" bind:this={q2StateDateElement} />
      </div>
    {/if}
  </div>  
  <div class="row">
    <div class="due">{q3DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(3)}>
      <div class="value">{formatCurrency(federalPayment3)}</div>  
      {#if showPaidDates && isCurrentOrPastQuarter(3)}
        {#if q3FederalPaidDate}
          <Clickable onclick={openQ3FederalDialog}>
            <div class="paidcontainer">
              <div class="paid">Paid on {dayjs(q3FederalPaidDate).format('M-D-YY')}</div>
              <img class="edit" src="/images/edit.png" alt="Edit"  />
            </div>
          </Clickable>
        {:else}
          {#if isCurrentQuarter(3) || hideBlankPayments || federalPayment3 == 0}
            <div class="paid"></div>
          {:else}
            <Clickable onclick={openQ3FederalDialog}>
              <div class="paidcontainer">
                <div class="paid">(Add date paid)</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {/if}
        {/if}
      {/if} 
      <input class="dialog" bind:this={q3FederalDateElement} />
    </div>
    {#if stateSupported}
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(3)}>
        <div class="value">{formatCurrency(statePayment3)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(3)}
          {#if q3StatePaidDate}
            <Clickable onclick={openQ3StateDialog}>
              <div class="paidcontainer">
                <div class="paid">Paid on {dayjs(q3StatePaidDate).format('M-D-YY')}</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {:else}
            {#if isCurrentQuarter(3) || hideBlankPayments || statePayment3 == 0}
              <div class="paid"></div>
            {:else}
              <Clickable onclick={openQ3StateDialog}>
                <div class="paidcontainer">
                  <div class="paid">(Add date paid)</div>
                  <img class="edit" src="/images/edit.png" alt="Edit"  />
                </div>
              </Clickable>
            {/if}
          {/if}
        {/if}
        <input class="dialog" bind:this={q3StateDateElement} />
      </div>
    {/if}
  </div> 
  <div class="row">
    <div class="due">{q4DueDate.format('MMM D')}</div>
    <div class="payment" class:pushpaymentdown={pushFederalPaymentDown(4)}>
      <div class="value">{formatCurrency(federalPayment4)}</div>
      {#if showPaidDates && isCurrentOrPastQuarter(4)}
        {#if q4FederalPaidDate}
          <Clickable onclick={openQ4FederalDialog}>
            <div class="paidcontainer">
              <div class="paid">Paid on {dayjs(q4FederalPaidDate).format('M-D-YY')}</div>
              <img class="edit" src="/images/edit.png" alt="Edit"  />
            </div>
          </Clickable>
        {:else}
          {#if isCurrentQuarter(4) || hideBlankPayments || federalPayment4 == 0}
            <div class="paid"></div>
          {:else}
            <Clickable onclick={openQ4FederalDialog}>
              <div class="paidcontainer">
                <div class="paid">(Add date paid)</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {/if}
        {/if}
      {/if}
      <input class="dialog" bind:this={q4FederalDateElement} />
    </div>
    {#if stateSupported}
      <div class="payment" class:pushpaymentdown={pushStatePaymentDown(4)}>
        <div class="value">{formatCurrency(statePayment4)}</div>
        {#if showPaidDates && isCurrentOrPastQuarter(4)}
          {#if q4StatePaidDate}
            <Clickable onclick={openQ4StateDialog}>
              <div class="paidcontainer">
                <div class="paid">Paid on {dayjs(q4StatePaidDate).format('M-D-YY')}</div>
                <img class="edit" src="/images/edit.png" alt="Edit"  />
              </div>
            </Clickable>
          {:else}
            {#if isCurrentQuarter(4) || hideBlankPayments || statePayment4 == 0}
              <div class="paid"></div>
            {:else}
              <Clickable onclick={openQ4StateDialog}>
                <div class="paidcontainer">
                  <div class="paid">(Add date paid)</div>
                  <img class="edit" src="/images/edit.png" alt="Edit"  />
                </div>
              </Clickable>
            {/if}
          {/if}
        {/if}
        <input class="dialog" bind:this={q4StateDateElement} />
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
    margin-bottom: -5px
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
    margin-bottom: 15px;
    position: relative;
  }
  .row {
    display: flex;
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
    margin-top: 5px;
  }
  .payment {
    width: 120px;
    height: 50px;
    text-align: center;
    position: relative;
  }
  .pushpaymentdown {
    margin-top: 5px;
  }
  .value {
    font-size: 17px;
  }
  .paidcontainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .paid {
    margin-top: 2px;
    margin-left: 20px;
    font-size: 12px;
    color: var(--gray4);
  }
  .edit {
    width: 10px;
    height: 10px;
    margin-left: 4px;
    margin-top: -1px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .paidcontainer:hover .edit {
    opacity: 1;
  }
  .dialog {
    position: absolute;
    visibility: hidden;
    left: -80px;
    margin-top: -15px;
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
  }

</style>
