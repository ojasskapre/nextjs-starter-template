'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-grow h-[calc(100vh-128px)]">
        <Sidebar />
        <main className="mx-auto p-4 flex-grow">{children}</main>
      </div>
    </>
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
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
