'use client';

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { ChatHandler } from '@/types/chat.interface';
import ChatMessage from './Message';

export default function ChatMessages({
  messages,
  isLoading,
}: Pick<ChatHandler, 'messages' | 'isLoading'>) {
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
      className="flex-1 w-full px-2 md:px-4 relative overflow-y-auto scroll-smooth"
      ref={scrollableChatContainerRef}
    >
      <div className="flex flex-col gap-2 md:gap-4 lg:gap-5 max-w-4xl mx-auto">
        {messages.map((m, i) => {
          return <ChatMessage key={m.id} chatMessage={m} />;
        })}
        {isPending && (
          <div className="flex justify-center items-center pt-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}
