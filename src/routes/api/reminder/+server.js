import { json } from '@sveltejs/kit'
import axios from 'axios'
import { supabase } from '$src/utilities/supabase'
import { currentTaxQuarter } from '$src/settings/settings'
import { currentTaxYear } from '$src/settings/settings'
import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'
import dayjs from 'dayjs'
import { PUBLIC_DOMAIN } from '$env/static/public' 
import { CRON_KEY } from '$env/static/private'
import { getEmails } from '$src/utilities/database'

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
      const emails = await getEmails()
      const message = []
      for (const email of emails) {
        const payPreference = await getValueFromDatabase('Payments', email, 'payPreference')
        const sendReminders = await getValueFromDatabase('Users', email, 'sendReminders')
        const sendFiveDayReminder = await getValueFromDatabase('Users', email, 'sendFiveDayReminder')
        const sendOneDayReminder = await getValueFromDatabase('Users', email, 'sendOneDayReminder')

        console.log(`Email: ${email}`)
        console.log(`Pay Preference: ${payPreference}`)
        console.log(`Send Reminders: ${sendReminders}`)
        console.log(`Send Five Day Reminder: ${sendFiveDayReminder}`)
        console.log(`Send One Day Reminder: ${sendOneDayReminder}`)

        if (payPreference == 'quarter') {
          if (sendReminders) {
            if (sendFiveDayReminder) {
              if (currentTaxQuarter == 'Q1') {
                if (dayjs().isSame(q1DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              }
              else if (currentTaxQuarter == 'Q2') {
                if (dayjs().isSame(q2DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              }
              else if (currentTaxQuarter == 'Q3') {
                if (dayjs().isSame(q3DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()  
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              } 
              else if (currentTaxQuarter == 'Q4') {
                if (dayjs().isSame(q4DueDate.subtract(5, 'days'), 'day')) {
                  await sendFiveDayEmail()  
                  message.push(`Sent 5 day reminder email to ${email}`)
                }
              }
            }
            if (sendOneDayReminder) {
              if (currentTaxQuarter == 'Q1') {
                if (dayjs().isSame(q1DueDate.subtract(1, 'day'), 'day')) {
                  await sendOneDayEmail()   
                  message.push(`Sent 1 day reminder email to ${email}`)
                }
              }
              else if (currentTaxQuarter == 'Q2') {
                if (dayjs().isSame(q2DueDate.subtract(1, 'day'), 'day')) {
                  await sendOneDayEmail()   
                  message.push(`Sent 1 day reminder email to ${email}`)
                } 
              }
              else if (currentTaxQuarter == 'Q3') {
                if (dayjs().isSame(q3DueDate.subtract(1, 'day'), 'day')) {
                  await sendOneDayEmail()   
                  message.push(`Sent 1 day reminder email to ${email}`)
                }
              }
              else if (currentTaxQuarter == 'Q4') {
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
    return json({ message: 'Error sending reminder emails' }, { status: 500 })
  }
}

export { GET }