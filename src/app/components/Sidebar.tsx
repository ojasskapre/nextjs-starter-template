'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div>
      {/* Expand Button - visible when sidebar is closed */}
      {!isOpen && (
        <div className="flex items-start">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-primary text-white m-2 rounded-md"
          >
            <GoSidebarExpand className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Sidebar - visible when isOpen is true */}
      {isOpen && (
        <div className="bg-primary text-white h-full w-64 p-4 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">History</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white focus:outline-none"
            >
              <GoSidebarCollapse className="w-6 h-6" />
            </button>
          </div>
          {/* Add contents for sidebar here */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
