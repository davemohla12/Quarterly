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
        }
      }
      return json({ message: 'Rating emails api run' }, { status: 200 })
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