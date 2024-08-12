export interface FormSubmission {
  id: string;
  submittedAt: Date;
  formConfigId: string;
  formData: FormData;
}
