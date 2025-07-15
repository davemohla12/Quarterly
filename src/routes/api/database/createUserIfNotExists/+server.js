import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

export async function POST({ request }) {
  const { email, referrerEmail, currentPage, referralCode } = await request.json()

  let response = await supabaseAdmin
    .from('Users')
    .select('*')
    .eq('email', email)
    .maybeSingle()
  
  if (!response.data) {
    const insertData = {
      email: email,
      sendReminders: true,
      sendFiveDayReminder: true,
      sendOneDayReminder: true,
      referralCode: referralCode,
      referrerEmail: referrerEmail
    }
    if (currentPage) {
      insertData.currentPage = currentPage
    }
    await supabaseAdmin
      .from('Users')
      .insert(insertData)
  }
  else if (response.data && referrerEmail) {
    await supabaseAdmin
      .from('Users')
      .update({ 
        referrerEmail: referrerEmail 
      })
      .eq('email', email)
  }
  
  return json({ success: true })
}