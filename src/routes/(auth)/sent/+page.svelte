<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'

  const headingText = `Email sent`
  const subheadingText = `If you have an account, I've emailed you instructions to rest your password`
  const buttonText = 'BACK TO HOME'
  global.makeButtonActive = true

  const handleClick = () => {
    goto('/')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
        handleClick()
      }
    }
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<Header hideIcons={true} />
<Avatar />
<Heading text={headingText} desktopwidth="500px" mobilelarge={true} />
<Subheading text={subheadingText} desktopwidth="300px" mobilewidth="300px"/>
<Button text={buttonText} dark={true} onclick={handleClick} />
