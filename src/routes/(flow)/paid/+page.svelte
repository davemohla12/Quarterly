<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { currentTaxYear } from '$src/settings/settings'
  import { addCredits, removeCredits } from '$src/utilities/database'
  import { page } from '$app/stores'
  import { global } from '$src/data/global.svelte'  
  import axios from 'axios'

  onMount(async () => {
    const creditsUsed = $page.url.searchParams.get('credits') || 0
    const sessionId = $page.url.searchParams.get('session_id')
    await user.setValue('latestTaxYearPaid', currentTaxYear)
    await user.addValue('taxYearsPaid', currentTaxYear)
    let paymentId = null
    if (sessionId) {
      const response = await axios.post('/api/payment', { sessionId: sessionId })
      paymentId = response.data.paymentId
    }
    if (paymentId) {
      await user.setValue('lastPaymentId', paymentId)
    }
    if (creditsUsed > 0) {
      await removeCredits(global.email, creditsUsed)
    }
    const referrerEmail = await user.getValue('referrerEmail')
    const taxYearsPaid = await user.getValue('taxYearsPaid')
    if (referrerEmail && taxYearsPaid.length == 1) {
      await addReferralCredits(referrerEmail)
    }
    await user.setValue('currentPage', 'dashboard')
    goto('/dashboard')
  })

  const addReferralCredits = async (referrerEmail) => {
    await addCredits(referrerEmail, 5)
    await axios.post('/api/email', {
      to: referrerEmail,
      subject: 'You earned $5 in credits',
      template: 'credits',
      credits: 5
    })
  }

</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />