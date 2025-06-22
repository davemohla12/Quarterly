<script>
  import { global } from '$src/data/global.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'
  import { setLocalStorage } from '$src/utilities/utilities'
  
  let props = $props()
  let children = props.children
  let loading = $state(true)
  
  onMount(async () => {
    loading = true
    if (!global.loggedIn) {
      setLocalStorage('loginLocation', 'dashboard')
      goto('/login')
    } 
    else { 
      user.currentPage = 'dashboard'
      goto(`/${user.currentPage}`)
    }
    loading = false
  })
  </script>
  
  {#if loading}
    <div></div>
  {:else}
    {@render children()}
  {/if}
