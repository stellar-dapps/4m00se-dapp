import type { FormConfig } from '$lib/models/form-config.model.ts';

export const mockFormConfigs: FormConfig[] = [
  {
    id: '1',
    name: 'My form 1',
    createdAt: new Date(),
    createdBy: '1',
    fields: [
      { name: 'firstName', label: 'First Name', required: true },
      { name: 'lastName', label: 'Last Name', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel' }
    ],
    submitUrl: '/submit-form-1',
    submitButtonTitle: 'Register',
    consent:
      'By submitting this form, you agree to our [Terms of Service](/terms-of-service) and [Privacy Policy](/privacy-policy).',
    styles: {
      isRounded: true
    }
  },
  {
    id: '2',
    name: 'My form 2',
    createdAt: new Date(),
    createdBy: '1',
    fields: [
      { name: 'username', label: 'Username', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true }
    ],
    submitUrl: '/submit-form-2',
    submitButtonTitle: 'Sign Up',
    consent:
      'By creating an account, you agree to our [Terms of Service](/terms-of-service) and [Privacy Policy](/privacy-policy).',
    styles: {
      isRounded: false
    }
  }
];
