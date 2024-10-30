import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Challenges
    </Link>
  );
};