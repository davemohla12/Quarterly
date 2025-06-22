<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'  
  import Reminders from '$src/components/app/Reminders.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { global } from '$src/data/global.svelte'  
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'
  import Loading from '$src/components/app/Loading.svelte'

  const headingText = `Manage your reminders`
  const buttonText = 'SAVE'
  global.makeButtonActive = true

  let loading = $state(true)
  let sendReminders = $state(false)
  let sendFiveDayReminder = $state(false)
  let sendOneDayReminder = $state(false)

  onMount(async () => {
    loading = true
    sendReminders = await user.getValue('sendReminders')
    sendFiveDayReminder = await user.getValue('sendFiveDayReminder')
    sendOneDayReminder = await user.getValue('sendOneDayReminder')
    loading = false
  })

  const handleSelect = (sendRemindersValue, sendFiveDayReminderValue, sendOneDayReminderValue) => {
    sendReminders = sendRemindersValue
    sendFiveDayReminder = sendFiveDayReminderValue
    sendOneDayReminder = sendOneDayReminderValue
  }

  const handleSave = () => {
    user.setValue('sendReminders', sendReminders)
    user.setValue('sendFiveDayReminder', sendFiveDayReminder)
    user.setValue('sendOneDayReminder', sendOneDayReminder)
    user.currentPage = 'dashboard'
    goto('/dashboard')
  }

</script>

<Header showAccountIcon={true} />
<Avatar />
{#if loading}
  <Loading />
{:else}
  <Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
  <Reminders onselect={handleSelect} sendReminders={sendReminders} sendFiveDayReminder={sendFiveDayReminder} sendOneDayReminder={sendOneDayReminder}/>
  <Button text={buttonText} onclick={handleSave} />
{/if}