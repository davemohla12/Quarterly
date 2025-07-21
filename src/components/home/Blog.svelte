<script>  
  import { posts } from '$src/blog/posts'

</script>

<div class="header">Blog</div>
<div class="posts">
  {#each posts as post}
  <a href="/blog/{post.slug}" class="link">
    <div class="post">
      <img class="image" src={`/images/blog/${post.slug}.webp`} alt={post.slug}/>
      <div class="datecontainer">
        <img class="calendar" src="/images/calendar.png" alt="calendar" />
        <div class="date">{post.date.format("MMMM D, YYYY")}</div>
      </div>
      <div class="title">{post.title}</div>
      <div class="description">{post.description}</div>
      <div class="readcontainer">
        <div class="read">Read Post</div>
        <img class="arrow" src="/images/arrow.png" alt="arrow" />
      </div>
    </div>
  </a>
  {/each}
</div>

<style>
  .header {
    align-self: center;
    font-family: 'Merriweather', serif;
    font-size: 24px;
    font-weight: var(--regular);
    text-align: center;
    padding-top: 100px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
  }
  .link {
    text-decoration: none;
    color: inherit;
    display: block;
    }
  .link:hover {
    cursor: pointer;
  }
  .posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 15px;
  }
  .post {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    border: 1px solid var(--gray3);
    padding: 15px;
    min-height: 40px;
    background-color: #FCFBFB;

  }
  .image { 
    width: calc(100% - 20px);
    align-self: center;
  }
  .datecontainer {
    display: flex;
    margin-top: 10px;
    margin-left: 10px;
  }
  .calendar {
    width: 11.5px;
    height: 12.7px;
    margin-right: 5px;
  }
  .date {
    font-size: 12px;
  }
  .title {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 18px;
    font-weight: var(--bold);
  }
  .description {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: var(--regular);
    margin-bottom: 10px;
  }
  .readcontainer {
    margin-left: 10px;
    display: flex;
  }
  .read {
    font-size: 14px;
    text-decoration: underline;
  }
  .arrow {
    width: 16px;
    height: 12px;
    margin-top: 3px;
    margin-left: 5px;
  }
  @media (min-width: 768px) {
    .header {
      margin-bottom: 20px;
    }
    .posts {
      flex-direction: row;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      width: 768px;
      flex-wrap: wrap;
      margin-bottom: 40px;
      justify-content: center;
      align-items: flex-start;
    }
    .post {
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 20px;
      width: 320px;
      min-height: 550px;
    }
    .image { 
      width: 320px;
    }
    .datecontainer {
      margin-left: 0px;
    }
    .title {
      margin-left: 0px;
    }
    .description {
      margin-left: 0px;
    }
    .readcontainer {
      margin-left: 0px;
    }
  }
  @media (min-width: 900px) {  
    .posts {
      width: 900px;
    }
    .post {
      width: 400px;
    }
    .image { 
      width: 400px;
    }
  }
  @media (min-width: 1000px) {  
    .posts {
      width: 1000px;
    }
    .post {
      width: 420px;
    }
    .image { 
      width: 420px;
    }
  }
  @media (min-width: 1100px) {  
    .posts {
      width: 1100px;
    }
    .post {
      width: 450px;
    }
    .image { 
      width: 450px;
    }
  }
  @media (min-width: 1200px) {  
    .posts {
      width: 1200px;
    }
    .post {
      width: 470px;
    }
    .image { 
      width: 470px;
    }
  }
  @media (min-width: 1300px) {  
    .posts {
      width: 1200px;
    }
    .post {
      width: 500px;
    }
    .image { 
      width: 500px;
    }
  }


</style>