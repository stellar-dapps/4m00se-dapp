import type { FormConfig } from '$lib/models/form-config.model.ts';

export const StellarConfig: FormConfig = {
  id: '1',
  name: 'Stellar Build Better Submission',
  createdBy: '1',
  createdAt: new Date(),
  fields: [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'github', label: 'GitHub Username' },
    { name: 'repo', label: 'Repo Link (Optional)' },
    {
      name: 'post',
      label: 'Dev.to Submission Post',
      required: true,
      placeholder: 'Link to your project hosted on dev.to'
    }
  ],
  submitUrl: '#',
  consent:
    'By providing the contact information required in this form, you agree to be contacted by the Stellar Development Foundation (SDF) in order for us to inform you about our products and services. For more information on our privacy practices or how to unsubscribe, please refer to our [Privacy Policy](https://stellar.org/privacy-policy).',
  styles: {
    isRounded: true
  }
};
