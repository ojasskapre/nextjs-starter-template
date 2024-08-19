import { useChat } from 'ai/react';
import ChatMessages from './Messages';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';

export default function ChatSection() {
  const {
    input,
    isLoading,
    messages,
    handleInputChange,
    setInput,
    handleSubmit,
    stop,
  } = useChat({
    api: '/api/chat',
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
