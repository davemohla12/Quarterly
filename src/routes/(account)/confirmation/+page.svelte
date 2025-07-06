<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import { page } from '$app/stores'
  import { user } from '$src/data/user.svelte'

  let text = $state('')
  let hideBack = $state()
  let id = $state('')
  let action = $state('')

  $effect(async () => {
    id = $page.url.searchParams.get('id') || ''
    action = $page.url.searchParams.get('action') || ''

    if (action == 'update') {
      text = 'You have successfully updated your reminders'
      hideBack = false
    }
    else if (action == 'stop') {
      text = 'You have successfully turned off your reminders'
      await user.setValueById('sendReminders', id, false)
      await user.setValueById('sendFiveDayReminder', id, false)
      await user.setValueById('sendOneDayReminder', id, false)
      hideBack = true
    }
  })

</script>

<Header hideIcons={false} hideBack={hideBack} showAccountIcon={false} />
<Avatar />
<div class="container">
  <div class="text">
    {text}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
  }
  .text {
    text-align: center;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    width: 400px;
    margin-top: 100px;
  }
</style>