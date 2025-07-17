import { json } from '@sveltejs/kit'
import axios from 'axios'
import { getDashboardEmail } from '$src/emails/dashboard'
import { getFiveDayEmail } from '$src/emails/fiveday'
import { getOneDayEmail } from '$src/emails/oneday'
import { getSupportEmail } from '$src/emails/support'
import { getConfirmationEmail } from '$src/emails/confirmation'
import { getRatingEmail } from '$src/emails/rating'
import { getCreditsEmail } from '$src/emails/credits'
import { getRemindersSentEmail } from '$src/emails/reminderssent'
import { RESEND_API_KEY } from '$env/static/private'

const POST = async ({ request }) => {
  const { to, subject, template, message, email, id, credits } = await request.json()

  let html = ''

  if (template == 'dashboard') {
    html = getDashboardEmail()
  }
  else if (template == 'fiveday') {
    html = getFiveDayEmail(id)
  }
  else if (template == 'oneday') {
    html = getOneDayEmail(id)
  }
  else if (template == 'support') {
    html = getSupportEmail(message)
  }
  else if (template == 'confirmation') {
    html = getConfirmationEmail()
  }
  else if (template == 'rating') {
    html = getRatingEmail(id)
  }
  else if (template == 'credits') {
    html = getCreditsEmail(credits)
  }
  else if (template == 'reminderssent') {
    html = getRemindersSentEmail(message)
  }

  try { 
    const response = await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Zenguider <support@zenguider.com>',
        to: to,
        subject: subject,
        html: html,
        reply_to: email
      },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return json({ success: true, data: response.data })
  }
  catch (error) {
    return json({ success: false, error: error.message })
  }
}

export { POST }