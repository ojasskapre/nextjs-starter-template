import { Message } from '@/types/message';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { Check, Copy } from 'lucide-react';
import ChatAvatar from './Avatar';
import Markdown from './Markdown';

export default function ChatMessage({ chatMessage }: { chatMessage: Message }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const cardClass =
    chatMessage.role === 'user'
      ? 'bg-primary text-card-foreground'
      : 'bg-secondary text-card-foreground';

  return (
    <div
      className={`flex items-start gap-4 pr-5 pt-5 ${cardClass} p-4 rounded-lg shadow-lg`}
    >
      <ChatAvatar role={chatMessage.role} />
      <div className="group flex flex-1 flex-grow justify-between gap-2">
        <Markdown content={chatMessage.content} />
        <button
          onClick={() => copyToClipboard(chatMessage.content)}
          className="h-8 w-8"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-foreground" />
          ) : (
            <Copy className="h-4 w-4 text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
