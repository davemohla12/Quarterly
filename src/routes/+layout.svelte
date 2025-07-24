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
    <!-- Meta Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1153115809991171');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none" alt="Meta Pixel"
      src="https://www.facebook.com/tr?id=1153115809991171&ev=PageView&noscript=1"
      />
    </noscript>
    <!-- End Meta Pixel Code -->
  </svelte:head>
  
  {#if loading}
    <div></div>
  {:else}
    {@render children()}
  {/if}