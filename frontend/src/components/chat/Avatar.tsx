import { User2, Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ChatAvatar({ role }: { role: string }) {
  return (
    <Avatar className="h-8 w-8 md:h-10 md:w-10">
      <AvatarFallback className="flex items-center justify-center rounded-full h-8 w-8 md:h-10 md:w-10">
        {role === 'user' ? (
          <User2 className="h-4 md:h-6 w-4 md:w-6 font-bold" />
        ) : (
          <Bot className="h-4 md:h-6 w-4 md:w-6 font-bold" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
