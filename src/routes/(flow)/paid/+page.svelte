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
  import dayjs from 'dayjs'
  import { safePostHog } from '$src/utilities/posthog'

  onMount(async () => {
    const creditsUsed = $page.url.searchParams.get('credits') || 0
    const sessionId = $page.url.searchParams.get('session_id')
    const price = $page.url.searchParams.get('price')
    const stripeCustomerId = $page.url.searchParams.get('stripeCustomerId')
    let paymentId = null
    if (sessionId) {
      const response = await axios.post('/api/payment', { sessionId: sessionId })
      paymentId = response.data.paymentId
    }
    if (paymentId) {
      const totalPayments = await user.getValue('totalPayments')
      await Promise.all([
        user.setValue('latestTaxYearPaid', currentTaxYear),
        user.addValue('taxYearsPaid', currentTaxYear),
        user.setValue('stripeCustomerId', stripeCustomerId),
        user.setValue('lastPaymentAmount', price),
        user.setValue('lastPaymentDate', new Date().toISOString()),
        user.addValue('paymentDates', new Date().toISOString()),
        user.setValue('totalPayments', totalPayments + 1),
        user.setValue('sendRatingsEmailOn', dayjs().add(3, 'day').toISOString()),
        user.setValue('lastPaymentId', paymentId)
      ])
      if (creditsUsed > 0) {
        await removeCredits(global.email, creditsUsed)
      }
      const referrerEmail = await user.getValue('referrerEmail')
      const taxYearsPaid = await user.getValue('taxYearsPaid')
      if (referrerEmail && taxYearsPaid.length == 1) {
        await addReferralCredits(referrerEmail)
      }
      const source = await user.getValue('source')
      safePostHog.capture('paid', { source })
      await user.setValue('currentPage', 'dashboard')
      goto('/dashboard')
    }
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

<svelte:head>
  <script>
    gtag('event', 'conversion', {
        'send_to': 'AW-1040756020/3nAmCP_Sy_UaELTaovAD',
        'value': 1.0,
        'currency': 'USD'
    });
  </script>
</svelte:head>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />