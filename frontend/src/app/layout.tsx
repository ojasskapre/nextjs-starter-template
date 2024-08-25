'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { ChatSessionProvider } from '@/context/ChatSessionContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const pathname = usePathname();
  const shouldShowSidebarAndNavbar = !(pathname === '/' && !user);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    );
  }

  return (
    <ChatSessionProvider>
      <div className="flex flex-grow h-screen">
        {shouldShowSidebarAndNavbar && <Sidebar />}
        <main className="flex flex-grow flex-col max-w-full">
          {shouldShowSidebarAndNavbar && <Navbar />}
          <div
            className={cn(
              shouldShowSidebarAndNavbar
                ? 'min-h-[calc(100vh-72px)]'
                : 'min-h-[100vh]'
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </ChatSessionProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen bg-background">
              <LayoutContent>{children}</LayoutContent>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
