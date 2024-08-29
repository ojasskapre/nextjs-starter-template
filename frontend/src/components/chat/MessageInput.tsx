import { Button } from '@/components/ui/button';
import { ArrowUp, X } from 'lucide-react';
import { ChatHandler, ILLMModel } from '@/types/chat.interface';
import ModelsDropdown from './ModelsDropdown';

interface MessageInputProps
  extends Pick<
    ChatHandler,
    | 'isLoading'
    | 'input'
    | 'handleSubmit'
    | 'handleInputChange'
    | 'setInput'
    | 'stop'
  > {
  model: ILLMModel;
  setModel: React.Dispatch<React.SetStateAction<ILLMModel>>;
}

export default function MessageInput({
  isLoading,
  input,
  handleSubmit,
  handleInputChange,
  setInput,
  stop,
  model,
  setModel,
}: MessageInputProps) {
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
      <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl max-w-4xl my-4 mx-4 md:mx-8 lg:mx-auto space-y-2">
        {/* Textarea for message input */}
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
          className="w-full bg-transparent p-2 outline-none resize-none"
          rows={Math.min(input.split('\n').length, 8)}
          disabled={isLoading}
          onKeyDown={handleKeyDown}
        />

        {/* Bottom section with options and submit */}
        <div className="flex items-center justify-between">
          {/* Model Dropdown */}
          <ModelsDropdown model={model} setModel={setModel} />

          {/* Submit or stop button */}
          {!isLoading ? (
            <Button
              variant="default"
              size="icon"
              disabled={!input.trim()}
              type="submit"
              className="rounded-full"
            >
              <ArrowUp />
            </Button>
          ) : (
            <Button
              variant="default"
              size="icon"
              type="button"
              className="rounded-full"
              onClick={stop}
            >
              <X />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
