import { json } from '@sveltejs/kit'
import axios from 'axios'
import { getDashboardEmail } from '$src/emails/dashboard'
import { getFiveDayEmail } from '$src/emails/fiveday'
import { getOneDayEmail } from '$src/emails/oneday'
import { RESEND_API_KEY } from '$env/static/private'

const POST = async ({ request }) => {
  const { to, subject, template } = await request.json()
  let html = ''

  if (template == 'dashboard') {
    html = getDashboardEmail()
  }
  else if (template == 'fiveday') {
    html = getFiveDayEmail()
  }
  else if (template == 'oneday') {
    html = getOneDayEmail()
  }

    try { 
    const response = await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Zenguider <support@zenguider.com>',
        to: to,
        subject: subject,
        html: html
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