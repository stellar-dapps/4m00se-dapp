export interface FormSubmission {
  id: string;
  submittedAt: Date;
  formConfigId: string;
  formData: FormData;
}

export interface FormSubmissionPinataMeta {
  submittedAt: Date;
  submittedBy: string; // public key
  tx: string;
  formData: string; // base64
}
