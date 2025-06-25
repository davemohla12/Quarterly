<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { recurringPriceId, oneTimePriceId } from '$src/settings/settings'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  import { currentTaxYear } from '$src/settings/settings'
  import { goto } from '$app/navigation'

  onMount(async () => { 
    if (await user.getValue('latestTaxYearPaid') == currentTaxYear) {
      user.setValue('currentPage', 'dashboard')
      goto('/dashboard')
    }
    else {
      const response = await axios.post('/api/checkout', {
      email: global.email,
      oneTimePriceId: oneTimePriceId,
      recurringPriceId: recurringPriceId
    })
    window.location.href = response.data.url
    }
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />