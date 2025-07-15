<script>
  import axios from 'axios'
  import { priceId } from '$src/settings/settings'

  const handleClick = async () => {
    const response = await axios.post('/api/checkout', {
      email: 'davemohla@gmail.com',
      priceId: priceId,
      useReferralDiscount: false,
      credits: 10
    })
    window.location.href = response.data.url
  }
</script>

<div>
  <button onclick={handleClick}>Test checkout</button>
</div>