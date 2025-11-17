<script>
  import Header from '$src/components/app/Header.svelte'
  import Avatar from '$src/components/app/Avatar.svelte'

</script>

<Header hideIcons={true} hideBack={true} />
<Avatar />
<div class="container">
  <div class="text">
    Thanks so much!
    <br />
    <br />
    We read everything you share and use it to improve Zenguider for you.
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
  }
  .text {
    text-align: center;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    width: 300px;
    margin-top: 100px;
  }
  @media (min-width: 768px) { 
    .text {
      width: 500px; 
    }
  }
</style>