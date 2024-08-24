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
  const [chatSessions, setChatSessions] = useState<IChatSession[]>([]);

  useEffect(() => {
    const fetchChatSessions = async () => {
      const token = await getToken();
      if (token) {
        const sessions = await getAllChatSessions(token);
        setChatSessions(sessions);
      }
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
      value={{ chatSessions, setChatSessions, refreshChatSessions }}
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
