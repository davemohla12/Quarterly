<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'

  const headingText = `You'll just pay federal quarterly taxes`
  let subheadingText = `All the states you are living in this year don't require quarterly taxes`
  const buttonText = 'NEXT'
  global.makeButtonActive = true

  const handleNext = async () => {
    goto('/9')
    await user.setValue('currentPage', '9')
  }


</script>

<Header />
<Avatar />
<Heading text={headingText} desktopwidth="450px" mobilewidth="300px" />
<Subheading text={subheadingText} />
<Button text={buttonText} onclick={handleNext} />
<Later />