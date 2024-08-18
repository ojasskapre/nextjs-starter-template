import { useState } from 'react';
import { Message } from '@/types/message';
import { ArrowUp } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: Message) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line on Shift + Enter
        setInputValue((prev) => prev + '\n');
      } else {
        // Submit the message on Enter
        e.preventDefault(); // Prevent default form submission
        handleSend();
      }
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        role: 'user',
        createdAt: new Date(),
      };
      onSend(newMessage);
      setInputValue(''); // Clear input after sending
    }
  };

  return (
    <div
      className={`flex items-center bg-primary p-3 mx-64 ${
        inputValue.split('\n').length <= 1 ? 'rounded-full' : 'rounded-3xl'
      }`}
    >
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Message Bot"
        className="flex-1 bg-transparent text-card-foreground placeholder-muted-foreground p-2 outline-none resize-none" // Use textarea for multi-line input
        onKeyDown={handleKeyDown}
        rows={Math.min(inputValue.split('\n').length, 10)}
      />
      <button
        onClick={handleSend}
        disabled={!inputValue.trim()}
        className={`ml-2 p-2 rounded-full flex items-center justify-center
          ${
            inputValue.trim()
              ? 'bg-button-bg hover:bg-button-hover-bg'
              : 'bg-button-disabled-bg'
          }
        `}
      >
        <ArrowUp
          className={`h-5 w-5 ${
            inputValue.trim()
              ? 'text-background'
              : 'text-button-disabled-foreground'
          }`}
        />
      </button>
    </div>
  );
}
