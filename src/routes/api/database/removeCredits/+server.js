import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

export async function POST({ request }) {

  const { email, amount } = await request.json()

  const selectResponse = await supabaseAdmin
    .from('Users')
    .select('credits')
    .eq('email', email)
    .maybeSingle()

  if (selectResponse.error) {
    return json({ success: false, error: selectResponse.error })
  }

  const currentCredits = selectResponse.data?.credits || 0
  let newCredits = currentCredits - amount
  if (newCredits < 0) {
    newCredits = 0
  }

  await supabaseAdmin
    .from('Users')
    .update({ credits: newCredits })
    .eq('email', email)

  return json({ success: true })
}