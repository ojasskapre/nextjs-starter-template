import { useState } from 'react';
import { Message } from '@/types/message';
import ChatMessages from './Messages';
import MessageInput from './MessageInput';

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Welcome to the chat! How can I assist you today?',
    role: 'system',
    createdAt: new Date('2024-08-18T10:00:00Z'),
  },
  {
    id: '2',
    content: 'Can you show me an example of JavaScript code?',
    role: 'user',
    createdAt: new Date('2024-08-18T10:01:00Z'),
  },
  {
    id: '3',
    content: `Sure! Here’s a simple example of a **JavaScript** function:\n\n\`\`\`javascript\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n\`\`\``,
    role: 'system',
    createdAt: new Date('2024-08-18T10:02:00Z'),
  },
  {
    id: '4',
    content:
      'Thanks! Can you also explain the difference between `let`, `var`, and `const`?',
    role: 'user',
    createdAt: new Date('2024-08-18T10:03:00Z'),
  },
  {
    id: '5',
    content: `Certainly! Here's a brief explanation:\n\n- \`var\`: Function-scoped or globally-scoped. Can be redeclared and updated. Hoisted to the top of their scope.\n- \`let\`: Block-scoped. Can be updated but not redeclared. Not hoisted.\n- \`const\`: Block-scoped. Cannot be updated or redeclared. Not hoisted.\n\n*Use \`let\` and \`const\` over \`var\` in modern JavaScript for better control over variable scope and reassignment.*`,
    role: 'system',
    createdAt: new Date('2024-08-18T10:04:00Z'),
  },
  {
    id: '6',
    content: 'Got it! Can you create a markdown list of my tasks for today?',
    role: 'user',
    createdAt: new Date('2024-08-18T10:05:00Z'),
  },
  {
    id: '7',
    content: `Here’s your task list for today:\n\n1. **Team Meeting** at 10 AM\n2. Review **PRs** and provide feedback\n3. Complete the **dashboard feature** implementation\n4. Write **unit tests** for the new components\n5. Prepare the **presentation** for tomorrow's meeting`,
    role: 'system',
    createdAt: new Date('2024-08-18T10:06:00Z'),
  },
  {
    id: '8',
    content:
      'Thanks for the list! Can you also send me a link to the project documentation?',
    role: 'user',
    createdAt: new Date('2024-08-18T10:07:00Z'),
  },
  {
    id: '9',
    content:
      'Sure! Here’s the [project documentation](https://example.com/docs) link.',
    role: 'system',
    createdAt: new Date('2024-08-18T10:08:00Z'),
  },
  {
    id: '10',
    content: 'Perfect! One last thing, can you provide an inline code example?',
    role: 'user',
    createdAt: new Date('2024-08-18T10:09:00Z'),
  },
  {
    id: '11',
    content:
      'Certainly! Here’s how you can create an array in JavaScript: `const array = [1, 2, 3, 4];`.',
    role: 'system',
    createdAt: new Date('2024-08-18T10:10:00Z'),
  },
  {
    id: '12',
    content: 'You’ve been very helpful, thanks!',
    role: 'user',
    createdAt: new Date('2024-08-18T10:11:00Z'),
  },
  {
    id: '13',
    content: 'You’re welcome! Let me know if you need anything else.',
    role: 'system',
    createdAt: new Date('2024-08-18T10:12:00Z'),
  },
];

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Add a default system response
    const systemResponse: Message = {
      id: Date.now().toString(),
      content: 'Thank you for your message! How can I assist you further?',
      role: 'system',
      createdAt: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, systemResponse]);
  };

  return (
    <div className="flex-1 h-full flex flex-col justify-center">
      <div className="space-y-4 w-full h-full flex flex-col">
        <ChatMessages messages={messages} />
        <MessageInput onSend={handleSendMessage} />{' '}
      </div>
    </div>
  );
}
