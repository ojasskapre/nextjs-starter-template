'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
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

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="flex justify-between items-center p-4 bg-primary text-foreground">
      <Link href="/">
        <div className="text-2xl font-bold ml-16">Next.js Starter Template</div>
      </Link>
      <div className="flex items-center">
        <ThemeModeToggle />
        {user ? (
          <>
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
