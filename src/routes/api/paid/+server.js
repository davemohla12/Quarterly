import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { STRIPE_KEY, STRIPE_PAID_WEBHOOK } from '$env/static/private'
import dayjs from 'dayjs'

const stripe = new Stripe(STRIPE_KEY)

const getNextFebruaryFirst = () => {
  const currentYear = dayjs().year()
  const nextFebruary = dayjs(`${currentYear + 1}-02-01`)
  return nextFebruary.unix()
}

const POST = async ({ request }) => {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  let event
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_PAID_WEBHOOK)
  } 
  catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.metadata?.create_subscription === 'true') {
      try {
        const billingCycleAnchor = getNextFebruaryFirst()
        
        await stripe.subscriptions.create({
          customer: session.customer,
          items: [{
            price: session.metadata.recurring_price_id,
            quantity: 1,
          }],
          billing_cycle_anchor: billingCycleAnchor,
          proration_behavior: 'none'
        })
        
        console.log('Subscription created successfully for customer:', session.customer)
      }
      catch (error) {
        console.error('Failed to create subscription:', error)
      }
    }
  }

  return json({ received: true })
}

export { POST }