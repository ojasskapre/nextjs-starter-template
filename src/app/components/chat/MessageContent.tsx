import Markdown from './Markdown';
import { Message } from '@/types/message';

export default function ChatMessageContent({ message }: { message: Message }) {
  return <Markdown content={message.content} />;
}
