<script>
  import axios from 'axios'

  const sendDashboardEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      template: 'dashboard'
    })
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
}
</script>

<button onclick={sendDashboardEmail}>
  Send Email
</button>