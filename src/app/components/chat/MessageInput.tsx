import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
        className={cn(
          'flex items-center bg-neutral-50 dark:bg-neutral-800 p-3 mx-64',
          input.split('\n').length <= 1 ? 'rounded-full' : 'rounded-3xl'
        )}
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Message Bot"
          className="flex-1 bg-transparent p-2 outline-none resize-none"
          rows={Math.min(input.split('\n').length, 10)}
          disabled={isLoading}
        />

        <Button
          variant="outline"
          size="icon"
          disabled={isLoading || !input.trim()}
          type="submit"
          className="rounded-full"
        >
          <ArrowUp />
        </Button>
      </div>
    </form>
  );
}
