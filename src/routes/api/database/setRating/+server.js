import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const POST = async ({ request }) => {
  const { email, date, rating, feedback } = await request.json()
  
  const existingResponse = await supabaseAdmin
    .from('Ratings')
    .select('*')
    .eq('email', email)
    .eq('date', date)
    .maybeSingle()

  console.log(existingResponse)

  if (existingResponse.data) {
    await supabaseAdmin
      .from('Ratings')
      .update({ rating, feedback })
      .eq('email', email)
      .eq('date', date)
  }
  else {
    await supabaseAdmin
      .from('Ratings')
      .insert({ email, date, rating, feedback })
  }
  return json({ success: true })
}

export { POST}