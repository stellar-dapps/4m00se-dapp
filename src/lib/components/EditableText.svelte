<script lang="ts">
  interface Props {
    text?: string;
    onEdited: any;
  }

  let { text = '', onEdited }: Props = $props();

  function handleInput(event) {
    onEdited(event.target.innerText);
  }
</script>

<div class={text === 'N/A*' ? 'pico-color-pink-450' : ''} contenteditable="true" oninput={handleInput}>
  {text}
</div>
