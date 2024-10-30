import { KanbanBoard } from "@/components/Day6/KanbanBoard";
import { BackButton } from "@/components/ui/BackButton";

export default function KanbanBoardPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 6: Kanban Board</h1>
        <KanbanBoard/>
      </div>
    );
}