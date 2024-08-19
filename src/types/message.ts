export type Message = {
  id: string;
  content: string;
  role: 'function' | 'data' | 'system' | 'user' | 'assistant' | 'tool';
  createdAt?: Date | undefined;
};
