<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { onMount } from 'svelte'
  import { global } from '$src/data/global.svelte'

  let props = $props()
  let text = props.text
  let values = props.values
  let onselection = props.onselection
  let selected = $derived(props.selected || null)
  let inputValue = $state('')
  let filteredValues = $derived(values.filter(value => value.toLowerCase().includes(inputValue.toLowerCase())))
  let container
  let inputBox
  let selectedIndex = $state(-1)
  let isOpen = $state(false)
  let lessTopMargin = props.lessTopMargin || false

  onMount(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  $effect(() => {
    if (selected) { 
      inputValue = selected
    }
  })

  const handleInput = (event) => {
    inputValue = event.target.value
    onselection(inputValue)
    isOpen = true
  }

  const handleSelect =  (value) => {
    inputValue = value
    onselection(inputValue)
    isOpen = false
    selectedIndex = -1
  }

  const toggleDropdown = () => {
    if (!isOpen) {
      inputValue = ''
    }
    onselection(inputValue)
    isOpen = !isOpen
    inputBox.focus()
  }
  
  const handleKeydown = async (event) => {
    if (event.key === 'Escape') {
      global.dropdownisOpen = false
      selectedIndex = -1
    }
    else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!isOpen) {
        isOpen = true
      }
      selectedIndex = Math.min(selectedIndex + 1, filteredValues.length - 1)
    }
    else if (event.key === 'ArrowUp') {
      event.preventDefault()
      selectedIndex = Math.max(selectedIndex - 1, 0)
    }
    else if (event.key === 'Enter' && selectedIndex >= 0) {
      inputValue = filteredValues[selectedIndex]
      onselection(inputValue)
      isOpen = false
      selectedIndex = -1
    }
  }

  const handleClear = (event) => {
    event.stopPropagation()
    inputValue = ""
    onselection(inputValue)
    isOpen = true
    inputBox.focus()
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown') && !event.target.closest('.menu')) {
      isOpen = false
      selectedIndex = -1
    }
  }

</script>

<div class="container" bind:this={container}>
  <Clickable onclick={toggleDropdown}>
    <div class="dropdown" class:lesstopmargin={lessTopMargin}>
      <input class="input" type="text" placeholder={text} value={inputValue} oninput={handleInput} bind:this={inputBox} />
      {#if isOpen}
        <Clickable onclick={handleClear}>
          <img class="clear" src="images/clear.png" alt="Clear" />
        </Clickable>
      {:else}
        <img class="down" src="images/down.png" alt="Dropdown" />
      {/if}
    </div>
  </Clickable>
  {#if isOpen && filteredValues.length > 0}
    <div class="menu">
      {#each filteredValues as value}
        <Clickable onclick={() => handleSelect(value)}>
          <div class="item" class:selected={filteredValues.indexOf(value) === selectedIndex}>{value}</div>
        </Clickable>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .dropdown {
    display: flex;
    align-items: center;
    margin-top: 20px;
    position: relative;
    border: 1px solid var(--gray2);
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 320px;
    border-radius: 5px;
  }
  .lesstopmargin { 
    margin-top: 15px;
  }
  .input {
    margin-left: 20px;
    font-family: 'Lato', sans-serif;
    color: var(--dark);
    font-weight: var(--regular);
    font-size: 16px;
    border: none;
    outline: none;
    width: 100%;
    background: transparent;
    cursor: pointer;
  }
  .input::placeholder {
    color: var(--gray4);
  }
  .down {
    width: 12px;
    height: 7.5px;
    position: absolute;
    right: 20px;
  }
  .clear {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 20px;
  }
  .menu {
    position: absolute;
    top: 100%;
    width: 100%;
    max-width: 320px;
    background: var(--white);
    border: 1px solid var(--gray2);
    border-radius: 5px;
    margin-top: 4px;  
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
  }
  .item {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    color: var(--gray4);
    font-size: 16px;
    text-align: left;
  }
  .item:hover {
    background: var(--gray1);
  }
  .selected {
    background: var(--gray1);
  }

  @media (min-width: 768px) { 
    .dropdown {
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
    }
    .menu {
      max-width: 400px;
    }
  }
</style>