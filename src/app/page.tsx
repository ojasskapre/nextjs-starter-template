'use client';

import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return user ? (
    <div>{`Hello ${user.email}`}</div>
  ) : (
    <div>Hello, World! No user logged in!</div>
  );
}
