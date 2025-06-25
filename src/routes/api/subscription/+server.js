import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { STRIPE_KEY } from '$env/static/private'
import { PUBLIC_DOMAIN } from '$env/static/public'

const stripe = new Stripe(STRIPE_KEY)

const POST = async ({ request }) => {
  try {
    const { email } = await request.json()
    
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    })

    if (existingCustomers.data.length === 0) {
      return json({ error: 'No customer found' }, { status: 404 })
    }

    const customer = existingCustomers.data[0]
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${PUBLIC_DOMAIN}/dashboard`,
    })

    return json({ url: portalSession.url })
  }
  catch (error) {
    console.error('Customer portal error:', error)
    return json({ error: error.message }, { status: 400 })
  }
}

export { POST }