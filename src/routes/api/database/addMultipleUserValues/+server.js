import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const POST = async ({ request }) => {
  const { fieldValuePairs, email } = await request.json()
  
  const fields = Object.keys(fieldValuePairs)
  
  const response = await supabaseAdmin
    .from('Users')
    .select(fields.join(','))
    .eq('email', email)
    .maybeSingle()
  
  const updates = {}
  for (const [field, value] of Object.entries(fieldValuePairs)) {
    let currentArray = response.data?.[field] || []
    if (!currentArray.includes(value)) {
      currentArray.push(value)
    }
    updates[field] = currentArray
  }
  
  await supabaseAdmin
    .from('Users')
    .update(updates)
    .eq('email', email)
    
  return json({ success: true })
}

export { POST}