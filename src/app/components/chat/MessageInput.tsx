import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, X } from 'lucide-react';
import { ChatHandler } from '@/types/chat.interface';

export default function MessageInput({
  isLoading,
  input,
  handleSubmit,
  handleInputChange,
  setInput,
  stop,
}: Pick<
  ChatHandler,
  | 'isLoading'
  | 'input'
  | 'handleSubmit'
  | 'handleInputChange'
  | 'setInput'
  | 'stop'
>) {
  const onSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (!input.trim()) return;
    // Clear the input field
    setInput!('');
    // Trigger the handleSubmit to process the message
    handleSubmit(e);
  };

  // allows to submit chat with Cmd / Ctrl + Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === 'Enter' && e.metaKey) || (e.key === 'Enter' && e.ctrlKey)) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div
        className={cn(
          'flex items-center bg-neutral-50 dark:bg-neutral-800 p-3 max-w-4xl mx-auto',
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
          onKeyDown={handleKeyDown}
        />
        {/* If response is being streamed i.e. is loading, then show stop streaming icon button */}
        {!isLoading ? (
          <Button
            variant="outline"
            size="icon"
            disabled={!input.trim()}
            type="submit"
            className="rounded-full"
          >
            <ArrowUp />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="rounded-full"
            onClick={stop}
          >
            <X />
          </Button>
        )}
      </div>
    </form>
  );
}
