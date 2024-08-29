'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { LogOut, Menu } from 'lucide-react';
import ThemeModeToggle from './ThemeModeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex items-center justify-between w-full sm:w-auto">
        {!user && (
          <Link href="/">
            <div className="text-2xl font-bold ml-4 sm:ml-16">
              LLM App Template
            </div>
          </Link>
        )}
        {!user && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="sm:hidden ml-auto p-2"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2 sm:hidden">
                {!user && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/signup">
                        <Button variant="outline" className="w-full">
                          Sign Up
                        </Button>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/login">
                        <Button variant="default" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div
        className={cn(
          'items-center space-x-4',
          user ? 'flex' : 'hidden sm:flex'
        )}
      >
        {user ? (
          <>
            <ThemeModeToggle />
            {/* User profile Avatar with dropdown showing email and Logout button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ml-4">
                  {/* <AvatarImage src="<get-image-url>" /> */}
                  <AvatarFallback>
                    {user.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4">
                <DropdownMenuLabel>{`Welcome, ${user.email}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <ThemeModeToggle />
            <Link href="/signup">
              <Button variant="outline" className="ml-4">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="default" className="ml-2">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
