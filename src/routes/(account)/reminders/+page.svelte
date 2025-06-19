<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'  
  import Reminders from '$src/components/app/Reminders.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { store } from '$src/stores/store.svelte'  
  import { goto } from '$app/navigation'

  const headingText = `Manage your reminders`
  const buttonText = 'SAVE'
  store.makeButtonActive = true

  let sendReminders
  let fiveDaysBefore 
  let oneDayBefore 

  const handleSelect = (sendRemindersValue, fiveDaysBeforeValue, oneDayBeforeValue) => {
    sendReminders = sendRemindersValue
    fiveDaysBefore = fiveDaysBeforeValue
    oneDayBefore = oneDayBeforeValue
  }

  const handleSave = () => {
    store.sendReminders = sendReminders
    store.fiveDaysBefore = fiveDaysBefore
    store.oneDayBefore = oneDayBefore
    store.currentPage = 'dashboard'
    goto('/dashboard')
  }

</script>

<Header showDashboardOption={true} />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<Reminders onselect={handleSelect}/>
<Button text={buttonText} onclick={handleSave} />
