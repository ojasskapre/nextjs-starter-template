export type Message = {
  id: string;
  content: string;
  role: 'system' | 'user';
  createdAt: Date;
};
