import { json } from '@sveltejs/kit'
import axios from 'axios'
import { getDashboardEmail } from '$src/emails/dashboard'
import { RESEND_API_KEY } from '$env/static/private'

const POST = async ({ request }) => {
  const { to, year, template } = await request.json()
  let html = ''

  if (template == 'dashboard') {
    html = getDashboardEmail()
  }

  const response = await axios.post(
    'https://api.resend.com/emails',
    {
      from: 'Zenguider <onboarding@resend.dev>',
      to: to,
      subject: `Your ${year} quarterly taxes are ready`,
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

export { POST }