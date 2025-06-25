import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private'
import { supabase } from '$src/utilities/supabase'
import dayjs from 'dayjs'

const stripe = new Stripe(STRIPE_KEY)

const updateLatestTaxYearPaid = async (customerEmail) => {
  const currentTaxYear = dayjs().year()
  
  const response = await supabase
    .from('Users')
    .update({ latestTaxYearPaid: currentTaxYear })
    .eq('email', customerEmail)
  
  if (response.error) {
    console.error('Failed to update latestTaxYearPaid:', response.error)
  } else {
    console.log(`Updated latestTaxYearPaid to ${currentTaxYear} for customer: ${customerEmail}`)
  }
}

export async function POST({ request }) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } 
  catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Handle subscription renewals only
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object

    // Only process if this is a subscription invoice (not one-time payments)
    if (invoice.subscription) {
      try {
        const customer = await stripe.customers.retrieve(invoice.customer)
        await updateLatestTaxYearPaid(customer.email)
        
        console.log('Updated latestTaxYearPaid for subscription renewal:', customer.email)
      }
      catch (error) {
        console.error('Failed to update latestTaxYearPaid:', error)
      }
    }
  }

  return json({ received: true })
}