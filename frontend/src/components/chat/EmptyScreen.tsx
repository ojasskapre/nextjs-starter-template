import { ChatHandler } from '@/types/chat.interface';
import { ExampleChatsPanel } from './ExampleChatsPanel';

export default function EmptyScreen({
  handleSubmit,
  setInput,
}: Pick<ChatHandler, 'handleSubmit' | 'setInput'>) {
  return (
    <div className="flex-1 w-full p-2 md:p-4 overflow-y-auto scroll-smooth">
      <div className="mx-auto h-full max-w-4xl px-4 lg:px-0 flex flex-col justify-between">
        <div className="flex flex-col items-start rounded-lg bg-background md:p-8">
          <h1 className="text-lg font-semibold mb-4">
            Welcome to Next.js AI Chatbot!
          </h1>
          <p className="leading-normal text-muted-foreground mb-8">
            This is an open source AI chatbot app template built with Next.js,
            the Vercel AI SDK, Langchain.js, Shadcn, TailwindCSS, TypeScript and
            Supabase.
          </p>
          <p className="leading-normal text-muted-foreground mb-8">
            Start chatting with our AI-powered assistant. Explore the example
            questions below to get started.
          </p>
        </div>
        <ExampleChatsPanel handleSubmit={handleSubmit} setInput={setInput} />
      </div>
    </div>
  );
}
