'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { IChatSession } from '@/types/chat.interface';
import { getAllChatSessions } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

interface ChatSessionContextProps {
  loading: boolean;
  error: string;
  chatSessions: IChatSession[];
  setChatSessions: React.Dispatch<React.SetStateAction<IChatSession[]>>;
  refreshChatSessions: () => void;
}

const ChatSessionContext = createContext<ChatSessionContextProps | undefined>(
  undefined
);

export const ChatSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<IChatSession[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChatSessions = async () => {
      setLoading(true);
      const token = await getToken();
      if (token) {
        try {
          const sessions = await getAllChatSessions(token);
          setChatSessions(sessions);
        } catch (_) {
          setError('Failed to fetch chat sessions');
        }
      }
      setLoading(false);
    };
    fetchChatSessions();
  }, []);

  const refreshChatSessions = useCallback(async () => {
    const token = await getToken();
    if (token) {
      const sessions = await getAllChatSessions(token);
      setChatSessions(sessions);
    }
  }, [getToken]);

  return (
    <ChatSessionContext.Provider
      value={{
        loading,
        error,
        chatSessions,
        setChatSessions,
        refreshChatSessions,
      }}
    >
      {children}
    </ChatSessionContext.Provider>
  );
};

export const useChatSession = () => {
  const context = useContext(ChatSessionContext);
  if (context === undefined) {
    throw new Error('useChatSession must be used within a ChatSessionProvider');
  }
  return context;
};
