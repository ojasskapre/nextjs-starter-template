export async function fetchWithAuth(
  url: string,
  token: string,
  options: RequestInit = {}
) {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
}
