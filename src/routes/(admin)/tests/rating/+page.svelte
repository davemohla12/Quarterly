<script>
  import axios from 'axios'

  const cronKey = 'N1X5XMej7ievRFDLNEBh2Qt6u8azajjp'

  const sendRating = async () => {
    try {
      const response = await axios.get(`/api/rating?cron_key=${cronKey}`)
      if (response.data) {
        console.log(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

</script>

<button onclick={sendRating}>Send Rating</button>
