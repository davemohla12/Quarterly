<script>
  import { global } from '$src/data/global.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  
  let props = $props()
  let children = props.children
  let loading = $state(true)
  
  onMount(async () => {
    loading = true
    if (!global.loggedIn) {
      goto('/')
    } 
    loading = false
  })
  </script>
  
  {#if loading}
    <div></div>
  {:else}
    {@render children()}
  {/if}
