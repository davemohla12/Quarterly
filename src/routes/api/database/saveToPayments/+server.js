import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

export async function POST({ request }) {
  console.log('🔍 saveToPayments endpoint called')
  
  try { 
    const { email, taxYear, localStorageData } = await request.json()

    console.log('📧 Request data:', {
      email: email,
      taxYear: taxYear,
      localStorageDataKeys: localStorageData ? Object.keys(localStorageData) : null,
      localStorageDataSize: localStorageData ? Object.keys(localStorageData).length : 0
    })
    
    console.log('🔍 Checking for existing payment record...')
    let response = await supabaseAdmin
      .from('Payments')
      .select('*')
      .eq('email', email)
      .eq('taxYear', taxYear)
      .maybeSingle()

    console.log('📊 Initial query result:', {
        hasData: !!response.data,
        error: response.error,
        dataId: response.data?.id
      })

    if (response.error) {
      console.log('❌ Error querying existing payment:', response.error)
      return json({ success: false, error: 'Database query failed' }, { status: 500 })
    }

    if (!response.data) {
      console.log('➕ Creating new payment record...')
      const insertResult = await supabaseAdmin
        .from('Payments')
        .insert({
          email: email,
          taxYear: taxYear,
          showPaidDates: true
        })
      
      console.log('📝 Insert result:', {
        error: insertResult.error,
        status: insertResult.status,
        statusText: insertResult.statusText
      })

      if (insertResult.error) {
        console.log('❌ Error creating payment record:', insertResult.error)
        return json({ success: false, error: 'Failed to create payment record' }, { status: 500 })
      }
      
      console.log('🔄 Fetching newly created record...')
      response = await supabaseAdmin
        .from('Payments')
        .select('*')
        .eq('email', email)
        .eq('taxYear', taxYear)
        .maybeSingle()

      console.log('🆕 New record fetched:', {
        hasData: !!response.data,
        error: response.error,
        dataId: response.data?.id
      })
    }
    
    console.log('🔧 Preparing update data...')
    const updateData = {}
    for (const field of Object.keys(response.data)) {
      if (field != 'id' && field != 'created_at' && field != 'email' && field != 'taxYear' && field != 'showPaidDates') {
        updateData[field] = localStorageData?.[field] ?? null
      }
    }

    console.log('📝 Update data prepared:', {
      fieldsToUpdate: Object.keys(updateData).length,
      fields: Object.keys(updateData)
    })
    
    console.log('💾 Updating payment record...')
    const updateResult = await supabaseAdmin
      .from('Payments')
      .update(updateData)
      .eq('email', email)
      .eq('taxYear', taxYear)
    
    console.log('✅ Update result:', {
        error: updateResult.error,
        status: updateResult.status,
        statusText: updateResult.statusText
      })

    if (updateResult.error) {
      console.error('❌ Error updating payment record:', updateResult.error)
      return json({ success: false, error: 'Failed to update payment record' }, { status: 500 })
    }
    
    console.log('🎉 saveToPayments completed successfully')
    return json({ success: true })
  }
  catch (error) {
    console.log('💥 Unexpected error in saveToPayments:', error)
    console.log('Stack trace:', error.stack)
    return json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}