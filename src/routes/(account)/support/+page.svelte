<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'  
  import ControlledButton from '$src/components/app/ControlledButton.svelte'
  import { global } from '$src/data/global.svelte'  
  import Subheading from '$src/components/app/Subheading.svelte'
  import TextBlockInput from '$src/components/app/TextBlockInput.svelte'
  import axios from 'axios'
  import { goto } from '$app/navigation'  
  import { onMount } from 'svelte'

  const headingText = `We're here to help`
  const subheadingText = `We'll get back to you right away`
  const placeholderText = `What do you need help with?`
  const buttonText = 'SUBMIT'
  global.makeButtonActive = false
  let message = $state('')
  let showSpinner = $state(false)

  onMount(() => {
    if (!global.loggedIn) {
      goto('/')
    } 
  })

  const handleInput = (value) => {
    message = value
    if (message != '') {
      global.makeButtonActive = true
    }
    else {
      global.makeButtonActive = false
    }
  }
  
  const handleSubmit = async () => {
    showSpinner = true
    await axios.post('/api/email', {
      to: 'support@zenguider.com',
      subject: `Support message from ${global.email}`,
      template: 'support',
      message: message,
      email: global.email
    })
    await axios.post('/api/email', {
      to: global.email,
      subject: `We’ve received your message`,
      template: 'confirmation'
    })  
    global.showConfirmationBanner = true
    goto('/dashboard')  
  }

</script>
<Header showAccountIcon={true} />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<Subheading text={subheadingText} />
<TextBlockInput placeholder={placeholderText} value={message} oninput={handleInput} />
{#if showSpinner}
  <ControlledButton showSpinner={true} enabled={false} dark={true} />
{:else}
  <ControlledButton text={buttonText} onclick={handleSubmit} />
{/if}

