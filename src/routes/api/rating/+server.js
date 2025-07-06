import { json } from '@sveltejs/kit'
import axios from 'axios'
import { supabase } from '$src/utilities/supabase'
import { CRON_KEY } from '$env/static/private'
import { getEmails } from '$src/utilities/database'   
import dayjs from 'dayjs' 
import { PUBLIC_DOMAIN } from '$env/static/public'

const getValueFromUsers = async (email, field) => {
    const response = await supabase
      .from('Users')
      .select('*')
      .eq('email', email)
      .single()
    return response.data?.[field]
  }

const GET = async ({ url }) => {
  try {
    const token = url.searchParams.get('cron_key')

    if (token == CRON_KEY) {
      const emails = await getEmails()
      const message = []
      for (const email of emails) {
        const sendRatingsEmailOn = await getValueFromUsers( email, 'sendRatingsEmailOn')
        if (dayjs().isSame(sendRatingsEmailOn, 'day')) {
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
        console.log(message.join('\n'))
        return json({ message: message.join('\n') })
      }
      else {
        console.log('No rating emails sent')
        return json({ message: 'No rating emails sent' })
      }
    }
    else {
      return json({ message: 'Invalid token' }, { status: 401 })
    }
  }
  catch (error) {
    console.log(error)
    return json({ message: 'Error sending rating emails' }, { status: 500 })
  }
}

export { GET }