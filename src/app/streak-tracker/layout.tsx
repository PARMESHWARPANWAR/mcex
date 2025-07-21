import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Streak Tracker - Build Daily Habits',
  description: 'Track your daily habits and build lasting streaks with our beautiful, intuitive streak tracking application.',
  keywords: 'habits, streak, tracking, daily, goals, productivity',
  authors: [{ name: 'Streak Tracker Team' }],
  openGraph: {
    title: 'Streak Tracker - Build Daily Habits',
    description: 'Track your daily habits and build lasting streaks',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <AuthProvider>
          {children}
        </AuthProvider>
  );
}