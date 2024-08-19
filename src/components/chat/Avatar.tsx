import { User2, Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ChatAvatar({ role }: { role: string }) {
  return (
    <Avatar>
      <AvatarFallback className="flex items-center justify-center rounded-full">
        {role === 'user' ? (
          <User2 className="h-6 w-6 font-bold" />
        ) : (
          <Bot className="h-6 w-6 font-bold" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
