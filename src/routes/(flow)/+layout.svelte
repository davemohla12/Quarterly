<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'
  
  let props = $props()
  let children = props.children
  let loading = $state(true)

  onMount(async () => {
    loading = true
    // if (user.currentPage) {
    //   goto(`/${user.currentPage}`)
    // }
    // else {
    //   goto('/')
    // }
    loading = false
  })
  </script>

  {#if loading}
    <div></div>
  {:else}
    {@render children()}
  {/if}
  

