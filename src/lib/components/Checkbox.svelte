<script lang="ts">
  export let label;
  export let name = '';
  export let checked = false;
  export let onChange = (event: any) => {};

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
