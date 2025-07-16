<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Rating from '$src/components/app/Rating.svelte'
  import Feedback from '$src/components/app/Feedback.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { onMount } from 'svelte'
  import { global } from '$src/data/global.svelte'
  import { page } from '$app/stores'  
  import { getEmailFromId, setRating } from '$src/utilities/database'
  import { goto } from '$app/navigation'

  let rating = $state(null)
  let showFeedback = $state(false)
  let feedback = $state('')
  let id = $state('')
  let email = $state('')

  const today = dayjs().toISOString()

  $effect(async () => {
    id = $page.url.searchParams.get('id') || ''
    rating = $page.url.searchParams.get('rating') || ''
    if (rating == 'bad' || rating == 'good') {
      showFeedback = true
    }
    if (id) {
      email = await getEmailFromId(id)
    }
    if (rating == 'bad' || rating == 'good') {
      if (email) {
        await setRating(email, today, rating, feedback)
      }
    }
  })

  onMount(() => {
    global.makeButtonActive = true
  })

  const handleRatingClick = async (newRating) => {
    rating = newRating
    showFeedback = true
    if (email) {
      await setRating(email, today, newRating, feedback)
    }
  }

  const handleInput = (newFeedback) => {
    feedback = newFeedback
  }

  const handleSubmit = async () => {
    goto('/rating/confirmation')
    if (email) {
      await setRating(email, today, rating, feedback)
    }
  }

</script>

<Header hideReset={true} hideBack={true} />
<Avatar />
<Heading text="How was your experience?" desktopwidth="450px" mobilewidth="400px"  />
<Rating rating={rating} onratingclick={handleRatingClick} />
{#if showFeedback}
  <Feedback rating={rating} oninput={handleInput} />
  <Button text=SUBMIT onclick={handleSubmit} />
{/if}

