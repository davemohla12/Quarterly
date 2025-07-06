<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'  
  import { global } from '$src/data/global.svelte'  
  import { goto } from '$app/navigation'  
  import PriorYears from '$src/components/app/PriorYears.svelte'
  import { onMount } from 'svelte'
  import { getPriorYears } from '$src/utilities/database'
  import Loading from '$src/components/app/Loading.svelte'

  const headingText = `Prior years`
  global.makeButtonActive = false
  let years = $state([])
  let loading = $state(true)

  onMount(async () => {
    loading = true
    if (!global.loggedIn) {
      goto('/')
    } 
    years = await getPriorYears()
    loading = false
  })


</script>
<Header showAccountIcon={true} />
<Avatar />
{#if loading}
  <Loading />
{:else}
  <Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
  <PriorYears years={years}/>
{/if}
