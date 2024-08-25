import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { Check, Copy } from 'lucide-react';
import ChatAvatar from './Avatar';
import Markdown from './Markdown';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Message } from 'ai';

export default function ChatMessage({ chatMessage }: { chatMessage: Message }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  return (
    <Card className="flex items-start gap-4 py-4 px-2 md:px-4 rounded-lg shadow-lg">
      <CardContent className="group flex flex-1 gap-2 sm:gap-4 p-0">
        <ChatAvatar role={chatMessage.role} />
        <div className="flex-1 pt-1 max-w-[calc(100vw-120px)] min-[620px]:max-w-[500px] min-[720px]:max-w-[600px] min-[820px]:max-w-[660px] min-[874px]:max-w-[700px] lg:max-w-[760px] break-words overflow-hidden">
          <Markdown content={chatMessage.content} />
        </div>
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
