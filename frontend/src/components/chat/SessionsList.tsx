'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Ellipsis, Trash, Edit, Archive, Share } from 'lucide-react';
import { IChatSession } from '@/types/chat.interface';

interface ChatSessionsListProps {
  chatSessions: IChatSession[];
}

const ChatSessionsList: React.FC<ChatSessionsListProps> = ({
  chatSessions,
}) => {
  // TODO: make groups my date time (e.g. Today, Yesterday, Last Week, ...)
  return (
    <div className="flex flex-col overflow-y-auto h-full mb-4 space-y-2">
      {chatSessions.map((session) => (
        <Card
          key={session.id}
          className="hover:bg-neutral-100 hover:dark:bg-neutral-800"
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
                className="dark:bg-neutral-800 p-2"
              >
                <DropdownMenuItem className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-700 p-4 rounded-xl">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-700 p-4 rounded-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-700 p-4 rounded-xl text-red-500">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChatSessionsList;
