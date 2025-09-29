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
  import { getAllUserValues } from '$src/utilities/database'

  onMount(async () => { 
    const userValues = await getAllUserValues(global.email)
    const latestTaxYearPaid = userValues.latestTaxYearPaid
    const referralEmail = userValues.referrerEmail
    const userCredits = userValues.credits
    if (showCheckout) {
      if (latestTaxYearPaid == currentTaxYear) {
        goto('/dashboard')
        await user.setValue('currentPage', 'dashboard')
      }
      else {
        const response = await axios.post('/api/checkout', {
          email: global.email,
          priceId: priceId,
          credits: userCredits
        })
        window.location.href = response.data.url
      }
    }
    else {
      if (latestTaxYearPaid == currentTaxYear) {
        goto('/dashboard')
        await user.setValue('currentPage', 'dashboard')
      }
      else {
        await user.setValue('latestTaxYearPaid', currentTaxYear)
        await user.addValue('taxYearsPaid', currentTaxYear)
        goto('/dashboard')
        await user.setValue('currentPage', 'dashboard')
      }
    }
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />