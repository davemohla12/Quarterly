import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { STRIPE_KEY } from '$env/static/private'

const stripe = new Stripe(STRIPE_KEY)

const POST = async ({ request }) => {
  const { sessionId } = await request.json()

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent']
  })

  return json({ 
    paymentId: session.payment_intent.id,
  })
}

export { POST}