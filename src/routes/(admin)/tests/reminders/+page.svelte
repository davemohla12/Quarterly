<script>
  import axios from 'axios'

  const cronKey = 'N1X5XMej7ievRFDLNEBh2Qt6u8azajjp'

  const sendReminder = async () => {
    const response = await axios.get(`/api/reminder?cron_secret=${cronKey}`)
    if (response.data) {
      console.log(response.data.message)
    }
  }

</script>

<button onclick={sendReminder}>Send Reminder</button>
