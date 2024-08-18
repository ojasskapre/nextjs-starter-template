'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { CircleUser, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="flex justify-between items-center p-4 bg-primary text-foreground">
      <Link href="/">
        <div className="text-2xl font-bold ml-16">Next.js Starter Template</div>
      </Link>
      <div>
        {user ? (
          <>
            <div onClick={toggleDropdown} className="cursor-pointer pr-8">
              <CircleUser className="w-10 h-10 text-foreground" />
            </div>
            {dropdownOpen && (
              <div className="absolute right-2 p-4 mt-2 w-auto bg-secondary border border-border shadow-lg rounded">
                <span className="block px-4 py-2 text-foreground">
                  {`Welcome, ${user.email}`}
                </span>
                <hr className="my-2 border-border" />
                <button
                  onClick={logout}
                  className="flex items-center w-full text-left bg-secondary hover:bg-secondary-hover text-foreground py-2 px-4 rounded"
                >
                  <LogOut className="mr-2 w-6 h-6" />
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <Link href="/signup">
              <button className="hover:bg-card-hover text-foreground font-bold py-2 px-4 rounded mr-2">
                Sign Up
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-accent hover:bg-accent-hover text-accent-foreground font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
