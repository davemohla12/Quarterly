<script>
  import axios from 'axios'

  let startDate = '2026-01-01'
  let averageDays = 9
  let spread = 2

  const generateDates = async () => {
    const response = await axios.post('/api/dates', {startDate, averageDays, spread})
    const result = response.data
    console.log(result)
  }
</script>

<div class="container">
  <button onclick={generateDates}>Generate Blog Post Dates</button>
</div>