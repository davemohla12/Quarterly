import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { STRIPE_KEY } from '$env/static/private'
import { PUBLIC_DOMAIN } from '$env/static/public'

const stripe = new Stripe(STRIPE_KEY)

const POST = async ({ request }) => {
  try {
    const { email, priceId, credits } = await request.json()

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

    const price = await stripe.prices.retrieve(priceId)
    const originalAmount = price.unit_amount
    const creditsToApply = credits && credits > 0 ? Math.min(credits, price.unit_amount / 100) : 0
    const finalAmount = originalAmount - (creditsToApply * 100)

    if (finalAmount <= 0) {
      return json({ 
        url: `${PUBLIC_DOMAIN}/free?credits=${creditsToApply}`,
        customer_id: customer.id,
        price: 0,
        creditsApplied: creditsToApply,
        isFree: true
      })
    }

    const lineItems = [{
      price: priceId,
      quantity: 1,
    }]

    const sessionConfig = {
      mode: 'payment',
      customer: customer.id,
      line_items: lineItems,
      success_url: `${PUBLIC_DOMAIN}/paid?session_id={CHECKOUT_SESSION_ID}&credits=${creditsToApply}&price=${price.unit_amount / 100}&stripeCustomerId=${customer.id}`,
      cancel_url: `${PUBLIC_DOMAIN}/29`,
      automatic_tax: { enabled: true },
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto',
      },
      payment_method_types: ['card', 'link'],
      payment_intent_data: {
        receipt_email: email  
      }
    }

    if (creditsToApply > 0) {
      const coupon = await stripe.coupons.create({
        name: 'Credits Applied',
        amount_off: creditsToApply * 100,
        currency: 'usd',
        duration: 'once'
      })
      sessionConfig.discounts = [{  
        coupon: coupon.id
      }]
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return json({ 
      url: session.url, 
      customer_id: customer.id,
      price: price.unit_amount / 100,
      creditsApplied: creditsToApply
    })
  }
  catch (error) {
    console.error('Checkout error:', error)
    return json({ error: error.message }, { status: 400 })
  }
}

export { POST }