<script>
  import Header from '$src/components/home/Header.svelte'
  import Menu from '$src/components/home/Menu.svelte'
  import Overlay from '$src/components/home/Overlay.svelte'
  import { global } from '$src/data/global.svelte'
  import Footer from '$src/components/home/Footer.svelte'
  import Post from '$src/components/home/Post.svelte'

  const props = $props()
  const data = $derived(props.data)

  const dismissMenu = () => {
    global.showMenu = false
  }

</script>

<svelte:head>
  <title>Zenguider | {data.post.title} </title>
  <meta name="description" content={data.post.description} />

  <meta property="og:title" content={`Zenguider | ${data.post.title}`} />
  <meta property="og:description" content={data.post.description} />
  <meta property="og:image" content="https://zenguider.com/images/og/{data.post.slug}.png" />
  <meta property="og:url" content="https://zenguider.com/blog/{data.post.slug}" />
  <meta property="og:type" content="article" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`Zenguider | ${data.post.title}`} />
  <meta name="twitter:description" content={data.post.description} />
  <meta name="twitter:image" content="https://zenguider.com/images/og/{data.post.slug}.png" />
</svelte:head>

{#if global.showMenu}
  <Menu />
  <Overlay ondismiss={dismissMenu} />
{/if}
<Header />
<Post content={data.content} />
<Footer />

