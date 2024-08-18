<script lang="ts">
  export let text = '';
  export let onEdited;

  function handleInput(event) {
    onEdited(event.target.innerText);
  }
</script>

<div class={text === 'N/A*' ? 'pico-color-pink-450' : ''} contenteditable="true" on:input={handleInput}>
  {text}
</div>
