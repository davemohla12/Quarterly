<script>
  import { store } from '$src/stores/store.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  
  let props = $props()
  let children = props.children
  let loading = $state(true)
  
  onMount(async () => {
    loading = true
    if (store.currentPage) {
      goto(`/${store.currentPage}`)
    }
    else {
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

