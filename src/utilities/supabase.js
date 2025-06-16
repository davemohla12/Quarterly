// import { createClient } from '@supabase/supabase-js'
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'

// const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

// export { supabase } 

import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'

console.log('Initializing Supabase client with:', {
  url: PUBLIC_SUPABASE_URL,
  hasKey: !!PUBLIC_SUPABASE_KEY
})

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  },
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
})

// Add error handling for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', { event, session })
})

export { supabase }