import { User2, Bot } from 'lucide-react';

export default function ChatAvatar({ role }: { role: string }) {
  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border border-foreground shadow">
      {role === 'user' ? (
        <User2 className="h-4 w-4 text-foreground" />
      ) : (
        <Bot className="h-4 w-4" />
      )}
    </div>
  );

  // return next/image based on model used
}
