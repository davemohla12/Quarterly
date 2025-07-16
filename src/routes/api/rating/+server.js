import { json } from '@sveltejs/kit'
import axios from 'axios'
import { CRON_KEY } from '$env/static/private'
import dayjs from 'dayjs' 
import { PUBLIC_DOMAIN } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const getValueFromUsers = async (email, field) => {
    const response = await supabaseAdmin
      .from('Users')
      .select('*')
      .eq('email', email)
      .single()

    return response.data?.[field]

  }

const getEmails = async () => {
  const response = await supabaseAdmin
  .from('Users')
  .select('email')
  if (response.data) {
    const emails = response.data.map(row => row.email)
    const uniqueEmails = []
    for (const email of emails) {
      if (!uniqueEmails.includes(email)) {
        uniqueEmails.push(email)
      }
    }
    return uniqueEmails
  }
  else { 
    return []
  } 
}

const GET = async ({ url }) => {
  try {
    const token = url.searchParams.get('cron_key')

    if (token == CRON_KEY) {
      const emails = await getEmails()
      const message = []
      for (const email of emails) {
        const sendRatingsEmailOn = await getValueFromUsers( email, 'sendRatingsEmailOn')
        if (sendRatingsEmailOn && dayjs().isSame(sendRatingsEmailOn, 'day')) {
          const id = await getValueFromUsers(email, 'id')
          await axios.post(`${PUBLIC_DOMAIN}/api/email`, {
            to: email,
            subject: 'How was your experience?',
            template: 'rating',
            id: id
          })
          message.push(`Sent rating email to ${email}`)
        }
      }
      if (message.length > 0) {
        return json({ message: message.join('\n') })
      }
      else {
        return json({ message: 'No rating emails sent'})
      }
    }
    else {
      return json({ message: 'Invalid token' }, { status: 401 })
    }
  }
  catch (error) {
    return json({ message: 'Error sending rating emails' }, { status: 500 })
  }
}

export { GET }

