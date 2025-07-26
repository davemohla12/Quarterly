import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const POST = async ({ request }) => {
  const { email, localStorageData } = await request.json()
  
  let response = await supabaseAdmin
  .from('Users')
  .select('*')
  .eq('email', email)
  .maybeSingle()

  if (!response.data) {
    await supabaseAdmin
      .from('Users')
      .insert({
        email: email,
        sendReminders: true,
        sendFiveDayReminder: true,
        sendOneDayReminder: true,
      })
    response =await supabaseAdmin
      .from('Users')
      .select('*')
      .eq('email', email)
      .maybeSingle()
   }

  const updateData = {}
  for (const field of Object.keys(response.data)) {
    if (field != 'id' && field != 'created_at' && field != 'email') {
      updateData[field] = localStorageData[field] 
    }
  }
  await supabaseAdmin
    .from('Users')
    .update(updateData)
    .eq('email', email)

  return json({ success: true })
}

export { POST}