<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { supabase } from '$src/utilities/supabase'
  import { store } from '$src/stores/store.svelte'
  import { saveDatabaseToLocalStorage, saveLocalStorageToDatabase } from '$src/utilities/database'
  import { updateLoginState } from '$src/utilities/utilities'
  import { getCurrentPageFromDatabase } from '$src/utilities/database'
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'  
  import Loading from '$src/components/app/Loading.svelte'
  
  const expiredText = `This link has expired`
  const expiredButtonText = 'BACK TO HOME'

  let pageExpired = $state(false) 

  onMount(async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    if (error) {
      pageExpired = true
      store.makeButtonActive = true
    }
    else {
      const response = await supabase.auth.getSession()
      const session = response.data.session
      if (session) {
        await updateLoginState(session)
        if (store.loginLocation == 'home') {
          await saveDatabaseToLocalStorage()
          store.currentPage = await getCurrentPageFromDatabase()
          goto('/')
        }
        else if (store.loginLocation == 'later') {
          await saveLocalStorageToDatabase()
          goto('/')
          store.showResumeBanner = true
        }
        else if (store.loginLocation == 'flow') {
          store.currentPage = 'dashboard'
          await saveLocalStorageToDatabase()
          goto(`/${store.currentPage}`)
        }
      }
    }
  })

  const handleClick = () => {
    store.currentPage = '0'
    goto('/')
  }

</script>

{#if pageExpired}
  <Header hideIcons={true} hideBack={true} />
  <Avatar />
  <Heading text={expiredText} desktopwidth="500px" mobilelarge={true}  />
  <Button text={expiredButtonText} dark={true} onclick={handleClick} />
{:else}
  <Header />
  <Avatar />
  <Loading />
{/if}
