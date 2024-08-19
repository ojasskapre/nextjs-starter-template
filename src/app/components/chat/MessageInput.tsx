import { Message } from '@/types/message';
import { ArrowUp } from 'lucide-react';

interface MessageInputProps {
  isLoading: boolean;
  input: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  append: (message: Message) => void;
}

export default function MessageInput({
  isLoading,
  input,
  handleSubmit,
  handleInputChange,
  setInput,
  append,
}: MessageInputProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!input.trim()) return;
    // Clear the input field
    setInput('');
    // Trigger the handleSubmit to process the message
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit}>
      <div
        className={`flex items-center bg-primary p-3 mx-64 ${
          input.split('\n').length <= 1 ? 'rounded-full' : 'rounded-3xl'
        }`}
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Message Bot"
          className="flex-1 bg-transparent text-card-foreground placeholder-muted-foreground p-2 outline-none resize-none"
          rows={Math.min(input.split('\n').length, 10)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`ml-2 p-2 rounded-full flex items-center justify-center ${
            input.trim()
              ? 'bg-button-bg hover:bg-button-hover-bg'
              : 'bg-button-disabled-bg'
          }`}
        >
          <ArrowUp
            className={`h-5 w-5 ${
              input.trim()
                ? 'text-background'
                : 'text-button-disabled-foreground'
            }`}
          />
        </button>
      </div>
    </form>
  );
}
