import type { Metadata } from 'next';
import ChallengeGrid from '@/components/Challenge/ChallengeGrid';
import { challenges } from '@/data/challenges'
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Home | Maching Coding',
  description:
    'Frontend Machine Coding Challenge And Common Frontend Interview Questions',
};

export default function Home() {
  return (
    <ChallengeGrid
      challenges={challenges}
      title="🎯 Frontend Machine Coding Challenge"
      subtitle="Common Frontend Interview Questions"
    />
  );
}