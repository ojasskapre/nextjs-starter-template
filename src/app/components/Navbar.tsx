'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-primary text-foreground">
      <Link href="/">
        <div className="text-2xl font-bold ml-16">Next.js Starter Template</div>
      </Link>
      <div>
        {user ? (
          <>
            <span className="mr-4 text-foreground">{user.email}</span>
            <button
              onClick={logout}
              className="bg-destructive hover:bg-destructive-hover text-destructive-foreground font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
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
