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

  const sendSupportEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'support@zenguider.com',
      subject: 'Support Message',
      template: 'support',
      message: 'This is a test support message',
      email: 'davemohla@gmail.com'
    })  
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
  }

  const sendConfirmationEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: `We’ve received your message`,
      template: 'confirmation'
    })  
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
    else {
      console.log(response.data)
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
<button onclick={sendSupportEmail}>
  Send Support Email
</button>
<button onclick={sendConfirmationEmail}>
  Send Confirmation Email
</button>