<script> 
  import { global } from '$src/data/global.svelte'
  import Menu from '$src/components/home/Menu.svelte'
  import Overlay from '$src/components/home/Overlay.svelte'
  import Header from '$src/components/home/Header.svelte'
  import Terms from '$src/components/home/Terms.svelte'
  import Footer from '$src/components/home/Footer.svelte' 
</script>

{#if global.showMenu}
<Menu />
<Overlay />
{/if}
<Header />
<Terms />
<Footer />

