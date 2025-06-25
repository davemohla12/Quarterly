<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Loading from '$src/components/app/Loading.svelte'
  import dayjs from 'dayjs'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { user } from '$src/data/user.svelte'
  import { currentTaxYear } from '$src/settings/settings'

  onMount(async () => {
    await user.setValue('latestTaxYearPaid', currentTaxYear)
    await user.addValue('taxYearsPaid', currentTaxYear)
    await user.setValue('subscriptionCreatedOn', dayjs().toISOString())
    await user.setValue('currentPage', 'dashboard')
    goto('/dashboard')
  })
</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<Loading />