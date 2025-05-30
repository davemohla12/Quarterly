<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { store } from '$src/stores/store.svelte'  
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import { goto } from '$app/navigation'

  const headingText = `You don't need to pay any ${convertStateToUpperCase(store.currentState)} quarterly taxes this year `
  const subheadingText = `Because you owed less than $${stateRules.california.minimumTaxForQuarterlyPayments} in ${convertStateToUpperCase(store.currentState)} tax last year, you are not required to make estimated payments there this year`
  const buttonText = 'NEXT'
  
  store.makeButtonActive = true
  
  const handleNext = () => {
    if (store.federalQuarterlyPayment == 0) {
      store.currentPage = '16'
      goto('/16')
    } 
    else {
      store.currentPage = '17'
      goto('/17')
    }
  }
</script>

<Header />
<Avatar />
<Heading text={headingText} mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
