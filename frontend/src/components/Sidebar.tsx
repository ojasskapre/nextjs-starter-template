'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { PanelRightOpen, PanelRightClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

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
            isOpen ? 'w-64 p-4' : 'w-0'
          )}
        >
          <div className="flex justify-between items-center mb-4">
            {isOpen && <h2 className="text-lg font-bold">History</h2>}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              <PanelRightOpen className="w-6 h-6" />
            </Button>
          </div>
          {/* Add contents for sidebar here */}
          <div className="flex-grow">{/* Your sidebar content */}</div>
        </Card>
      )}
    </div>
  );
};

export default Sidebar;