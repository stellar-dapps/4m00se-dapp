<script lang="ts">
  export let mainTitle = 'No forms yet';
  export let mainSubTitle = `You haven't created any forms yet. Click the button below to get started.`;
  export let ctaTitle = 'Create form';
  export let onCtaTrigger;
</script>

<section>
  <div>
    <h2>{mainTitle}</h2>
    <p>{mainSubTitle}</p>
    <button type="button" class="secondary" on:click={onCtaTrigger}>{ctaTitle}</button>
  </div>
</section>

<style>
  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50%;
  }
  p {
    text-align: center;
  }
  button {
    width: 100%;
  }
</style>
