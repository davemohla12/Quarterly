import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const POST = async ({ request }) => {

  const { email, currentTaxYear } = await request.json()
  
  const response = await supabaseAdmin
    .from('Payments')
    .select('taxYear')
    .eq('email', email)
    .neq('taxYear', currentTaxYear)
    .order('taxYear', { ascending: false })

  return json({ years: response.data.map(row => row.taxYear) })
}

export { POST}