import { useEffect, useRef } from 'react';
import { Message } from '@/types/message';
import ChatMessage from './Message';

export default function ChatMessages({ messages }: { messages: Message[] }) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);

  const messageLength = messages.length;
  const lastMessage = messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

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
      </div>
    </div>
  );
}
