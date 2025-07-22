<script>
  import { onMount } from 'svelte'
  import { supabase } from '$src/utilities/supabase'
  import { updateLoginState } from '$src/utilities/utilities'
  import * as Sentry from '@sentry/browser'
  import { PUBLIC_ENVIRONMENT } from '$env/static/public' 
  import { global } from '$src/data/global.svelte'
  import { safePostHog } from '$src/utilities/posthog'
  
  let props = $props()
  let children = props.children
  let loading = $state(true)
  
  onMount(async () => {
    loading = true
    const response = await supabase.auth.getSession()
    const session = response.data.session
    await updateLoginState(session)
    if (session && session.user) {
      global.email = session.user.email
      Sentry.setUser({ email: global.email })
      safePostHog.identify(session.user.id, {
        email: global.email
      })
    }
    supabase.auth.onAuthStateChange((event, session) => {
      updateLoginState(session)
      if (event === 'SIGNED_IN' && session?.user) {
        safePostHog.identify(session.user.id, {
          email: session.user.email,
        })
      } 
      else if (event === 'SIGNED_OUT') {
        safePostHog.reset() 
      }
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

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1040756020"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-1040756020');
  </script>
</svelte:head>
  
  {#if loading}
    <div></div>
  {:else}
    {@render children()}
  {/if}