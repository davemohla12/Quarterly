import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

export async function POST({ request }) {
  const { email, taxYear, localStorageData } = await request.json()
  
  let response = await supabaseAdmin
    .from('Payments')
    .select('*')
    .eq('email', email)
    .eq('taxYear', taxYear)
    .maybeSingle()

  if (!response.data) {
    await supabaseAdmin
      .from('Payments')
      .insert({
        email: email,
        taxYear: taxYear,
        showPaidDates: true
      })
    response = await supabaseAdmin
      .from('Payments')
      .select('*')
      .eq('email', email)
      .eq('taxYear', taxYear)
      .maybeSingle()
  }
  
  const updateData = {}
  for (const field of Object.keys(response.data)) {
    if (field != 'id' && field != 'created_at' && field != 'email' && field != 'taxYear' && field != 'showPaidDates') {
      updateData[field] = localStorageData?.[field] ?? null
    }
  }
  
  await supabaseAdmin
    .from('Payments')
    .update(updateData)
    .eq('email', email)
    .eq('taxYear', taxYear)

  return json({ success: true })
}