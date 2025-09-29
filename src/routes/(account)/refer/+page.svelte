<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Refer from '$src/components/app/Refer.svelte'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'
  import { formatCurrency } from '$src/utilities/utilities'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'
  import { setLocalStorage } from '$src/utilities/utilities'
  import { referralAmount } from '$src/settings/settings'

  let headingText = `Refer a friend and you both get $${referralAmount}`

  let referralCode = $state()
  let credits = $state()

  onMount(async () => {
    if (!global.loggedIn) {
      setLocalStorage('loginLocation', 'refer')
      goto('/login')
    } 
    referralCode = await user.getValue('referralCode')
    credits = formatCurrency(await user.getValue('credits') || 0)
    await user.setValue('showReferralBanner', false)
  })

</script> 

<Header showAccountIcon={true} />
<Avatar />
<Heading text={headingText} desktopwidth="575px" mobilewidth="300px" />
<Refer referralCode={referralCode} credits={credits} />

