'use client';

import ChatSection from '@/components/chat/Section';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/app/LandingPage';

export default function Home() {
  const { user } = useAuth();

  return user ? <ChatSection /> : <LandingPage />;
}
