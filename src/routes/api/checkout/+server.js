import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { STRIPE_KEY } from '$env/static/private'
import { PUBLIC_DOMAIN } from '$env/static/public'

const stripe = new Stripe(STRIPE_KEY)

const POST = async ({ request }) => {
  try {
    const { email, oneTimePriceId, recurringPriceId } = await request.json()

    let customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } 
    else {
      customer = await stripe.customers.create({
        email: email
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customer.id,
      line_items: [{
        price: oneTimePriceId,
        quantity: 1,
      }],
      success_url: `${PUBLIC_DOMAIN}/subscribed`,
      cancel_url: `${PUBLIC_DOMAIN}/29`,
      automatic_tax: { enabled: true },
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto',
      },
      payment_method_types: ['card'],
      metadata: {
        create_subscription: 'true',
        recurring_price_id: recurringPriceId
      }
    })

    return json({ url: session.url })
  }
  catch (error) {
    console.error('Checkout error:', error)
    return json({ error: error.message }, { status: 400 })
  }
}

export { POST }