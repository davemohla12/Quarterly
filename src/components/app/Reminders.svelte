<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  
  let props = $props()
  let sendReminders = $derived(props.sendReminders)
  let sendFiveDayReminder = $derived(props.sendFiveDayReminder)
  let sendOneDayReminder = $derived(props.sendOneDayReminder)
  let onselect = props.onselect

  const handlesendReminder = () => {
    sendReminders = true
    sendFiveDayReminder = true
    sendOneDayReminder = true
    onselect(sendReminders, sendFiveDayReminder, sendOneDayReminder)
   }

   const handledontSendReminder = () => {
    sendReminders = false
    onselect(sendReminders, sendFiveDayReminder, sendOneDayReminder)
   }

   const handlesendFiveDayReminder = () => {
    sendFiveDayReminder = !sendFiveDayReminder
    onselect(sendReminders, sendFiveDayReminder, sendOneDayReminder)
   }  

   const handlesendOneDayReminder = () => {
    sendOneDayReminder = !sendOneDayReminder
    onselect(sendReminders, sendFiveDayReminder, sendOneDayReminder)
   }
</script>

<div class="container">
  <div class="sendcontainer">
    <Clickable onclick={handlesendReminder}>
    <div class="radiocontainer">
      {#if sendReminders}
        <img class="radiobutton" src="/images/radiochecked.png" alt="Radio button checked" />
      {:else}
        <img class="radiobutton" src="/images/radiounchecked.png" alt="Radio button unchecked" />
      {/if}
      <div class="label">Send email reminders</div>
    </div>
    </Clickable>
    {#if sendReminders}
    <Clickable onclick={handlesendFiveDayReminder}>
      <div class="checkboxcontainer">   
        {#if sendFiveDayReminder}
          <img class="checkbox" src="/images/checkboxchecked.png" alt="Checkbox checked" />
        {:else}
          <img class="checkbox" src="/images/checkboxunchecked.png" alt="Checkbox unchecked" />
        {/if}
        <div class="label">5 days before due date</div>
      </div>
      </Clickable>
      <Clickable onclick={handlesendOneDayReminder}>
      <div class="checkboxcontainer">
        {#if sendOneDayReminder}
          <img class="checkbox" src="/images/checkboxchecked.png" alt="Checkbox checked" />
        {:else}
          <img class="checkbox" src="/images/checkboxunchecked.png" alt="Checkbox unchecked" />
        {/if}
        <div class="label">1 day before due date</div>
      </div>
      </Clickable>
    {/if}
  </div>
  <div class="sendcontainer">
    <Clickable onclick={handledontSendReminder}>
    <div class="radiocontainer">
      {#if !sendReminders}
        <img class="radiobutton" src="/images/radiochecked.png" alt="Radio button checked" />
      {:else}
        <img class="radiobutton" src="/images/radiounchecked.png" alt="Radio button unchecked" />
      {/if}
      <div class="label">Don't send email reminders</div>
    </div>
    </Clickable>
  </div>
</div>


<style>
  .container {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    max-width: 320px;
    border-radius: 5px;
    margin-top: 10px;
    position: relative;
  }
  .sendcontainer {
    background-color: var(--gray1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
 }
  .radiocontainer {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .label {
    font-family: 'Lato';
    font-size: 16px;
    font-weight: 400;
  }
  .radiobutton {
    width: 32px;
    height: 32px;
    margin-left: 20px;
    margin-right: 15px;
  }
  .checkboxcontainer {
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    margin-bottom: 5px;
  }
  .checkbox {
    width: 26px;
    height: 26px;
    margin-left: 60px;
    margin-right: 15px;
  }
  @media (min-width: 768px) { 
    .container {
      max-width: unset;
      width: 400px;
    }
}
</style>