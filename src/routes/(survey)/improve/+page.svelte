<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'  
  import TextBlockInput from '$src/components/app/TextBlockInput.svelte'
  import ControlledButton from '$src/components/app/ControlledButton.svelte'
  import { global } from '$src/data/global.svelte' 
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { setInImprove } from '$src/utilities/database'
  import { goto } from '$app/navigation'

  const headingText = `What’s one thing we could improve to make Zenguider perfect for you?`
  const placeholderText = `Your feedback`
  const buttonText = 'SUBMIT'
  global.makeButtonActive = false
  let showSpinner = $state(false)
  let feedback = $state('')

  const handleInput = (value) => {
    feedback = value
    if (feedback != '') {
      global.makeButtonActive = true
    }
    else {
      global.makeButtonActive = false
    }
  }

  const handleSubmit = async () => {
    await setInImprove(feedback)
    goto('/rating/confirmation') 
  }

</script>


<Header hideIcons={true} hideBack={true} />
<Avatar />
<Heading text={headingText} desktopwidth="700px" mobilewidth="350px" />
<TextBlockInput height="250px" placeholder={placeholderText} value={feedback} oninput={handleInput} />
{#if showSpinner}
  <ControlledButton showSpinner={true} enabled={false} dark={true} />
{:else}
  <ControlledButton text={buttonText} onclick={handleSubmit} />
{/if}
