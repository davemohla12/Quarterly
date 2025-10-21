<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'
  import { global } from '$src/data/global.svelte'
  import { user } from '$src/data/user.svelte'
  import { onMount } from 'svelte'

  let showSpinner = $state(true)
  let buttonText = $state('GET STARTED')

  $effect(async () => {
    showSpinner = true
    if (global.loggedIn) {
      const currentPage = await user.getValue('currentPage')
      if (currentPage == 'dashboard') {
        buttonText = 'DASHBOARD'
      }
      else if (currentPage == 'home' || !currentPage) {
        await user.setValue('currentPage', 'home')
        buttonText = 'GET STARTED'
      }
      else {
        buttonText = 'RESUME'
      }
    }
    else {
      buttonText = 'GET STARTED'
    }
    showSpinner = false
  })

  onMount(() => {
    if (global.showResumeBanner) {
      setTimeout(() => {
        global.showResumeBanner = false
      }, 3000)
    }
  })

  const handleCloseBanner = () => {
    global.showResumeBanner = false
  }

  const handleButtonClick = async () => {
    showSpinner = true
    if (buttonText == 'GET STARTED') {
      goto('/0')
      await user.setValue('currentPage', '0')
    }
    else if (buttonText == 'RESUME') {
      goto('/0.6')
    }
    else if (buttonText == 'DASHBOARD') {
      goto(`/dashboard`)     
      await user.setValue('currentPage', 'dashboard')
    }
  }
</script>

<div class="container">
  {#if global.showResumeBanner}
    <div class="banner">
      <div class="bannertext">You can resume at anytime</div>
      <Clickable onclick={handleCloseBanner}>
        <img class="close" src="/images/close.png" alt="Close" />
      </Clickable>
      </div>
  {/if}
  <div class="left">
    <div class="heading">
      The stress-free way to estimate and pay your quarterly taxes
    </div>
    <div class="subheading">
      For freelancers, creators, and small business owners who want taxes to be simple
    </div>
    <Clickable onclick={handleButtonClick}>
      <div class="button">    
        {#if showSpinner}
          <div class="circle"></div>
        {:else}
          {buttonText}
        {/if}
      </div>
    </Clickable>
  </div>
  <div class="right">
    <img class="stressfree" src="/images/stressfree.png" alt="Stress-free quarterly tax calculation" loading="lazy" width="377" height="409" />
  </div>
</div>
<style>
  .banner {
    position: absolute;
    top: 70px;
    left: 0px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--dark);
    color: var(--white);
  }
  .bannertext {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--regular);
  }
  .close {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .heading {
    padding-top: 90px;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    max-width: calc(100vw - 20px);
  }
  .subheading {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: var(--regular);
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    text-align: center;
    margin-top: 15px;
  }
  .button {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: var(--bold);
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 225px;
    height: 52px;
    background-color: var(--green);
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 25px;
    cursor: pointer; 
  }
  .circle {
    width: 19px;
    height: 19px;
    border: 2px solid var(--white);
    border-top-color: transparent;
    border-radius: 50%;
    animation: circle 0.8s linear infinite;
    }
  @keyframes circle {
    to {
      transform: rotate(360deg);
    }
  }
  .stressfree {
    width: 276px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 1000px) {
    .container {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 550px;
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: -30px;
    }
    .left {
      margin-left: 0px;
    }
    .heading {
      text-align: left;
      font-size: 34px;
      width: 550px;
      padding-top: 75px;
    }
    .subheading {
      text-align: left;
      margin-left: 0px;
      font-size: 16px;
      width: 350px;
    }
    .button {
      margin-left: 0px;
      width: 180px;
    }
    .stressfree {
      width: 377px;
      height: 409px;
      margin-top: 50px;
      margin-left: 50px;
    }
  }
</style>