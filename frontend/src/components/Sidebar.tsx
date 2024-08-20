'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  PanelRightOpen,
  PanelRightClose,
  CirclePlus,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { getAllChatSessions } from '@/utils/api';
import { IChatSession } from '@/types/chat.interface';
import ChatSessionsList from '@/components/chat/SessionsList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Sidebar: React.FC = () => {
  const { user, getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [chatSessions, setChatSessions] = useState<IChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  if (!user) return null;

  useEffect(() => {
    async function fetchChatSessions() {
      try {
        setIsLoading(true);
        setError('');
        const token = await getToken();
        if (token) {
          const sessions = await getAllChatSessions(token);
          setChatSessions(sessions);
        } else {
          throw new Error('token not available');
        }
      } catch (error) {
        setError('Failed to fetch chat sessions');
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchChatSessions();
    }
  }, []);

  return (
    <div
      className={cn(
        'flex h-full',
        !isOpen && 'pt-4 pl-4',
        isOpen && 'border-r border-neutral-100 dark:border-neutral-900'
      )}
    >
      {/* Sidebar - pinned and collapsible */}
      {!isOpen ? (
        <div className="flex items-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2"
          >
            <PanelRightClose className="w-6 h-6" />
          </Button>
        </div>
      ) : (
        <Card
          className={cn(
            'border-0 h-full flex flex-col transition-all duration-300',
            isOpen ? 'w-72 p-4' : 'w-0'
          )}
        >
          <div className="flex justify-between items-center mb-4">
            {isOpen && <h2 className="text-lg font-bold">App Name</h2>}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              <PanelRightOpen className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex flex-col h-[calc(100vh-72px)]">
            <Button
              variant="outline"
              className="flex justify-start space-x-2 items-center w-full"
              onClick={() => {
                router.push('/');
              }}
            >
              <CirclePlus className="mr-2" />
              <span>New Chat</span>
            </Button>
            <Separator className="my-4" />

            {/* Display all chat sessions here */}
            {isLoading && (
              <div className="flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            {!isLoading && !error && (
              <ChatSessionsList
                chatSessions={chatSessions}
                setChatSessions={setChatSessions}
              />
            )}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Sidebar;
