<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { federalRules } from '$src/rules/federal'
  import { goto } from '$app/navigation'
  import { store } from '$src/stores/store.svelte'  

  const headingText = `You don't need to pay any federal quarterly taxes this year`
  const subheadingText = `Because you owed less than $${federalRules.minimumTaxForQuarterlyPayments} in federal tax last year, the IRS doesn't require you to make estimated payments this year`
  const buttonText = 'NEXT'
  
  store.makeButtonActive = true

  const handleNext = () => {
    if (store.stateHasQuarterlyTaxes) {
      store.currentPage = '14'
      goto('/14')
    }
    else {
      store.currentPage = '16'
      goto('/16')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (store.makeButtonActive == true) {
        handleNext()
      }
    }
    if (event.key === 'ArrowLeft') {
      history.back()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<Header />
<Avatar />
<Heading text={headingText} mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="500px" mobilewidth="300px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
