<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'
  import Heading from '$src/components/app/Heading.svelte'
  import RadioButtons from '$src/components/app/RadioButtons.svelte'
  import Button from '$src/components/app/Button.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { setInDisappointed } from '$src/utilities/database'

  const headingText = `How would you feel if you could no longer use Zenguider for your quarterly taxes?`
  const radioButtons = ['Very disappointed', 'Somewhat disappointed', 'Not disappointed']
  const buttonText = 'SUBMIT'
  let answer = $state('')

  let selectedRadioButton = $state(null)
  global.makeButtonActive = false

  onMount(async () => {
    answer = $page.url.searchParams.get('answer')
    if (radioButtons.includes(answer)) {
      selectedRadioButton = answer
      global.makeButtonActive = true
    }
  })

  const handleSelect = (button) => {
    selectedRadioButton = button
    answer = selectedRadioButton
    global.makeButtonActive = true
  }

  const handleSubmit = async () => {
    await setInDisappointed(answer)
    goto('/rating/confirmation')
  }

</script>


<Header hideIcons={true} />
<Avatar />
<Heading text={headingText} />
<RadioButtons buttons={radioButtons} selected={selectedRadioButton} onselect={handleSelect}/>
<Button text={buttonText} onclick={handleSubmit}/>
