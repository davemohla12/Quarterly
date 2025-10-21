<script>
  import { currentTaxQuarter, currentTaxYear } from '$src/settings/settings'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'
  import { global } from '$src/data/global.svelte'

  onMount(async () => {
    const latestTaxYearPaid = await user.getValue('latestTaxYearPaid')
    console.log(`Latest Tax Year Paid: ${latestTaxYearPaid}`)
    console.log(`Current Tax Year: ${currentTaxYear}`)
    console.log(`Current Tax Quarter: ${currentTaxQuarter}`)
    console.log(`Logged In: ${global.loggedIn}`)
  })

</script>