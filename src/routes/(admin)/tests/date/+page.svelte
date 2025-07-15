<script>
  import DatePicker from '$src/components/app/DatePicker.svelte'
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'

  let date = $state('')

  onMount(() => {
    date = dayjs().format('YYYY-MM-DD')
  })

  const handleDateSelect = (date) => {
    console.log(date)
  }
</script>

<div class="container"> 
  <DatePicker text="(Add a date)" date={date} onselect={handleDateSelect} />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }
</style>