<script>
  import { onMount } from 'svelte'
  import { supabase } from '$src/utilities/supabase'
  import { saveLocalStorageToDatabase, saveDatabaseToLocalStorage } from '$src/utilities/database'
  import { updateLoginState } from '$src/utilities/utilities'
  import { store } from '$src/stores/store.svelte'
  
  let props = $props()
  let children = props.children
  let loading = $state(true)
  
  onMount(async () => {
    loading = true
    const response = await supabase.auth.getSession()
    const session = response.data.session
    updateLoginState(session)
    supabase.auth.onAuthStateChange((event, session) => {
      updateLoginState(session)
    })
    loading = false
  })
  </script>
  
  {#if loading}
    <div></div>
  {:else}
    {@render children()}
  {/if}