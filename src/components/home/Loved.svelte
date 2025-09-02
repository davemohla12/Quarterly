<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { fade } from 'svelte/transition'
  
  let currentReview = $state(0)
  let touchStartX = 0
  let touchEndX = 0

  const handleLeftClick = () => {
    if (currentReview > 0) {
      currentReview--
    }
    else {
      currentReview = 2
    }
  }
  const handleRightClick = () => {
    if (currentReview < 2) {
      currentReview++
    }
    else {
      currentReview = 0
    }
  }

  const handleDot1Click = () => {
    currentReview = 0
  }

  const handleDot2Click = () => {
    currentReview = 1
  }

  const handleDot3Click = () => {
    currentReview = 2
  }

  const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].screenX
  }

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].screenX
    handleSwipe()
  }

  const handleSwipe = () => {
    const swipeThreshold = 50
    const swipeDistance = touchStartX - touchEndX
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        handleRightClick()
      }
      else {
        handleLeftClick()
      }
    }
  }

</script>

<div class="container">
  <div class="title">Loved by users</div>
  <img class="stars" src="images/stars.png" alt="Five star rating">
  <div class="subtitle">5.0 star rating across all users</div>
  <div class="reviews" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
    {#if currentReview == 0}
      <div class="review" transition:fade={{ duration: 300 }}>
        <div class="reviewtitle">Zenguider is a lifesaver!</div>
        <div class="reviewtext">"Quarterly taxes used to stress me out, but Zenguider made it simple and fast. It told me exactly what to pay and I’m confident I won’t get penalized."</div>
        <div class="reviewauthor">Alex</div>
        <div class="reviewstate">Florida</div>
      </div>
    {/if}
    {#if currentReview == 1}
      <div class="review" transition:fade={{ duration: 300 }}>
        <div class="reviewtitle">Step-by-step and clear</div>
        <div class="reviewtext">"I always felt lost with quarterly taxes, but Zenguider guided me through each step. It was easy to follow and only took a few minutes."</div>
        <div class="reviewauthor">Priya</div>
        <div class="reviewstate">Illinois</div>
      </div>
    {/if} 
    {#if currentReview == 2}
      <div class="review" transition:fade={{ duration: 300 }}>
        <div class="reviewtitle">No more IRS confusion</div>
        <div class="reviewtext">"I tried figuring it out on my own and gave up. Zenguider was straightforward, quick, and gave me the exact numbers I needed."</div>
        <div class="reviewauthor">Daniel</div>
        <div class="reviewstate">Colorado</div>
      </div>
    {/if}
  </div>
  <div class="controls">
    <Clickable onclick={handleLeftClick}>
      <img class="leftarrow" src="images/leftarrowtestimonial.png" alt="Left arrow">
    </Clickable>
    <Clickable onclick={handleDot1Click}>
      {#if currentReview == 0}
        <img class="dot" src="images/greendot.png" alt="Dot" >
      {:else}
        <img class="dot" src="images/graydot.png" alt="Dot" >
      {/if}
    </Clickable>
    <Clickable onclick={handleDot2Click}>
      {#if currentReview == 1}
        <img class="dot" src="images/greendot.png" alt="Dot" >
      {:else}
        <img class="dot" src="images/graydot.png" alt="Dot" >
      {/if}
    </Clickable>
    <Clickable onclick={handleDot3Click}>
      {#if currentReview == 2}
        <img class="dot" src="images/greendot.png" alt="Dot" >
      {:else}
        <img class="dot" src="images/graydot.png" alt="Dot" >
      {/if}
    </Clickable>
    <Clickable onclick={handleRightClick}>
      <img class="rightarrow" src="images/rightarrowtestimonial.png" alt="Right arrow">
    </Clickable>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--white);
   }
  .title {
    margin-top: 30px;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    text-align: center;
    width: 210px;
    margin-bottom: 20px;
    color: var(--dark);
  }
  .stars {
    width: 196px;
    height: 27px;
    margin-bottom: 5px;
  }
  .subtitle {
    font-size: 15px;
    margin-top: 15px;
    width: 200px;
    text-align: center;
    margin-bottom: 20px;
    color: var(--dark);
    }
  .reviews { 
    display: flex;
    flex-direction: column;
    border: 1px solid var(--gray3);
    border-radius: 5px;
    padding: 20px;
    width: 220px;
    position: relative;
    min-height: 180px;
    background-color: var(--white);
    color: var(--dark);
  }
  .review {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
  }
  .reviewtitle {
    font-size: 16px;
    font-weight: var(--bold);
    margin-bottom: 15px;
  }
  .reviewtext {
    font-size: 15px;
    margin-bottom: 15px;
  }
  .reviewauthor {
    font-size: 15px;
    margin-bottom: 3px;
  }
  .reviewstate {
    font-size: 15px;
  }
  .controls { 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 25px;
  }
  .leftarrow {
    width: 9px;
    height: 15px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .dot {
    width: 12px;
    height: 12px;
    margin-right: 20px;
    margin-left: 20px;
  }
  .rightarrow {
    width: 9px;
    height: 15px;
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (min-width: 768px) {
    .title {
      font-size: 32px;
      width: 300px;
    }
    .subtitle {
      font-size: 16px;
      width: 300px;
    }
    .reviews { 
      width: 260px;
      min-height: 160px;
    }
    .review {
      left: 20px;
      right: 20px;
    }
  }

</style>