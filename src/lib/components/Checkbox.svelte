<script lang="ts">
  export let label;
  export let name;
  export let checked;
  export let onChange;

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange(target.checked);
  }
</script>

<div class="form-group">
  <label>
    <input type="checkbox" {name} {checked} on:change={handleChange} />
    {label}
  </label>
</div>
