import { Message } from '@/types/message';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { Check, Copy } from 'lucide-react';
import ChatAvatar from './Avatar';
import Markdown from './Markdown';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ChatMessage({ chatMessage }: { chatMessage: Message }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  return (
    <Card className="flex items-start gap-4 p-4 rounded-lg shadow-lg">
      <ChatAvatar role={chatMessage.role} />
      <CardContent className="group flex flex-1 flex-grow justify-between gap-2">
        <Markdown content={chatMessage.content} />
        <Button
          onClick={() => copyToClipboard(chatMessage.content)}
          variant="outline"
          size="icon"
          className="h-8 w-8 min-w-[32px] flex items-center justify-center"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-foreground" />
          ) : (
            <Copy className="h-4 w-4 text-foreground" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
