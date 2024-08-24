import { Message } from 'ai';

export interface ChatHandler {
  messages: Message[];
  input: string;
  isLoading: boolean;
  handleSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
    ops?: {
      data?: any;
    }
  ) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reload?: () => void;
  stop?: () => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
  setInput?: (input: string) => void;
  append?: (
    message: Message | Omit<Message, 'id'>,
    ops?: {
      data: any;
    }
  ) => Promise<string | null | undefined>;
}

export interface IChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ILLMModel {
  id: string;
  name: string;
}
