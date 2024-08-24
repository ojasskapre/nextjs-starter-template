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
import ChatSessionsList from '@/components/chat/SessionsList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useChatSession } from '@/context/ChatSessionContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  const router = useRouter();
  const { chatSessions, setChatSessions, refreshChatSessions } =
    useChatSession();

  if (!user) return null;

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
                setSelectedSessionId(null);
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
                selectedSessionId={selectedSessionId}
                setSelectedSessionId={setSelectedSessionId}
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
