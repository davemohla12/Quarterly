<script>
  import axios from 'axios'

  const handleIssueRefund = async () => {
    const response = await axios.post('/api/refund', {
      email: 'davemohla@gmail.com',
      taxYear: 2025,
      reason: 'Customer requested a refund'
    })
    if (response.data) {
      console.log(response.data.amount)
    }
  }

</script>

<button onclick={handleIssueRefund}>Issue Refund</button>