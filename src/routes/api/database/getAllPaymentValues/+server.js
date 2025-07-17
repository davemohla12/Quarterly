import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const parseJsonFields = (data) => {
  if (!data) return data
  const jsonFields = ['otherStatesToPay']
  const parsedData = { ...data }
  jsonFields.forEach(field => {
    if (parsedData[field] && typeof parsedData[field] === 'string') {
      if (parsedData[field] === 'undefined' || parsedData[field] === 'null') {
        parsedData[field] = []
        return
      }
      try {
        parsedData[field] = JSON.parse(parsedData[field])
      } catch (error) {
        parsedData[field] = []
      }
    }
    if (!parsedData[field]) {
      parsedData[field] = []
    }
  })
  return parsedData
}

export async function POST({ request }) {
  const { email, taxYear } = await request.json()
  
  const response = await supabaseAdmin
    .from('Payments')
    .select('*')
    .eq('email', email)
    .eq('taxYear', taxYear)
    .maybeSingle()

  const parsedData = parseJsonFields(response.data)

  return json({ values: parsedData })
}