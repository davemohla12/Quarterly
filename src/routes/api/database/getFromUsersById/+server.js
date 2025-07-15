import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

export async function POST({ request }) {
  const { id, field } = await request.json()
  
  const response = await supabaseAdmin
  .from('Users')
  .select('*')
  .eq('id', id)
  .maybeSingle()

  return json({ [field]: response.data?.[field] })
}