<script lang="ts">
  export let label = '';
  export let name = '';
  export let checked = false;
  export let disabled = false;
  export let onChange = (event: any) => {};

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange(target.checked);
  }
</script>

<div class="form-group">
  <label>
    <input type="checkbox" role="switch" {name} {checked} {disabled} on:change={handleChange} />
    {label}
  </label>
</div>
