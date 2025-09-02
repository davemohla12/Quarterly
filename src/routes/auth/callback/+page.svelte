<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { supabase } from '$src/utilities/supabase'
  import { global } from '$src/data/global.svelte'
  import { saveToPayments, createUserIfNotExists } from '$src/utilities/database'
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'  
  import Loading from '$src/components/app/Loading.svelte'
  import { user } from '$src/data/user.svelte'
  import { getLocalStorage } from '$src/utilities/utilities'
  import Subheading from '$src/components/app/Subheading.svelte'

  const expiredText = `Email Confirmed`
  const expiredButtonText = 'GO TO LOGIN'
  const subheadingText = `You can now log in`

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
        const loginLocation = getLocalStorage('loginLocation')
        if (loginLocation == 'home') {
          goto('/')
        }
        else if (loginLocation == 'later') {
          await createUserIfNotExists()
          await user.setValue('currentPage', getLocalStorage('currentPage'))
          await saveToPayments()
          global.showResumeBanner = true
          goto('/')
        }
        else if (loginLocation == 'flow') {
          await createUserIfNotExists()
          await user.setValue('currentPage', 'checkout')
          await saveToPayments()
          goto('/checkout')
        }
        else if (loginLocation == 'dashboard') {
          goto(`/dashboard`)
          await user.setValue('currentPage', 'dashboard')
        }
        else if (loginLocation == 'refer') {
          goto('/refer')
          await user.setValue('currentPage', 'refer')
        }
      }
    }
  })

  const handleClick = async () => {
    goto('/login')
    await user.setValue('currentPage', '0')
  }

</script>

{#if pageExpired}
  <Header hideIcons={true} hideBack={true} />
  <Avatar />
  <Heading text={expiredText} desktopwidth="500px" mobilelarge={true}  />
  <Subheading text={subheadingText} desktopwidth="500px" />
  <Button text={expiredButtonText} dark={true} onclick={handleClick} />
{:else}
  <Header hideIcons={true} hideBack={true}  />
  <Avatar />
  <Loading />
{/if}
