<script lang="ts">
  export let label;
  export let name;
  export let value;
  export let onChange;

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  }
</script>

<div class="form-group">
  <label for={name}>{label}</label>
  <input type="text" id={name} {name} {value} on:input={handleInput} />
</div>
