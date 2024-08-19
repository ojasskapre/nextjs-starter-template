import { useChat } from 'ai/react';
import ChatMessages from './Messages';
import MessageInput from './MessageInput';

export default function ChatSection() {
  const {
    messages,
    handleInputChange,
    setInput,
    handleSubmit,
    input,
    append,
    isLoading,
  } = useChat({
    api: '/api/chat',
    streamProtocol: 'text',
  });

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-4 w-full h-full flex flex-col">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          append={append}
        />
        <MessageInput
          isLoading={isLoading}
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          setInput={setInput}
          append={append}
        />{' '}
      </div>
    </div>
  );
}
