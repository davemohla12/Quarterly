<script>
  import axios from 'axios'
  import { user } from '$src/data/user.svelte'

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
    const id = await user.getValue('id')
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'Your quarterly tax payment is due soon',
      template: 'fiveday',
      id: id
    })
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
  }

  const sendOneDayEmail = async () => {
    const id = await user.getValue('id')
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'Your quarterly payment is due',
      template: 'oneday',
      id: id
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

  const sendRatingEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'How was your experience?',
      template: 'rating',
      id: '44'
    })
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
    else {
      console.log(response.data)
    }
  }

  const sendCreditsEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'You earned $5 in credits',
      template: 'credits',
      credits: 5
    })
    if (response.data.success) {
      console.log('Email sent successfully:', response.data)
    }
    else {
      console.log(response.data)
    }
  }

  const sendRemindersSentEmail = async () => {
    const response = await axios.post('/api/email', {
      to: 'davemohla@gmail.com',
      subject: 'Reminders sent',
      template: 'reminderssent',
      message: 'Reminders sent successfully'
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
<button onclick={sendRatingEmail}>
  Send Rating Email
</button>
<button onclick={sendCreditsEmail}>
  Send Credits Email
</button>   
<button onclick={sendRemindersSentEmail}>
  Send Reminders Sent Email
</button>