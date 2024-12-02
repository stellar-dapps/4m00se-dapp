<script lang="ts">
  interface Props {
    label?: string;
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: any;
  }

  let { label = '', name = '', checked = false, disabled = false, onChange = (event: any) => {} }: Props = $props();

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange(target.checked);
  }
</script>

<div class="form-group">
  <label>
    <input type="checkbox" role="switch" {name} {checked} {disabled} onchange={handleChange} />
    {label}
  </label>
</div>
