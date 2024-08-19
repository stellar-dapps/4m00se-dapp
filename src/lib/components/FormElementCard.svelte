<script lang="ts">
  import type { FormField } from '$lib/models/form-config.model.ts';

  export let field: FormField;
</script>

<article class="grid-container">
  <div class="column grid-container-nested">
    <div class="sub-column">name:</div>
    <div class="sub-column">
      {field.name}
    </div>
  </div>
  <div class="column preview">
    adasdsada adasdsada adasdsada adasdsada adasdsada adasdsada adasdsada adasdsada adasdsada adasdsada
  </div>
</article>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .grid-container-nested {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }
  .preview {
    border: 2px solid var(--pico-muted-border-color);
    border-radius: 0.5rem;
    padding: 1rem;
  }
</style>
