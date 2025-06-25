<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { supabase } from '$src/utilities/supabase'
  import { global } from '$src/data/global.svelte'
  import { saveToUsers, saveToPayments } from '$src/utilities/database'
  import { updateLoginState } from '$src/utilities/utilities'
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'  
  import Loading from '$src/components/app/Loading.svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  import axios from 'axios'
  import { priceId } from '$src/settings/settings'
    import { consoleLoggingIntegration } from '@sentry/sveltekit';

  const expiredText = `This link has expired`
  const expiredButtonText = 'BACK TO HOME'

  let pageExpired = $state(false) 

  onMount(async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    if (error) {
      pageExpired = true
      global.makeButtonActive = true
    }
    else {
      const response = await supabase.auth.getSession()
      const session = response.data.session
      if (session) {
        await updateLoginState(session)
        if (getLocalStorage('loginLocation') == 'home') {
          goto('/')
        }
        else if (getLocalStorage('loginLocation') == 'later') {
          goto('/')
          global.showResumeBanner = true
        }
        else if (getLocalStorage('loginLocation') == 'flow') {
          goto('/checkout')
          await saveToUsers()
          await saveToPayments()
        }
        else if (getLocalStorage('loginLocation') == 'dashboard') {
          goto(`/dashboard`)
          await user.setValue('currentPage', 'dashboard')
        }
      }
    }
  })

  const handleClick = async () => {
    goto('/')
    await user.setValue('currentPage', '0')
  }

</script>

{#if pageExpired}
  <Header hideIcons={true} hideBack={true} />
  <Avatar />
  <Heading text={expiredText} desktopwidth="500px" mobilelarge={true}  />
  <Button text={expiredButtonText} dark={true} onclick={handleClick} />
{:else}
  <Header hideBack={true} />
  <Avatar />
  <Loading />
{/if}
