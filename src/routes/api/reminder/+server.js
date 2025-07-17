import { json } from '@sveltejs/kit'
import axios from 'axios'
import { currentTaxQuarter } from '$src/settings/settings'
import { currentTaxYear } from '$src/settings/settings'
import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'
import dayjs from 'dayjs'
import { PUBLIC_DOMAIN } from '$env/static/public' 
import { CRON_KEY } from '$env/static/private'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const getValueFromDatabase = async (table, email, field) => {
  if (table == 'Payments') {
    const response = await supabaseAdmin
      .from(table)
      .select('*')
        .eq('email', email)
        .eq('taxYear', currentTaxYear)
        .single()
    return response.data?.[field]
  }
  else if (table == 'Users') {
    const response = await supabaseAdmin
      .from(table)
      .select('*')
      .eq('email', email)
      .single()
    return response.data?.[field]
  }
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

const sendFiveDayEmail = async (id) => {
  await axios.post(`${PUBLIC_DOMAIN}/api/email`, {
    to: 'davemohla@gmail.com',
    subject: 'Your quarterly tax payment is due soon',
    template: 'fiveday',
    id: id
  })
}

const sendOneDayEmail = async (id) => {
  await axios.post(`${PUBLIC_DOMAIN}/api/email`, {
    to: 'davemohla@gmail.com',
    subject: 'Your quarterly payment is due',
    template: 'oneday',
    id: id
  })
}

const sendRemindersSentEmail = async (message) => {
  await axios.post(`${PUBLIC_DOMAIN}/api/email`, {
    to: 'davemohla@gmail.com',
    subject: 'Reminders sent',
    template: 'reminderssent',
    message: message
  })
}

const GET = async ({ url }) => {
  try {
    const token = url.searchParams.get('cron_key')

    if (token == CRON_KEY) {
      const emails = await getEmails()
      const message = []
      for (const email of emails) {

        const payPreference = await getValueFromDatabase('Payments', email, 'payPreference')
        const sendReminders = await getValueFromDatabase('Users', email, 'sendReminders')
        const sendFiveDayReminder = await getValueFromDatabase('Users', email, 'sendFiveDayReminder')
        const sendOneDayReminder = await getValueFromDatabase('Users', email, 'sendOneDayReminder')
        const id = await getValueFromDatabase('Users', email, 'id')
        const q1FederalMarkPaid = await getValueFromDatabase('Payments', email, 'q1FederalMarkPaid')
        const q1StateMarkPaid = await getValueFromDatabase('Payments', email, 'q1StateMarkPaid')
        const q2FederalMarkPaid = await getValueFromDatabase('Payments', email, 'q2FederalMarkPaid')
        const q2StateMarkPaid = await getValueFromDatabase('Payments', email, 'q2StateMarkPaid')
        const q3FederalMarkPaid = await getValueFromDatabase('Payments', email, 'q3FederalMarkPaid')
        const q3StateMarkPaid = await getValueFromDatabase('Payments', email, 'q3StateMarkPaid')
        const q4FederalMarkPaid = await getValueFromDatabase('Payments', email, 'q4FederalMarkPaid')
        const q4StateMarkPaid = await getValueFromDatabase('Payments', email, 'q4StateMarkPaid')
        const q1federalQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q1federalQuarterlyPayment')
        const q2federalQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q2federalQuarterlyPayment')
        const q3federalQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q3federalQuarterlyPayment')
        const q4federalQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q4federalQuarterlyPayment')
        const q1StateQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q1StateQuarterlyPayment')
        const q2StateQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q2StateQuarterlyPayment')
        const q3StateQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q3StateQuarterlyPayment')
        const q4StateQuarterlyPayment = await getValueFromDatabase('Payments', email, 'q4StateQuarterlyPayment')

        if (payPreference == 'quarter') {
          if (sendReminders) {
            if (sendFiveDayReminder) {
              if (currentTaxQuarter == 'Q1') {
                if (q1DueDate && dayjs().isSame(q1DueDate.subtract(5, 'days'), 'day')) {
                  if (!(q1FederalMarkPaid && q1StateMarkPaid && (q1federalQuarterlyPayment == 0) && (q1StateQuarterlyPayment == 0))) {
                    await sendFiveDayEmail(id)
                    message.push(`Sent 5 day reminder email to ${email}`)
                  }
                }
              }
              else if (currentTaxQuarter == 'Q2') {
                if (q2DueDate && dayjs().isSame(q2DueDate.subtract(5, 'days'), 'day')) {
                  if (!(q2FederalMarkPaid && q2StateMarkPaid && (q2federalQuarterlyPayment == 0) && (q2StateQuarterlyPayment == 0))) {
                    await sendFiveDayEmail(id)
                    message.push(`Sent 5 day reminder email to ${email}`)
                  }
                }
              }
              else if (currentTaxQuarter == 'Q3') {
                if (q3DueDate && dayjs().isSame(q3DueDate.subtract(5, 'days'), 'day')) {
                  if (!(q3FederalMarkPaid && q3StateMarkPaid && (q3federalQuarterlyPayment == 0) && (q3StateQuarterlyPayment == 0))) {
                    await sendFiveDayEmail(id)  
                    message.push(`Sent 5 day reminder email to ${email}`)
                  }
                }
              } 
              else if (currentTaxQuarter == 'Q4') {
                if (q4DueDate && dayjs().isSame(q4DueDate.subtract(5, 'days'), 'day')) {
                  if (!(q4FederalMarkPaid && q4StateMarkPaid && (q4federalQuarterlyPayment == 0) && (q4StateQuarterlyPayment == 0))) {
                    await sendFiveDayEmail(id)  
                    message.push(`Sent 5 day reminder email to ${email}`)
                  }
                }
              }
            }
            if (sendOneDayReminder) {
              if (currentTaxQuarter == 'Q1') {
                if (q1DueDate && dayjs().isSame(q1DueDate.subtract(1, 'day'), 'day')) {
                  if (!(q1FederalMarkPaid && q1StateMarkPaid && (q1federalQuarterlyPayment == 0) && (q1StateQuarterlyPayment == 0))) {
                    await sendOneDayEmail(id)     
                    message.push(`Sent 1 day reminder email to ${email}`)
                  }
                }
              }
              else if (currentTaxQuarter == 'Q2') {
                if (q2DueDate && dayjs().isSame(q2DueDate.subtract(1, 'day'), 'day')) {
                  if (!(q2FederalMarkPaid && q2StateMarkPaid && (q2federalQuarterlyPayment == 0) && (q2StateQuarterlyPayment == 0))) {
                    await sendOneDayEmail(id)   
                    message.push(`Sent 1 day reminder email to ${email}`)
                  }
                } 
              }
              else if (currentTaxQuarter == 'Q3') {
                if (q3DueDate && dayjs().isSame(q3DueDate.subtract(1, 'day'), 'day')) {
                  if (!(q3FederalMarkPaid && q3StateMarkPaid && (q3federalQuarterlyPayment == 0) && (q3StateQuarterlyPayment == 0))) {
                    await sendOneDayEmail(id)   
                    message.push(`Sent 1 day reminder email to ${email}`)
                  }
                }
              }
              else if (currentTaxQuarter == 'Q4') {
                if (q4DueDate && dayjs().isSame(q4DueDate.subtract(1, 'day'), 'day')) {
                  if (!(q4FederalMarkPaid && q4StateMarkPaid && (q4federalQuarterlyPayment == 0) && (q4StateQuarterlyPayment == 0))) {
                    await sendOneDayEmail(id)
                    message.push(`Sent 1 day reminder email to ${email}`)
                  }
                }
              }
            }
          }
        }
      }
      if (message.length > 0) {
        await sendRemindersSentEmail(message.join('\n'))
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