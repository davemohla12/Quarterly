<script>
  import Clickable from '$src/components/app/Clickable.svelte'
  import { goto } from '$app/navigation'

  const props = $props()
  const content = $derived(props.content)

  const handleAllPosts = () => {
    goto('/blog')
  }
</script>

<div class="container"> 
  <div class="post"> 
    <Clickable onclick={handleAllPosts}>
      <div class="allpostscontainer">
        <img class="leftarrow" src="/images/leftarrow.png" alt="Left Arrow" />
        <div class="allposts">All Posts</div>
      </div>
    </Clickable>
    <div class="content">{@html content}</div>
  </div>
</div>

<style> 
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .post {
    padding-top: 90px;
    max-width: 1000px;
    margin-left: 35px;
    margin-right: 35px;
    margin-bottom: 10px;
  }
  .allpostscontainer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .leftarrow {
    width: 16px;
    height: 12px;
    margin-right: 7px;
  }
  .allposts {
    font-size: 14px;
  }
  .content :global(h1) {
    margin: 0;
    font-size: 26px;
    font-family: 'Merriweather', serif;
  }
  .content :global(h2) {
    font-size: 20px;
  }
  .content :global(img) {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .content :global(a) {
    text-decoration: underline;
    color: var(--dark);
  }
  @media (min-width: 768px) {
    .post {
      margin-bottom: 40px;
    }
    .content :global(h1) {
      margin: 0;
      font-size: 28px;
      font-family: 'Merriweather', serif;
    }
    .content :global(h2) {
      font-size: 22px;
    }
    .content :global(img) {
      max-width: 500px;
    }
  }

</style>