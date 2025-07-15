import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { STRIPE_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'
import dayjs from 'dayjs'

const stripe = new Stripe(STRIPE_KEY)

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const POST = async ({ request }) => {
  try { 
   const { email, taxYear, reason } = await request.json()

    const userResponse = await supabaseAdmin
    .from('Users')
    .select('lastPaymentId','refundedTaxYears')
    .eq('email', email)
    .single()

    const paymentId = userResponse.data.lastPaymentId

    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
      reason: 'requested_by_customer',
      metadata: {
        email: email,
        taxYear: taxYear?.toString() || 'null'
      }
    })

    let refundedTaxYears = userResponse.data.refundedTaxYears || []
    if (!refundedTaxYears.includes(taxYear)) {
      refundedTaxYears.push(taxYear)
    }

    await supabaseAdmin
    .from('Users')
    .update({ 
      refundedTaxYears: refundedTaxYears 
    })
    .eq('email', email)

    await supabaseAdmin
    .from('Payments')
    .delete()
    .eq('email', email)
    .eq('taxYear', taxYear)

    await supabaseAdmin
    .from('Users')
    .update({
      latestTaxYearPaid: null
    })
    .eq('email', email)

    await supabaseAdmin
    .from('Refunds')
    .insert({
      email: email,
      taxYear: taxYear,
      amount: refund.amount / 100,
      reason: reason,
      refundId: refund.id,
      paymentId: paymentId,
      refundDate: dayjs().format('YYYY-MM-DD')
    })

    return json({ 
      success: true, 
      amount: refund.amount / 100,
    })
  } 
  catch (error) {
    console.error(error)
    return json({ 
      success: false, 
      error: error.message 
    })
  }
}

export { POST }