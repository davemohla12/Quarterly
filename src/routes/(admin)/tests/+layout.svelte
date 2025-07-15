<script>
  import Header from "$src/components/app/Header.svelte"
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { getLocalStorage, setLocalStorage } from '$src/utilities/utilities.js'

  let props = $props()
  let children = props.children 
  
  onMount(() => {
    const adminLoggedIn = getLocalStorage('adminLoggedIn')
    if (!adminLoggedIn) {
      const currentPath = $page.url.pathname.slice(1)
      setLocalStorage('adminPage', currentPath)
      goto('/passcode')
    }
  })

</script>
  
<Header hideReset={true} hideBack={true} hideLogout={true} showAdminLogout={true} hideLogo={true} />
{@render children()}
