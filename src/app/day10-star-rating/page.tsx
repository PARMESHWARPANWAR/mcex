import StarRating from "@/components/Day10/StarRating";
import { BackButton } from "@/components/ui/BackButton";

export default function StarRatingPage() {
   
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 10: Star Rating</h1>
        <StarRating/>
      </div>
    );
}