import { Pagination } from "@/components/Day11/Pagination";
import { BackButton } from "@/components/ui/BackButton";

export default function PaginationPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 11: Pagination</h1>
        <Pagination/>
      </div>
    );
}