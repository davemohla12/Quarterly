<script>
  import axios from 'axios'

  const cronKey = 'N1X5XMej7ievRFDLNEBh2Qt6u8azajjp'

  const sendRating = async () => {
    const response = await axios.get(`/api/rating?cron_key=${cronKey}`)
    if (response.status == 200) {
      console.log('called successfully')
    }
    if (response.error) {
      console.log(response.error)
    }
  }

</script>

<button onclick={sendRating}>Send Rating</button>
