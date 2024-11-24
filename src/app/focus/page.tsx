import { Pagination } from "@/components/Day11/Pagination";
import { FocusPage } from "@/components/Focus/FocusPage";
import { BackButton } from "@/components/ui/BackButton";

export default function PaginationPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Focus Page </h1>
        <FocusPage/>
      </div>
    );
}