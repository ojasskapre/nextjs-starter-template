import { fetchWithAuth } from './fetchWithAuth';

export async function getAllChatSessions(token: string) {
  const url = `${process.env.NEXT_PUBLIC_CHAT_API}/api/sessions`;
  return await fetchWithAuth(url, token);
}

export async function fetchMessagesForSession(
  sessionId: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_CHAT_API}/api/sessions/${sessionId}`;
  return await fetchWithAuth(url, token);
}
