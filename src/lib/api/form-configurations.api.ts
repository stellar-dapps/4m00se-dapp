export async function fetchFormConfigurations(userId: string, fetch: any) {
  const response = await fetch(`/api/form-configurations?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch form configurations');
  return response.json();
}

export async function createFormConfiguration(newFormConfig: any, fetch: any) {
  const response = await fetch('/api/form-configurations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newFormConfig)
  });
  if (!response.ok) throw new Error('Failed to create form configuration');
  return response.json();
}
