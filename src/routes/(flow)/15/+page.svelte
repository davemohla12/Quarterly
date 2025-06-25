<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Subheading from '$src/components/app/Subheading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { convertStateToUpperCase } from '$src/utilities/utilities'
  import { stateRules } from '$src/rules/state'
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'

  let headingText = $state('')
  let subheadingText = $state('')
  const buttonText = 'NEXT'
  
  global.makeButtonActive = true

  onMount(async () => {
    headingText = `You don't need to pay any ${convertStateToUpperCase(await payment.getValue('currentState'))} quarterly taxes this year `
    subheadingText = `Because you owed less than $${stateRules[await payment.getValue('currentState')].minimumTaxForQuarterlyPayments} in ${convertStateToUpperCase(await payment.getValue('currentState'))} tax last year, you are not required to make estimated payments there this year`
  })

  const handleNext = async () => {
    if (await payment.getValue('federalQuarterlyPayment') == 0) {
      goto('/16')
      await user.setValue('currentPage', '16')
    } 
    else {
      goto('/17')
      await user.setValue('currentPage', '17')
    }
  }
</script>

<Header />
<Avatar />
<Heading text={headingText} mobilewidth="300px" />
<Subheading text={subheadingText} desktopwidth="450px" mobilewidth="300px" />
<Button text={buttonText} onclick={handleNext} />
<Later />
