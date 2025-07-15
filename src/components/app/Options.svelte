<script>
  import Clickable from '$src/components/app/Clickable.svelte'

  let props = $props()
  let hideEdit = props.hideEdit || false
  let onEditClick = props.onEditClick
  let onDownloadClick = props.onDownloadClick
  let onViewClick = props.onViewClick
  let viewText = $derived(props.viewText)
  
  const handleEditClick = () => {
    onEditClick()
  }
  
  const handleDownloadClick = () => {
    onDownloadClick()
  }

  const handleViewClick = () => {
    onViewClick()
  }
</script>

<div class="options">
  {#if !hideEdit}
    <Clickable onclick={handleEditClick}>  
      <div class="option edit">EDIT INPUTS</div>
    </Clickable>
  {/if}
  <Clickable onclick={handleDownloadClick}>
    <div class="option download">DOWNLOAD PDF</div>
  </Clickable>
  <Clickable onclick={handleViewClick}>
    <div class="option view">{viewText}</div>
  </Clickable>
</div>

<style>
  .options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    gap: 15px;
    margin-top: 5px;
  }
  .option {
    color: var(--gray4);
    font-size: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .edit {
    order: 1;
  }
  .download {
    order: 2;
  }
  .view {
    order: 3;
  }
  @media (min-width: 768px) {
    .options {
      width: 100%;
      margin-top: 8px;
    } 
    .option {
      font-size: 16px;
    }
    .view {
      order: 1;
    }
    .download { 
    order: 2;
    }
    .edit {
    order: 3;
    }
  }
</style>



