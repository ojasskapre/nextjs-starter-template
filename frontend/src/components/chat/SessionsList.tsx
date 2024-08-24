'use client';

import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useAuth } from '@/context/AuthContext';
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
import { Ellipsis, Trash, Edit, Share } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { IChatSession } from '@/types/chat.interface';
import { updateChatSessionTitle, deleteChatSession } from '@/utils/api';
import { cn } from '@/lib/utils';

interface ChatSessionsListProps {
  selectedSessionId: string | null;
  setSelectedSessionId: Dispatch<SetStateAction<string | null>>;
  chatSessions: IChatSession[];
  setChatSessions: Dispatch<SetStateAction<IChatSession[]>>;
}

const ChatSessionsList: React.FC<ChatSessionsListProps> = ({
  selectedSessionId,
  setSelectedSessionId,
  chatSessions,
  setChatSessions,
}) => {
  // TODO: make groups my date time (e.g. Today, Yesterday, Last Week, ...)
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState<string | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const renameInputRef = useRef<HTMLInputElement | null>(null);

  // when editingSessionId is set, that means rename btn is clicked, it auto focus on the rename input field
  useEffect(() => {
    if (editingSessionId && renameInputRef.current) {
      setTimeout(() => {
        renameInputRef.current?.focus();
      }, 0);
    }
  }, [editingSessionId]);

  const handleSessionClick = (sessionId: string) => {
    // avoid on click if the session is currently being edited
    if (editingSessionId !== sessionId) {
      setSelectedSessionId(sessionId);
      router.push(`/chat/${sessionId}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedDeleteId) return;

    setLoading(selectedDeleteId);

    try {
      const token = await getToken();
      await deleteChatSession(selectedDeleteId, token!);
      // Update the UI by removing the deleted session
      setChatSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== selectedDeleteId)
      );
      // navigate to home page after deletion
      router.push('/');
    } catch (err) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
        ),
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to delete Chat History.',
      });
    } finally {
      setLoading(null);
      setSelectedDeleteId(null);
      setIsDialogOpen(false);
      setSelectedSessionId(null);
    }
  };

  const handleRename = async () => {
    if (!editingSessionId || !newTitle.trim()) return;

    setLoading(editingSessionId);

    try {
      const token = await getToken();
      const originalSession = chatSessions.find(
        (session) => session.id === editingSessionId
      );

      // not call update if the title is not changed
      if (originalSession && originalSession.title !== newTitle) {
        await updateChatSessionTitle(editingSessionId, token!, newTitle);
        setChatSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === editingSessionId
              ? { ...session, title: newTitle }
              : session
          )
        );
      }
      setEditingSessionId(null);
    } catch (err) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
        ),
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to update session title.',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleRenameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const openDeleteDialog = (sessionId: string) => {
    setSelectedDeleteId(sessionId);
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
          className={cn(
            'hover:bg-neutral-200 hover:dark:bg-neutral-700 cursor-pointer',
            session.id === selectedSessionId &&
              'bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700'
          )}
          onClick={() => handleSessionClick(session.id)}
        >
          <CardContent className={cn('p-2 flex items-center justify-between')}>
            {editingSessionId === session.id ? (
              <input
                ref={renameInputRef}
                className="flex-1 text-ellipsis whitespace-nowrap text-clip p-1 border-none focus:outline-neutral-200 focus:dark:outline-neutral-600"
                value={newTitle}
                disabled={loading === session.id}
                onChange={handleRenameInputChange}
                onBlur={handleRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename();
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
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
            )}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 hover:font-bold"
                        tabIndex={-1}
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
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-100 p-4 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingSessionId(session.id);
                    setNewTitle(session.title);
                  }}
                >
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
              disabled={loading === selectedDeleteId}
            >
              {loading === selectedDeleteId ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChatSessionsList;
