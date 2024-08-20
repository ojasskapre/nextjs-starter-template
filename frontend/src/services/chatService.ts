import { fetchWithAuth } from '@/utils/fetchWithAuth';

export async function getAllChatSessions(token: string) {
  const url = `${process.env.NEXT_PUBLIC_CHAT_API}/api/sessions`;
  return await fetchWithAuth(url, token);
}
