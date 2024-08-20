'use client';

import { useChat } from 'ai/react';
import { useRouter } from 'next/navigation';
import ChatMessages from './Messages';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import { fetchMessagesForSession } from '@/utils/api';
import { Message } from 'ai';
import { v4 as uuidv4 } from 'uuid';

type ChatSectionProps = {
  sessionId?: string;
};

export default function ChatSection({ sessionId }: ChatSectionProps) {
  const { getToken } = useAuth();
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(
    sessionId || uuidv4() // Generate a new sessionId if not provided
  );

  const router = useRouter();

  useEffect(() => {
    async function fetchToken() {
      const token = await getToken();
      setJwtToken(token);
    }

    fetchToken();
  }, [getToken]);

  useEffect(() => {
    async function loadMessages() {
      if (sessionId && jwtToken) {
        try {
          const messages = await fetchMessagesForSession(sessionId, jwtToken);
          setInitialMessages(messages);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    }
    loadMessages();
  }, [sessionId, jwtToken]);

  const headers: Record<string, string> = {};

  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`;
  }

  const {
    input,
    isLoading,
    messages,
    handleInputChange,
    setInput,
    handleSubmit,
    stop,
  } = useChat({
    api: sessionId
      ? `${process.env.NEXT_PUBLIC_CHAT_API}/api/sessions/${sessionId}`
      : `${process.env.NEXT_PUBLIC_CHAT_API}/api/chat`,
    headers,
    initialMessages: initialMessages,
    streamProtocol: 'text',
    body: { sessionId: currentSessionId },
    onFinish: () => {
      // Route to the new session page only after the first message is sent
      if (!sessionId) {
        router.push(`/chat/${currentSessionId}`);
      }
    },
  });

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-4 w-full h-full flex flex-col">
        {messages.length ? (
          <ChatMessages messages={messages} isLoading={isLoading} />
        ) : (
          <EmptyScreen handleSubmit={handleSubmit} setInput={setInput} />
        )}
        <MessageInput
          isLoading={isLoading}
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          setInput={setInput}
          stop={stop}
        />
      </div>
    </div>
  );
}
