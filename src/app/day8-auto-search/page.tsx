'use client'

import { AutocompleteSearch } from "@/components/Day8/AutocompleteSearch";
import { BackButton } from "@/components/ui/BackButton";
import { SearchResult } from "../../../types";

export default function FileExplorerPage() {
    const handleSelect = (result:SearchResult)=>{
        console.log('Selected result:',result);
    }
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 8: Auto Search</h1>
        <AutocompleteSearch 
         placeholder="Search anything...."
         onSelect={handleSelect}
        />
      </div>
    );
}