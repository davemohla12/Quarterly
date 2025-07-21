<script>
  import Header from '$src/components/home/Header.svelte'
  import Menu from '$src/components/home/Menu.svelte'
  import Overlay from '$src/components/home/Overlay.svelte'
  import { global } from '$src/data/global.svelte'
  import Footer from '$src/components/home/Footer.svelte'
  import Blog from '$src/components/home/Blog.svelte'

const dismissMenu = () => {
  global.showMenu = false
}
</script>

{#if global.showMenu}
  <Menu />
  <Overlay ondismiss={dismissMenu} />
{/if}
<Header />
<Blog />
<Footer />

