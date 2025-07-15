<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import Button from '$src/components/app/Button.svelte'
  import Later from '$src/components/app/Later.svelte'
  import Dropdown from '$src/components/app/Dropdown.svelte'
  import { global } from '$src/data/global.svelte'
  import { payment } from '$src/data/payment.svelte'
  import { convertStateToLowerCase, convertStateToUpperCase } from '$src/utilities/utilities'
  import { onMount } from 'svelte'
  import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'
  import { stateRules } from '$src/rules/state'
  import { goto } from '$app/navigation'
  import { user } from '$src/data/user.svelte'

  const headingText = `What state will you be living in on these dates?`
  const buttonText = 'NEXT'
  global.makeButtonActive = false
  let q1State = $state()
  let q2State = $state()
  let q3State = $state()
  let q4State = $state()
  
  onMount(async () => {
    global.makeButtonActive = false
    if (global.loggedIn) {
      if (await payment.getValue('currentState')) {
        q1State = convertStateToUpperCase(await payment.getValue('q1State'))
        q2State = convertStateToUpperCase(await payment.getValue('q2State'))
        q3State = convertStateToUpperCase(await payment.getValue('q3State'))
        q4State = convertStateToUpperCase(await payment.getValue('q4State'))
        global.makeButtonActive = true
      }
    }
  })

  $effect(() => {
    if ((q1State == null || q1State == '') || (q2State == null || q2State == '') || (q3State == null || q3State == '') || (q4State == null || q4State == '')) {
      global.makeButtonActive = false
    }
    else {
      global.makeButtonActive = true
    }
  })

  const handleSelection1 = async (selection) => {
    q1State = convertStateToLowerCase(selection)
  } 

  const handleSelection2 = async (selection) => {
    q2State = convertStateToLowerCase(selection)
  } 

  const handleSelection3 = async (selection) => {
    q3State = convertStateToLowerCase(selection)
  }

  const handleSelection4 = async (selection) => {
    q4State = convertStateToLowerCase(selection)
  }

  const handleNext = async () => {
    if (global.makeButtonActive == true) {
      if (stateRules[convertStateToLowerCase(q1State)].stateHasQuarterlyTaxes || stateRules[convertStateToLowerCase(q2State)].stateHasQuarterlyTaxes || stateRules[convertStateToLowerCase(q3State)].stateHasQuarterlyTaxes || stateRules[convertStateToLowerCase(q4State)].stateHasQuarterlyTaxes) {
        goto('/9')
        await user.setValue('currentPage', '9')
        await payment.setValue('q1State', convertStateToLowerCase(q1State))  
        await payment.setValue('q2State', convertStateToLowerCase(q2State))  
        await payment.setValue('q3State', convertStateToLowerCase(q3State))  
        await payment.setValue('q4State', convertStateToLowerCase(q4State))  
      }
      else {
        await payment.setValue('stateSupported', false)
        goto('/7')
        await user.setValue('currentPage', '7')
      }
    }
  }

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (global.makeButtonActive == true) {
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
<Heading text={headingText} desktopwidth="500px" mobilewidth="350px" />
<Dropdown text={`State on ${q1DueDate.format('MMM D, YYYY')}`} values={global.states} selected={convertStateToUpperCase(q1State)} onselection={handleSelection1} lessTopMargin={true}/>
<Dropdown text={`State on ${q2DueDate.format('MMM D, YYYY')}`} values={global.states} selected={convertStateToUpperCase(q2State)} onselection={handleSelection2} lessTopMargin={true}/>
<Dropdown text={`State on ${q3DueDate.format('MMM D, YYYY')}`} values={global.states} selected={convertStateToUpperCase(q3State)} onselection={handleSelection3} lessTopMargin={true}/>
<Dropdown text={`State on ${q4DueDate.format('MMM D, YYYY')}`} values={global.states} selected={convertStateToUpperCase(q4State)} onselection={handleSelection4} lessTopMargin={true}/>
<Button text={buttonText} onclick={handleNext} />
<Later />