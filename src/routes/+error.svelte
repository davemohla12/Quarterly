<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte';

  const headingText = `Page not found`
  const subheadingText = `The page you are looking for cannot be found`
  const buttonText = 'BACK TO HOME'
  
  store.makeButtonActive = true

  const handleClick = () => {
    goto('/')
  }
</script>

<svelte:head>
  <title>Zenguider | Not Found</title>
</svelte:head>

<Header hideBack={true} hideIcons={true} />
<Avatar />
<Heading text={headingText} desktopwidth="500px"  mobilelarge={true} />
<Subheading text={subheadingText} desktopwidth="500px" />
<Button text={buttonText} dark={true} onclick={handleClick} />
