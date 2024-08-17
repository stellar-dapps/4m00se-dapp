<script lang="ts">
  export let mainTitle = 'No forms yet';
  export let mainSubTitle = `You haven't created any forms yet. Click the button below to get started.`;
  export let ctaTitle = 'Create form';
</script>

<section>
  <div>
    <h1>{mainTitle}</h1>
    <p>{mainSubTitle}</p>
    <button type="button" class="secondary">{ctaTitle}</button>
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
