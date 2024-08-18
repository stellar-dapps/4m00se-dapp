export function decodeBase64(base64String: string) {
  if (!base64String) {
    return;
  }

  try {
    return atob(base64String);
  } catch (e) {
    console.error('Invalid Base64 string:', e);
    return null;
  }
}
