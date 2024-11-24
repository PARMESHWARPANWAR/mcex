"use client"

import React, { useState, useEffect, useRef } from "react";

const options = [
    "sharp", "blend", "crisp", "dream", "fluid", "grasp", "hoist", "pluck",
    "prism", "quiet", "spark", "swift", "gleam", "thrive", "bridge",
    "cipher", "marble", "puzzle", "rhythm", "system"
];

export const MultiSelect = () =>{
    const [selected, setSelected] = useState<string[]>([]);
    const [searchKey, setSearchKey] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLElement>(null);

    useEffect(()=>{
        const handleClickOutside= (event: MouseEvent) => {
            if(wrapperRef.current && !wrapperRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () =>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);


    const selectedItem = (item: string) =>{
        if(selected.includes(item)){
            const newItems = selected.filter((it)=>it != item);
            setSelected(newItems);
        }else{
            setSelected((prev)=>[...prev, item]);
        }
    };

    const removeItem = (item:string, event:React.MouseEvent) => {
        event.stopPropagation();
        if(selected.includes(item)){
            const newItems = selected.filter((it)=>it !== item);
            setSelected(newItems);
        }
    };

    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchKey.toLowerCase()));
    

    return (
        <div className="mx-auto w-fit rounded-md text-sm mt-24">
            <div
             className="border border-gray-400 bg-white rounded-md flex p-1 w-96 cursor-pointer"
             onClick={()=> setIsOpen(t=>!t)}
            >
                <ul className="flex flex-wrap gap-1 w-full">
                    {selected.map((it, idx)=>(
                        <li key={idx} className="bg-gray-200 rounded-lg px-2 py-2 flex items-center">
                            {it}
                            <span
                             onClick={e=>removeItem(it,e)}
                             className="cursor-pointer ml-1 px-1 hover:bg-gray-300 rounded"
                            >
                                x
                            </span>
                        </li>
                    ))}
                    <li className="flex-1 min-w-[100px]">
                        <input
                           className="w-full focus:outline-none"
                           value={searchKey}
                           onChange={e=>setSearchKey(e.target.value)}
                           placeholder={selected.length === 0? "Select items...":""}
                        />
                    </li>
                </ul>
            </div>

            {isOpen && (
                <ul className="bg-white rounded-md p-2 h-64 overflow-auto mt-4 w-96 shadow-lg"
                >
                    {filteredOptions.map((it, idx)=>(
                        <li
                           key={idx}
                           onClick={()=> selectedItem(it)}
                           className={`cursor-pointer rounded-sm px-2 py-1 ${
                                 selected.includes(it) ? 'bg-green-400' : 'hover:bg-gray-100'
                            }`}
                        >
                            {it}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}