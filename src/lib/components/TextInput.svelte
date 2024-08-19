<script lang="ts">
  export let label = '';
  export let name = '';
  export let value = '';
  export let placeholder: string | null = null;
  export let disabled = false;
  export let required = false;
  export let onChange = (event: any) => {};

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  }
</script>

<div class="form-group">
  <label for={name}
    >{label}{#if required}<sup>*</sup>{/if}</label
  >
  <input type="text" id={name} {name} {value} {placeholder} {disabled} on:input={handleInput} />
</div>
