import { render, screen, waitFor } from "@testing-library/react";
import { ImageProps } from 'next/image';
import { ShimmerUIExample } from "../ShimmerUi";
import '@testing-library/jest-dom'

// Mock data
const mockMemes = [
    {
        url: 'https://example.com/meme1.jpg',
        title: 'Test Meme 1',
        author: 'Author 1',
        postLink: 'https://reddit.com/post1',
        subreddit: 'funny',
        ups: 100,
        preview: ['preview1.jpg']
    },
    {
        url: 'https://example.com/meme2.jpg',
        title: 'Test Meme 2',
        author: 'Author 2',
        postLink: 'https://reddit.com/post2',
        subreddit: 'memes',
        ups: 200,
        preview: ['preview2.jpg']
    }
]

type MockImageProps = Omit<ImageProps, 'src'> & {
    src: string;
    onLoad?: () => void;
    onError?: () => void;
};


// Mock fetch
global.fetch = jest.fn()

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,

    
    default: ({
        alt,
        src,
        fill,
        priority,
        quality,
        onLoad,
        onError,
        ...props
    }: MockImageProps) => {
        // Convert boolean props to data attributes to avoid React warnings
        const booleanProps = {
            ...(fill ? { 'data-fill': 'true' } : {}),
            ...(priority ? { 'data-priority': 'true' } : {}),
            ...(quality ? { 'data-quality': quality.toString() } : {})
        };

        return (
            <img
                alt={alt}
                src={src}
                {...props}
                {...booleanProps}
                onLoad={onLoad}
                onError={onError}
            />
        );
    }
}));

describe('ShimmerUIExample', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    // it('renders shimmer cards initially', ()=>{
    //     render(< ShimmerUIExample />)

    //     // Check if shimmer cards are rendered
    //     const shimmerElements = screen.getAllByTestId('shimmer-card')
    //     expect(shimmerElements).toHaveLength(15)

    //     // Verify shimmer animation classes
    //     shimmerElements.forEach(element=>{
    //         expect(element).toHaveClass('animate-[shimmer_1.5s_infinite]')
    //     })
    // })

    it('renders meme cards after successful data fetch', async () => {
        // Mock successful API response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok:true,
            json: async () => ({ memes: mockMemes })
        })

        render(< ShimmerUIExample/>)

        // Wait for meme cards to be rendered
        await waitFor(()=> {
            expect(screen.getByText('Test Meme 1')).toBeInTheDocument()
        })

        // Verify all meme cards are rendered
        expect(screen.getByText('Test Meme 1')).toBeInTheDocument()
        expect(screen.getByText('Test Meme 2')).toBeInTheDocument()
        expect(screen.getByText('Author 1')).toBeInTheDocument()
        expect(screen.getByText('Author 2')).toBeInTheDocument()
    })

    it('handles API error correctly' , async () => {
        // Mock failed API response
        const errorMessage = 'Failed to fetch'

        ;(global.fetch as jest.Mock).mockResolvedValueOnce(new Error(errorMessage))

        render(<ShimmerUIExample/>)

        // Wait for error message to be rendered
        await waitFor(()=>{
            expect(screen.getByText(/Error:/)).toBeInTheDocument()
        })

        expect(screen.getByText(/Please try again later/)).toBeInTheDocument()
    })

    it('handle network error correctly', async ()=>{
        // Mock network error
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
            ok:false,
            status:404
        })

        render(<ShimmerUIExample />)

        // Wait for error message
        await waitFor(()=>{
            expect(screen.getByText(/HTTP error! status: 404/)).toBeInTheDocument()
        })
    })

    it('applies correct styling to meme cards', async () =>{
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async ()=> ({ memes: mockMemes })
        })

        render(<ShimmerUIExample/>)

        // Wait for meme cards to be rendered
        await waitFor(()=>{
            expect(screen.getByText('Test Meme 1')).toBeInTheDocument()
        })


        // Check for proper styling classes
        const memeCards = screen.getAllByTestId('meme-card')
        memeCards.forEach(card => {
            expect(card).toHaveClass('w-72','p-4', 'm-4', 'border', 'rounded-lg')
        })
    })

})