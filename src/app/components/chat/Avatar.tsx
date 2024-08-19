import { User2, Bot } from 'lucide-react';

export default function ChatAvatar({ role }: { role: string }) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 select-none ${
        role === 'user' ? 'bg-foreground' : 'border border-foreground'
      } items-center justify-center shadow rounded-full`}
    >
      {role === 'user' ? (
        <User2 className="h-5 w-5 text-background font-bold" />
      ) : (
        <Bot className="h-5 w-5 text-foreground font-bold" />
      )}
    </div>
  );

  // return next/image based on model used
}
