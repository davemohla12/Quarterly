import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

export async function POST({ request }) {
  const { email, taxYear } = await request.json()
  
  await supabaseAdmin
  .from('Payments')
  .insert({
    email: email,
    taxYear: taxYear,
    showPaidDates: true
  })

  return json({ success: true})
}