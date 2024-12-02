<script lang="ts">
  interface Props {
    label?: string;
    name?: string;
    value?: string;
    placeholder?: string | null;
    disabled?: boolean;
    required?: boolean;
    onChange?: any;
  }

  let {
    label = '',
    name = '',
    value = '',
    placeholder = null,
    disabled = false,
    required = false,
    onChange = (event: any) => {}
  }: Props = $props();

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange(target.value);
  }
</script>

<div class="form-group">
  <label for={name}
    >{label}{#if required}<sup>*</sup>{/if}</label
  >
  <input type="text" id={name} {name} {value} {placeholder} {disabled} oninput={handleInput} />
</div>
