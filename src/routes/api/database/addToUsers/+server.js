import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const POST = async ({ request }) => {

  const { field, value, email } = await request.json()

  const response = await supabaseAdmin
    .from('Users')
    .select(field)
    .eq('email', email)
    .maybeSingle()  

  let currentArray = response.data?.[field] || []
  if (!currentArray.includes(value)) {
    currentArray.push(value)
  }

  await supabaseAdmin
    .from('Users')
    .update({ [field]: currentArray })
    .eq('email', email)

  return json({ success: true})

}

export { POST}