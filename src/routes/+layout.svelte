<script>
  import { onMount } from 'svelte'
  import { supabase } from '$src/utilities/supabase'
  import { updateLoginState } from '$src/utilities/utilities'
  import * as Sentry from '@sentry/browser'
  import { PUBLIC_ENVIRONMENT } from '$env/static/public' 
  import { global } from '$src/data/global.svelte'
  
  let props = $props()
  let children = props.children
  let loading = $state(true)
  
  onMount(async () => {
    loading = true
    const response = await supabase.auth.getSession()
    const session = response.data.session
    await updateLoginState(session)
    Sentry.setUser({ email: global.email })
    supabase.auth.onAuthStateChange((event, session) => {
      updateLoginState(session)
    })
    loading = false
  })

  if (PUBLIC_ENVIRONMENT === 'production') {
    Sentry.init({
      dsn: 'https://becf5f803df68fae670aabf0b72357e3@o4509491485016064.ingest.us.sentry.io/4509491487768576',
      environment: PUBLIC_ENVIRONMENT
    })
  }
  </script>
  
  {#if loading}
    <div></div>
  {:else}
    {@render children()}
  {/if}