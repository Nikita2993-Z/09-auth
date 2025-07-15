import type { ReactNode } from 'react';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}