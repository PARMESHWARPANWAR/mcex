"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
    id: number;
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[]
}

interface AccordionItemProps {
    item: AccordionItem,
    isOpen: boolean,
    setIsOpen: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, setIsOpen }) => {
    return <div className="border rounded-lg mb-2">
        <button onClick={setIsOpen} className="w-full flex items-center justify-between p-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="font-medium">{item.title}</span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {isOpen && <div className="p-4 border-t">
            <p>{item.content}</p>
        </div>}
    </div>
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(0)

    const handleToggle = (idx: number) => {
        setCurrentIndex(currentIndex === idx ? null : idx);
    };

    return (
        <div className="space-y-2">
            {items.map((item, idx) => (<AccordionItem item={item} isOpen={currentIndex === idx} setIsOpen={() => handleToggle(idx)} key={item.id} />))}
        </div>
    )
}