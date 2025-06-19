import { json } from '@sveltejs/kit'
import axios from 'axios'
import { supabase } from '$src/utilities/supabase'
import { currentQuarter } from '$src/settings/settings'
import { currentYear } from '$src/settings/settings'
import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'
import dayjs from 'dayjs'
import { PUBLIC_DOMAIN } from '$env/static/public' 
import { CRON_KEY } from '$env/static/private'
import { getEmailsFromDatabase } from '$src/utilities/database'

const getValueInDatabase = async (email, field) => {
  const response = await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .eq('year', currentYear)
    .single()
  return response.data?.[field]
}

const sendFiveDayEmail = async () => {
  await axios.post(`${PUBLIC_DOMAIN}/api/email`, {
    to: 'davemohla@gmail.com',
    subject: 'Your quarterly tax payment is due soon',
    template: 'fiveday'
  })
}

const sendOneDayEmail = async () => {
  await axios.post(`${PUBLIC_DOMAIN}/api/email`, {
    to: 'davemohla@gmail.com',
    subject: 'Your quarterly payment is due',
    template: 'oneday'
  })
}

const GET = async ({ url }) => {
  try {
    const token = url.searchParams.get('cron_secret')

    if (token == CRON_KEY) {
      const emails = await getEmailsFromDatabase()
      const message = []
      for (const email of emails) {
        const payPreference = await getValueInDatabase(email,'payPreference')
        const sendReminders = await getValueInDatabase(email, 'sendReminders')
        const fiveDaysBefore = await getValueInDatabase(email,'fiveDaysBefore')
        const oneDayBefore = await getValueInDatabase(email, 'oneDayBefore')

        if (payPreference == 'quarter') {
          if (sendReminders) {
            if (fiveDaysBefore) {
              if (currentQuarter == 'Q1') {
                if (dayjs().isSame(q1DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              }
              else if (currentQuarter == 'Q2') {
                if (dayjs().isSame(q2DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              }
              else if (currentQuarter == 'Q3') {
                if (dayjs().isSame(q3DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()  
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              } 
              else if (currentQuarter == 'Q4') {
                if (dayjs().isSame(q4DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()  
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              }
            }
            if (oneDayBefore) {
              if (currentQuarter == 'Q1') {
                if (dayjs().isSame(q1DueDate.subtract(1, 'day'), 'day')) {
                  await sendOneDayEmail()   
                  message.push(`Sent 1 day reminder email to ${email}`)
                }
              }
              else if (currentQuarter == 'Q2') {
                if (dayjs().isSame(q2DueDate.subtract(1, 'day'), 'day')) {
                  await sendOneDayEmail()   
                  message.push(`Sent 1 day reminder email to ${email}`)
                } 
              }
              else if (currentQuarter == 'Q3') {
                if (dayjs().isSame(q3DueDate.subtract(1, 'day'), 'day')) {
                  await sendOneDayEmail()   
                  message.push(`Sent 1 day reminder email to ${email}`)
                }
              }
              else if (currentQuarter == 'Q4') {
                if (dayjs().isSame(q4DueDate.subtract(1, 'day'), 'day')) {
                  await sendOneDayEmail()
                  message.push(`Sent 1 day reminder email to ${email}`)
                }
              }
            }
          }
        }
      }
      if (message.length > 0) {
        return json({ message: message.join('\n') })
      }
      else {
        return json({ message: 'No reminder emails sent' })
      }
    }
    else {
      return json({ message: 'Invalid token' }, { status: 401 })
    }
  }
  catch (error) {
    console.log(error)
    return json({ message: 'Error sending reminder emails' }, { status: 500 })
  }
}

export { GET }