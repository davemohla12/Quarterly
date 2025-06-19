<script>
  import axios from 'axios'

  const sendDashboardEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'Your 2025 quarterly taxes are ready',
      template: 'dashboard'
    })
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
  }

  const sendFiveDayEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'Your quarterly tax payment is due soon',
      template: 'fiveday'
    })
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
  }

    
  const sendOneDayEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'Your quarterly payment is due',
      template: 'oneday'
    })
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
  }
</script>

<button onclick={sendDashboardEmail}>
  Send Dashboard Email
</button>
<button onclick={sendFiveDayEmail}>
  Send Five Day Email
</button>
<button onclick={sendOneDayEmail}>
  Send One Day Email
</button>