import type { FormElementOption } from '$lib/models/form-element-option.model.ts';

export const formElementSelectOptions: FormElementOption[] = [
  {
    title: 'Base text field',
    type: 'text',
    id: '1'
  },
  // {
  //   title: 'Email address',
  //   type: 'email',
  //   id: '2'
  // },
  {
    title: 'Yes/No option',
    type: 'checkbox',
    id: '3'
  }
];
