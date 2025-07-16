<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import ControlledButton from '$src/components/app/ControlledButton.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'

  const headingText = `Confirm your email`
  const subheadingText = `I've emailed you a link to confirm your email`
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
<Heading text={headingText} desktopwidth="500px"  mobilelarge={true} />
<Subheading text={subheadingText} desktopwidth="500px" />
<ControlledButton text={buttonText} dark={true} onclick={handleClick} />
