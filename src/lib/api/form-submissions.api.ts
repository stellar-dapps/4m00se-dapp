export async function fetchFormSubmissions(formId: string, fetch: any) {
  const response = await fetch(`/api/form-submissions?formId=${formId}`);
  if (!response.ok) throw new Error('Failed to fetch form submissions');
  return response.json();
}
