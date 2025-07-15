<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'  
  import Button from '$src/components/app/Button.svelte'
  import { global } from '$src/data/global.svelte'  
  import Subheading from '$src/components/app/Subheading.svelte'
  import Support from '$src/components/app/Support.svelte'
  import axios from 'axios'
  import { goto } from '$app/navigation'  
  import { onMount } from 'svelte'

  const headingText = `We're here to help`
  const subheadingText = `We'll get back to you right away`
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
<Support value={message} oninput={handleInput} />
{#if showSpinner}
  <Button showSpinner={true} enabled={false} dark={true} />
{:else}
  <Button text={buttonText} onclick={handleSubmit} />
{/if}

