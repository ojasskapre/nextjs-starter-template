import { Card, CardContent } from '@/components/ui/card';
import { ChatHandler } from '@/types/chat.interface';

export function ExampleChatsPanel({
  handleSubmit,
  setInput,
}: Pick<ChatHandler, 'handleSubmit' | 'setInput'>) {
  const examples = [
    {
      question: 'How can I improve my',
      detail: 'time management skills?',
    },
    {
      question: 'Can you suggest',
      detail: 'a good book to read?',
    },
    {
      question: 'How can I start learning',
      detail: 'a new language?',
    },
    {
      question: 'What are the benefits of',
      detail: 'regular exercise?',
    },
  ];

  const onCardClick = (index: number) => {
    const example = examples[index];
    const message = `${example.question} ${example.detail}`;

    setInput!(message);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {examples.map((example, index) => (
        <Card
          key={index}
          className="hover:bg-neutral-100 hover:dark:bg-neutral-900 cursor-pointer"
          onClick={() => onCardClick(index)}
        >
          <CardContent className="pt-4">
            <p className="font-bold">{example.question}</p>
            <p>{example.detail}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
