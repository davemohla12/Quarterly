<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { currentTaxYear } from '$src/settings/settings'
  import { addCredits, removeCredits, getAllUserValues, setMultipleUserValues, addMultipleUserValues } from '$src/utilities/database'
  import { page } from '$app/stores'
  import { global } from '$src/data/global.svelte'  
  import axios from 'axios'
  import dayjs from 'dayjs'
  import { safePostHog } from '$src/utilities/posthog'
  import { referralAmount } from '$src/settings/settings'

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
      const userValues = await getAllUserValues(global.email)
      const totalPayments = userValues.totalPayments
      const referrerEmail = userValues.referrerEmail
      const taxYearsPaid = userValues.taxYearsPaid
      const source = userValues.source
      const setFieldValues = {
        latestTaxYearPaid: currentTaxYear,
        stripeCustomerId: stripeCustomerId,
        lastPaymentAmount: price,
        lastPaymentDate: new Date().toISOString(),
        totalPayments: totalPayments + 1,
        sendRatingsEmailOn: dayjs().add(3, 'day').toISOString(),
        lastPaymentId: paymentId
      }
      const addFieldValues = {
        taxYearsPaid: currentTaxYear,
        paymentDates: new Date().toISOString()
      }
      await setMultipleUserValues(setFieldValues)
      await addMultipleUserValues(addFieldValues)
      if (creditsUsed > 0) {
        await removeCredits(global.email, creditsUsed)
      }
      if (referrerEmail && !taxYearsPaid) {
        await addReferralCredits(referrerEmail)
      }
      safePostHog.capture('paid', { source })
      goto('/dashboard')
      await user.setValue('currentPage', 'dashboard')
    }
  })

  const addReferralCredits = async (referrerEmail) => {
    await addCredits(referrerEmail, referralAmount)
    await axios.post('/api/email', {
      to: referrerEmail,
      subject: `You earned $${referralAmount} in credits`,
      template: 'credits',
      credits: referralAmount
    })
  }

</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />