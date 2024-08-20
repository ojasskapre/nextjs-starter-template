'use client';

import ChatSection from '@/components/chat/Section';
import { useAuth } from '@/context/AuthContext';

export default function Home({ params }: { params: { session_id: string } }) {
  const { user } = useAuth();

  const { session_id: sessionId } = params;

  return user ? (
    <ChatSection sessionId={sessionId} />
  ) : (
    <div>Hello, World! No user logged in!</div>
  );
}
