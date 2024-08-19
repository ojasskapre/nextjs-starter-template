'use client';

import { useChat } from 'ai/react';
import ChatMessages from './Messages';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';

export default function ChatSection() {
  const { getToken } = useAuth();
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const token = await getToken();
      setJwtToken(token);
    }

    fetchToken();
  }, [getToken]);

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
    api: `${process.env.NEXT_PUBLIC_CHAT_API}/api/chat`,
    headers,
    streamProtocol: 'text',
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
