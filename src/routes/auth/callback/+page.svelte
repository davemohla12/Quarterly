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
  import { getLocalStorage, setLocalStorage} from '$src/utilities/utilities'
  import Subheading from '$src/components/app/Subheading.svelte'
  import { getFromUsers, addCredits, removeCredits } from '$src/utilities/database'
  import { referralAmount } from '$src/settings/settings'

  let expiredText = $state(``)
  let expiredButtonText = $state('')
  let subheadingText = $state(``)
  let pageExpired = $state(false) 
  let refer = $state(false)

  onMount(async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    if (error) {
      const pendingEmail = getLocalStorage('pendingEmailConfirmation')
      pageExpired = true
      global.makeButtonActive = true
      if (pendingEmail) {
        expiredText = 'Confirmation Link Expired'
        subheadingText = 'Log in again to confirm your email'
        expiredButtonText = 'GO TO LOG IN'
      }
      else {
        expiredText = 'Email Confirmed'
        subheadingText = 'You can log in now'
        expiredButtonText = 'GO TO LOGIN'
      }
    }
    else {
      localStorage.removeItem('pendingEmailConfirmation')
      const response = await supabase.auth.getSession()
      const session = response.data.session
      if (session) {
        const loginLocation = getLocalStorage('loginLocation')
        if (loginLocation == 'home') {
          await createUserIfNotExists()
          await saveToPayments()
          await addReferralCredits()
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

  const addReferralCredits = async () => {
    refer = getLocalStorage('showReferralCredits')
    if (refer) {
      const latestTaxYearPaid = await getFromUsers('latestTaxYearPaid')
      const currentCredits = await getFromUsers('credits')
      if (!latestTaxYearPaid) { 
        if (currentCredits > 0) { 
          await removeCredits(global.email, currentCredits)
        }
        await addCredits(global.email, referralAmount)
        setLocalStorage('showCreditsAppliedDialog', true)
      }
      else {
        setLocalStorage('showNewUsersDialog', true)
      }
      setLocalStorage('showReferralCredits', false)
    }
  }

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
