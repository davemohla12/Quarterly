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
  import { page } from '$app/stores'

  const headingText = `Manage your reminders`
  const buttonText = 'SAVE'
  global.makeButtonActive = true
  let hideBack = $state()

  let loading = $state(true)
  let sendReminders = $state(false)
  let sendFiveDayReminder = $state(false)
  let sendOneDayReminder = $state(false)
  let id = $state('')

  onMount(async () => {
    loading = true
    if (global.loggedIn) {
      hideBack = false
      sendReminders = await user.getValue('sendReminders')
      sendFiveDayReminder = await user.getValue('sendFiveDayReminder')
      sendOneDayReminder = await user.getValue('sendOneDayReminder')
      loading = false
    }
  })

  $effect(async () => {
    id = $page.url.searchParams.get('id') || ''
    if (id) {
      hideBack = true
      sendReminders = await user.getValueById('sendReminders', id)
      sendFiveDayReminder = await user.getValueById('sendFiveDayReminder', id)
      sendOneDayReminder = await user.getValueById('sendOneDayReminder', id)
      loading = false
    }
  })

  const handleSelect = (sendRemindersValue, sendFiveDayReminderValue, sendOneDayReminderValue) => {
    sendReminders = sendRemindersValue
    sendFiveDayReminder = sendFiveDayReminderValue
    sendOneDayReminder = sendOneDayReminderValue
  }

  const handleSave = async () => {
    if (id) {
      await user.setValueById('sendReminders', id, sendReminders)
      await user.setValueById('sendFiveDayReminder', id, sendFiveDayReminder)
      await user.setValueById('sendOneDayReminder', id, sendOneDayReminder)
      goto(`/confirmation?id=${id}&action=update`)
    }
    else { 
      user.currentPage = 'dashboard'
      goto('/dashboard')
      await user.setValue('sendReminders', sendReminders)
      await user.setValue('sendFiveDayReminder', sendFiveDayReminder)
      await user.setValue('sendOneDayReminder', sendOneDayReminder)
    }
  }

</script>

<Header hideBack={hideBack} showAccountIcon={true} />
<Avatar />
{#if loading}
  <Loading />
{:else}
  <Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
  <Reminders onselect={handleSelect} sendReminders={sendReminders} sendFiveDayReminder={sendFiveDayReminder} sendOneDayReminder={sendOneDayReminder}/>
  <Button text={buttonText} onclick={handleSave} />
{/if}