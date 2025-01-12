import DragableNotes from "@/components/DragableNotes/DragableNotes";
import { BackButton } from "@/components/ui/BackButton";

export default function DragableNotesPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Dragable Notes</h1>
        <DragableNotes/>
      </div>
    );
}