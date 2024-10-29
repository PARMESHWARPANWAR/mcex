'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

// Types and Interfaces
interface Meme {
    url: string
    title: string
    author: string
    postLink: string
    subreddit: string
    ups: number
    preview: string[]
}

interface MemeApiResponse {
    count: number
    memes: Meme[]
}

interface MemeCardProps {
    meme: Meme
}

// Shimmer animation styles using Tailwind
const shimmerStyle = "animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%]"

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
    const { url, title, author } = meme
    
    return (
        <div className="w-72 p-4 m-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium mb-2 line-clamp-1">{title}</h3>
            <div className="relative w-64 h-64 mb-2">
                <Image 
                    alt={title}
                    fill
                    src={url}
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
            </div>
            <p className="text-sm text-gray-600">{author}</p>
        </div>
    )
}

const ShimmerCard: React.FC = () => {
    return (
        <>
            {Array.from({ length: 15 }, (_, idx) => (
                <div key={idx} className="w-72 p-4 m-4 border rounded-lg">
                    {/* Title shimmer */}
                    <div className={`w-48 h-6 mb-2 rounded ${shimmerStyle}`} />
                    
                    {/* Image shimmer */}
                    <div className={`w-64 h-64 mb-2 rounded ${shimmerStyle}`} />
                    
                    {/* Author shimmer */}
                    <div className={`w-32 h-4 rounded ${shimmerStyle}`} />
                </div>
            ))}
        </>
    )
}

export const ShimmerUIExample: React.FC = () => {
    const [memes, setMemes] = useState<Meme[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchMemes = async (): Promise<void> => {
        try {
            const res = await fetch('https://meme-api.com/gimme/20')
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const data: MemeApiResponse = await res.json()
            setMemes(data.memes)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
            setError(errorMessage)
            console.error('Error fetching memes:', err)
        }
    }

    useEffect(() => {
        fetchMemes()
    }, [])

    if (error) {
        return (
            <div className="w-full p-4 text-center text-red-600">
                Error: {error}. Please try again later.
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-center w-full">
            {!memes ? <ShimmerCard /> : memes.map((meme, idx) => (
                <MemeCard key={`${meme.postLink}-${idx}`} meme={meme} />
            ))}
        </div>
    )
}