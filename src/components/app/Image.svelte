<script>
  let props = $props()
  let src = props.src
  let alt = props.alt
  let width = props.width 
  let height = props.height 

</script>
<img class="image" src={src} alt={alt}  style={`--width: ${width}; --height: ${height}`} />

<style>
  .image {
    width: var(--width);
    height: var(--height);
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    display: block;
    margin-bottom: 30px;
  }
</style>