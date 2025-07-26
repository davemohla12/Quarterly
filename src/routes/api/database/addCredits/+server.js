import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const POST = async ({ request }) => {

  const { email, amount } = await request.json()

  const response = await supabaseAdmin
    .from('Users')
    .select('credits')
    .eq('email', email)
    .maybeSingle()

  const currentCredits = response.data?.credits || 0
  const newCredits = currentCredits + amount
  
  await supabaseAdmin
    .from('Users')
    .update({ credits: newCredits })
    .eq('email', email)

  return json({ success: true })
}

export { POST}