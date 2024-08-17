<script lang="ts">
  export let text = '';
  export let onEdited;

  function handleInput(event) {
    onEdited(event.target.innerText);
  }
</script>

<div contenteditable="true" on:input={handleInput}>
  {text}
</div>
