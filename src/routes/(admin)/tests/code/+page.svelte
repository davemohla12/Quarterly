<script>
  import { addCredits } from '$src/utilities/database'
  import { onMount } from 'svelte'

  let referrerEmail = 'davemohla@gmail.com'
  let credits = 5

  onMount(async () => {
    await addCredits(referrerEmail, credits)
  })

</script>

<div>Added {credits} credits to {referrerEmail}</div>

