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
        goto('/dashboard')
        await user.setValue('currentPage', 'dashboard')
      }
      else {
        let userReferralDiscount = false
        const referrerEmail = await user.getValue('referrerEmail')
        if (referrerEmail && !await user.getValue('latestTaxYearPaid')) {
          userReferralDiscount = true
        }
        const userCredits = await user.getValue('credits')
        const response = await axios.post('/api/checkout', {
          email: global.email,
          priceId: priceId,
          useReferralDiscount: userReferralDiscount,
          credits: userCredits
          })
        window.location.href = response.data.url
      }
    }
    else {
      if (await user.getValue('latestTaxYearPaid') == currentTaxYear) {
        await user.setValue('currentPage', 'dashboard')
        goto('/dashboard')
      }
      else {
        await user.setValue('latestTaxYearPaid', currentTaxYear)
        await user.addValue('taxYearsPaid', currentTaxYear)
        await user.setValue('currentPage', 'dashboard')
        goto('/dashboard')
      }
    }
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />