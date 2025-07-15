<script>
  import { createUserIfNotExists } from '$src/utilities/database'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'

  let done = $state(false)
  const referralEmail = 'davemohla@gmail.com'

  onMount(async () => {
    await user.setValue('referrerEmail', referralEmail)
    await createUserIfNotExists()
    done = true
  })
</script>

<div>
  {#if done}
    <p>Set referral email to {referralEmail}</p>
  {/if}
</div>