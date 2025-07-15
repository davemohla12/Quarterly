<script>
  import { onMount, tick } from 'svelte'
  import Clickable from '$src/components/app/Clickable.svelte'
  
  let props = $props()
  let text = $derived(props.text)
  let date = $derived(props.date)
  let onselect = $derived(props.onselect)

  let showEdit = $state(false)
  let input
  let picker
  let wrapper

  onMount(async () => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/css/datepicker.min.css'
    document.head.appendChild(link)
    
    await tick()
    
    const { Datepicker } = await import('vanillajs-datepicker')
    
    picker = new Datepicker(input, {
      format: 'yyyy-mm-dd',
      autohide: true,
      container: wrapper
    })

    input.addEventListener('changeDate', (event) => {
      onselect(event.target.value)
    })
  })

  const openDialog = () => {
    picker.show()
  }
  
</script>

  <div class="container" bind:this={wrapper}>
    <Clickable onclick={openDialog}>
      <div class="text">{text}</div>
      <img class="edit" src="/images/edit.png" alt="Edit"  />
    </Clickable>
  </div>
  <input class="input" bind:this={input} type="text" bind:value={date} />

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .text {
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    color: var(--gray4);
    text-align: center;
    margin-left: 15px;
  }
  .edit {
    width: 10px;
    height: 10px;
    margin-left: 4px;
    margin-top: -1px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .container:hover .edit {
    opacity: 1;
  }
  .input {
    display: none;
  }

:global(.container .datepicker) {
  position: absolute !important;
  top: calc(100% + 8px) !important;
  left: calc(50% - 25px) !important;
  transform: translateX(calc(-50% - 25px)) !important;
  z-index: 1000 !important;
  font-family: 'Lato', sans-serif;
}

:global(.datepicker-picker) {
  background: #ffffff;
  font-family: 'Lato', sans-serif;
}

:global(.datepicker .datepicker-cell:hover) {
  background: var(--green) !important;
  color: white !important;
}

:global(.datepicker .datepicker-cell.selected) {
  background: var(--green) !important;
  color: white !important;
}

:global(.datepicker .datepicker-cell.today) {
  background: var(--green) !important;
  color: white !important;
}

</style>