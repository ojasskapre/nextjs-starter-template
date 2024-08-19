'use client';

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from '@/types/message';
import ChatMessage from './Message';

export default function ChatMessages({
  messages,
  isLoading,
  append,
}: {
  messages: Message[];
  isLoading: boolean;
  append: (message: Message) => void;
}) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);

  const messageLength = messages.length;
  const lastMessage = messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== 'user';

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage]);

  return (
    <div
      className="flex-1 w-full p-4 relative overflow-y-auto px-64 scroll-smooth"
      ref={scrollableChatContainerRef}
    >
      <div className="flex flex-col gap-5 divide-y divide-border">
        {messages.map((m, i) => {
          return <ChatMessage key={m.id} chatMessage={m} />;
        })}
        {isPending && (
          <div className="flex justify-center items-center pt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
