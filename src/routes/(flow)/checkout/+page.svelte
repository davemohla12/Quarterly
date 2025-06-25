<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { priceId } from '$src/settings/settings'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  import { currentTaxYear } from '$src/settings/settings'
  import { goto } from '$app/navigation'
  import { showCheckout } from '$src/settings/settings'

  onMount(async () => { 
    if (showCheckout) {
      if (await user.getValue('latestTaxYearPaid') == currentTaxYear) {
          user.setValue('currentPage', 'dashboard')
          goto('/dashboard')
      }
      else {
        const response = await axios.post('/api/checkout', {
          email: global.email,
          priceId: priceId
          })
        await user.setValue('stripeCustomerId', response.data.customer_id)
        await user.setValue('lastPaymentAmount', response.data.price)
        await user.setValue('lastPaymentDate', new Date().toISOString())
        await user.addValue('paymentDates', new Date().toISOString())
        let totalPayments = await user.getValue('totalPayments')
        await user.setValue('totalPayments', totalPayments + 1)
        window.location.href = response.data.url
      }
    }
    else {
      await user.setValue('latestTaxYearPaid', currentTaxYear)
      await user.addValue('taxYearsPaid', currentTaxYear)
      user.setValue('currentPage', 'dashboard')
      goto('/dashboard')
    }
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />