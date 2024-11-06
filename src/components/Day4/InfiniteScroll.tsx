"use client"
import React, { useEffect, useRef, useState } from "react";
import { Loader } from 'lucide-react';
import CodeDisplay from "./CodeDisplay";

export const InfiniteScroll = () => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Simulate API call to fetch data
    const fetchData = async (pageNum: number) => {
        try {
            setLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simulate fetching 10 items per page
            const newItems = Array.from({ length: 10 }, (_, i) => `Item ${(pageNum - 1) * 10 + i + 1}`)

            // Simulate running out of data after page 5
            if (pageNum >= 5) {
                setHasMore(false);
                return [];
            }

            return newItems;
        } finally {
            setLoading(false)
        }
    }

    // const handleScroll = () => {
    //     if(window.scrollY + window.innerHeight >= document.body.scrollHeight && !loading && hasMore){
    //         setPage(prev=>prev+1)
    //     }
    // }

    useEffect(() => {
        const loadInitialData = async () => {
            const newItems = await fetchData(1);
            setItems(newItems);
        };
        loadInitialData();
    }, [])

    // For detecting bottom we have to way can be more
    // First Way [Simple and basic way]
    // useEffect(()=>{
    //     window.addEventListener("scroll" , handleScroll)
    //     return () => window.removeEventListener("scroll", handleScroll)
    // },[])

    // Second Way
    // Set up intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && !loading && hasMore) {
                setPage(prev => prev + 1);
            }
        },
            { threshold: 1.0 }
        )

        if(loaderRef.current){
            observer.observe(loaderRef.current);
        }

        return ()=> observer.disconnect();
    },[loading, hasMore])

    // Load more data when page changes
    useEffect(() => {
        if (page > 1) {
            const loadMoreData = async () => {
                const newItems = await fetchData(page);
                setItems(prev => [...prev, ...newItems])
            };
            loadMoreData();
        }
    }, [page]);

    return (
        <div className="w-full mx-auto p-4">
            <CodeDisplay/>
            <div className="space-y-4">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-white rounded-lg shadow border"
                    >{item}
                    </div>
                ))}
            </div>

            {/* Loader reference element */}
            <div ref={loaderRef} className="flex justify-center p-4">
                {loading && <Loader className="animate-spin" />}
                {!hasMore && !loading && (
                    <p className="text-gray-500">No more items to load</p>
                )}
            </div>
        </div>
    )
}