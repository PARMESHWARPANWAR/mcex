
import { YoutubeLiveChat } from "@/components/Day12/YoutubeChat";
import { BackButton } from "@/components/ui/BackButton";

export default function YoutubeLiveChatPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 12: Youtube Live Chat</h1>
        <YoutubeLiveChat/>
      </div>
    );
}