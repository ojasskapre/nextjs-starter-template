'use client';

import ChatSection from './components/chat/Section';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return user ? <ChatSection /> : <div>Hello, World! No user logged in!</div>;
}
