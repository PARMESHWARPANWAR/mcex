'use client'

import { useEffect, useState } from "react"

interface CacheType {
    [key: string]: string[];
  }

export const GoogleAutoSearch = () =>{
    const [cache, setCache] = useState<CacheType>({});
    const [results, setResults] = useState<string[]>([]);
    const [searchText,setSearchText] = useState<string>('');
    const [visibility, setVisibility] = useState<boolean>(false);

    const fetchData = async () =>{
        if (cache && cache[searchText]) {
            setResults(cache[searchText]);
        } else {
            try {
              const response = await fetch(`https://www.google.com/complete/search?client=firefox&q=${searchText}`);
              const data = await response.json();
              setResults(data[1]);
              setCache(prevCache => ({
                ...prevCache,
                [searchText]: data[1]
              }));
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
    }

    useEffect(()=>{
        const s = setTimeout(fetchData,500)

        return () => clearTimeout(s)
       
    },[searchText])

    return (
        <div className="w-full border border-gray-400 mt-8 p-8 rounded-lg bg-slate-200 h-full">
            <div className="mb-9">Google Search Example</div>
            <input type='text' onFocus={()=>setVisibility(true)} onBlur={()=>setVisibility(false)} className={"border border-black px-4 py-2 w-full rounded-lg"} value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
            {results.length>1 && visibility && <ul className="border border-black px-4 rounded-lg">
                {results.map((r)=><li key={r}>{r}</li>)}
            </ul>}
        </div>
    )
}