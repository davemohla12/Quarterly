import { json } from '@sveltejs/kit'
import axios from 'axios'
import { supabase } from '$src/utilities/supabase'
import { CRON_KEY } from '$env/static/private'
import { getEmails } from '$src/utilities/database'   
import dayjs from 'dayjs' 
import { PUBLIC_DOMAIN } from '$env/static/public'

const getValueFromDatabase = async (table, email, field) => {
  if (table == 'Payments') {
    const response = await supabase
      .from(table)
      .select('*')
        .eq('email', email)
        .eq('taxYear', currentTaxYear)
        .single()
    return response.data?.[field]
  }
  else if (table == 'Users') {
    const response = await supabase
      .from(table)
      .select('*')
      .eq('email', email)
      .single()
    return response.data?.[field]
  }
}

const GET = async ({ url }) => {
  try {
    const token = url.searchParams.get('cron_key')

    if (token == CRON_KEY) {
      const emails = await getEmails()
      for (const email of emails) {
        const sendRatingsEmailOn = await getValueFromDatabase('Users', email, 'sendRatingsEmailOn')
        if (dayjs().isSame(sendRatingsEmailOn, 'day')) {
          const id = await getValueFromDatabase('Users', email, 'id')
          await axios.post(`${PUBLIC_DOMAIN}/api/email`, {
            to: email,
            subject: 'How was your experience?',
            template: 'rating',
            id: id
          })
        }
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