import { InfiniteScroll } from "@/components/Day4/InfiniteScroll";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


export default function InfiniteScrollPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/"
      >
        <h1 className="text-3xl font-bold mb-8">{'<-'}Day 4: Infinite Scroll</h1>
      </Link>

      <InfiniteScroll />
    </div>
  );
}