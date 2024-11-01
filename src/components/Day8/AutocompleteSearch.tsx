'use client'

import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { debounce } from '@/utils/debounce';
import { SearchResult } from '../../../types';

interface AutocompleteSearchProps {
    placeholder?: string;
    onSelect: (result: SearchResult) => void;
}

export const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
    placeholder = 'Search...',
    onSelect
}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Simulate API call
    const fetchResults = async (searchQuery: string): Promise<SearchResult[]> => {
        // Replace this with your actual API call
        await new Promise(resolve => setTimeout(resolve, 300));
        return [
            { id: '1', title: `Result 1 for ${searchQuery}`, description: 'Description 1' },
            { id: '2', title: `Result 2 for ${searchQuery}`, description: 'Description 2' },
            { id: '3', title: `Result 3 for ${searchQuery}`, description: 'Description 3' },
        ];
    }

    // Custom debounced search function
    const debouncedFetch = debounce(async (searchQuery : string) =>{
        if(searchQuery.trim()){
            setLoading(true);
            try {
                const data = await fetchResults(searchQuery);
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error('Error fetching results:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
            setIsOpen(false);
        }

    },300)


    useEffect(()=>{
        debouncedFetch(query);
        return ()=>{
            debouncedFetch.cancel();
        }
    },[query]);

    const highlightText = (text:string, query:string) => {
        if(!query.trim()) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i)=>
          regex.test(part)?(
            <span key={i} className="bg-yellow-200">{part}</span>
          ):(
            part
          )
        );
    }

    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>)=>{
        if(!results.length) return;

        switch(e.key){
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev=>
                    prev < results.length - 1 ? prev + 1 :prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev=>prev>0?prev-1:prev);  
            case 'Enter':
                e.preventDefault();
                if(selectedIndex >= 0){
                    handleSelect(results[selectedIndex]);
                }      
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    }

    const handleSelect = (result:SearchResult)=>{
        onSelect(result);
        setQuery(result.title);
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
    };

    return <div className='relative w-full max-w-md'>
        <div className='relative'>
            <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={e=>setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={()=>results.length >0 && setIsOpen(true)}
            placeholder={placeholder}
            className='w-full px-4 py-2 pl-10 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400'/>
        </div>
        {isOpen && (
            <div
            ref={resultsRef}
            className='absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto'
            >
                {loading?(
                    <div className='p-4 text-center text-gray-500'>Loading...</div>
                ):results.length>0?(
                    <ul className='py-2'>
                        {results.map((result, idx)=>(
                            <li
                            key={result.id}
                            onClick={()=>handleSelect(result)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                idx===selectedIndex ? 'bg-gray-100':''
                                }`}
                            >
                                <div className='font-medium'>
                                    {highlightText(result.title, query)}
                                </div>
                                <div>
                                    {highlightText(result.description, query)}
                                </div>
                            </li>
                        ))}
                    </ul>
                ):(
                    <div className='p-4 text-center text-gray-500'>
                        No results found
                    </div>
                )}
            </div>
        )}
    </div>
}