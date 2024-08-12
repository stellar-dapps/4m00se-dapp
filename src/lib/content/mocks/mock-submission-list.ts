import type { FormSubmission } from '$lib/models/form-submission.model.ts';

// related to mock-configuration-list content

const formData1_1 = new FormData();
formData1_1.append('firstName', 'Jane');
formData1_1.append('lastName', 'Smith');
formData1_1.append('email', 'janesmith@example.com');
formData1_1.append('phone', '0987654321');

const formData1_2 = new FormData();
formData1_2.append('firstName', 'Bob');
formData1_2.append('lastName', 'Johnson');
formData1_2.append('email', 'bobjohnson@example.com');
formData1_2.append('phone', '1112223333');

const formData2_1 = new FormData();
formData2_1.append('username', 'janedoe');
formData2_1.append('password', 'securepassword');
formData2_1.append('confirmPassword', 'securepassword');

const formData2_2 = new FormData();
formData2_2.append('username', 'bobsmith');
formData2_2.append('password', 'password456');
formData2_2.append('confirmPassword', 'password456');

export const mockFormSubmissions: FormSubmission[] = [
  {
    id: '1_1',
    submittedAt: new Date(),
    formConfigId: '1',
    formData: formData1_1
  },
  {
    id: '1_2',
    submittedAt: new Date(),
    formConfigId: '1',
    formData: formData1_2
  },
  {
    id: '2_1',
    submittedAt: new Date(),
    formConfigId: '2',
    formData: formData2_1
  },
  {
    id: '2_2',
    submittedAt: new Date(),
    formConfigId: '2',
    formData: formData2_2
  }
];
