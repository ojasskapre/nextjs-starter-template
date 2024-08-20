'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Ellipsis, Trash, Edit, Archive, Share } from 'lucide-react';
import { IChatSession } from '@/types/chat.interface';
import { updateChatSessionTitle, deleteChatSession } from '@/utils/api';

interface ChatSessionsListProps {
  chatSessions: IChatSession[];
  setChatSessions: Dispatch<SetStateAction<IChatSession[]>>;
}

const ChatSessionsList: React.FC<ChatSessionsListProps> = ({
  chatSessions,
  setChatSessions,
}) => {
  // TODO: make groups my date time (e.g. Today, Yesterday, Last Week, ...)
  const router = useRouter();

  const { getToken } = useAuth();

  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSessionClick = (sessionId: string) => {
    router.push(`/chat/${sessionId}`);
  };

  const handleDelete = async () => {
    if (!selectedSessionId) return;

    setLoading(selectedSessionId);
    setError(null);

    try {
      const token = await getToken();
      await deleteChatSession(selectedSessionId, token!);
      // Update the UI by removing the deleted session
      setChatSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== selectedSessionId)
      );
      // navigate to home page after deletion
      router.push('/');
    } catch (err) {
      setError('Failed to delete session.');
    } finally {
      setLoading(null);
      setSelectedSessionId(null);
      setIsDialogOpen(false);
    }
  };

  const openDeleteDialog = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col overflow-y-auto h-full mb-4 space-y-2">
      {chatSessions.map((session) => (
        <Card
          key={session.id}
          className="hover:bg-neutral-100 hover:dark:bg-neutral-800 cursor-pointer"
          onClick={() => handleSessionClick(session.id)}
        >
          <CardContent className="p-2 flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-clip pr-2">
                    {session.title}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{session.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 hover:font-bold"
                        onClick={(e) => e.stopPropagation()} // Prevent event from triggering parent click
                      >
                        <Ellipsis className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Options</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent
                align="end"
                className="dark:bg-neutral-900 p-2"
              >
                <DropdownMenuItem className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-100 p-4 rounded-xl">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-100 p-4 rounded-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-100 p-4 rounded-xl text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteDialog(session.id);
                  }}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      ))}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button className="hidden">Open Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat session? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={closeDeleteDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading === selectedSessionId}
            >
              {loading === selectedSessionId ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ChatSessionsList;
