import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { MemeCard } from "../ShimmerUi";

describe('MemeCard', () => {
    const mockMeme = {
        url: 'https://example.com/meme.jpg',
        title: 'Test Meme',
        author: 'Test Author',
        postLink: 'https://reddit.com/post',
        subreddit: 'funny',
        ups: 100,
        preview: ['preview.jpg']
    }
    
    it('renders meme card correctly', () => {
        render(<MemeCard meme={mockMeme}/>)

        expect(screen.getByText('Test Meme')).toBeInTheDocument()
        expect(screen.getByText('Test Author')).toBeInTheDocument()
        
         // Updated test for image src
        const image = screen.getByAltText('Test Meme')
        expect(image).toHaveAttribute(
        'src',
        expect.stringContaining('/_next/image?url='))

        expect(image.getAttribute('src')).toContain(
          encodeURIComponent(mockMeme.url)
        )
    })
    
    it('applies correct classes and attributes to image', () => {
        render(<MemeCard meme={mockMeme} />)
        
        const image = screen.getByAltText('Test Meme')
        expect(image).toHaveClass('object-cover', 'rounded-md')
        expect(image).toHaveAttribute('alt', 'Test Meme')
      })
    
      it('applies correct classes for hover effect', () => {
        render(<MemeCard meme={mockMeme} />)
        
        const card = screen.getByTestId('meme-card')
        expect(card).toHaveClass('hover:shadow-md', 'transition-shadow')
      })
    
      it('renders title with correct styling', () => {
        render(<MemeCard meme={mockMeme} />)
        
        const title = screen.getByText('Test Meme')
        expect(title).toHaveClass('text-lg', 'font-medium', 'mb-2', 'line-clamp-1')
      })
    
      it('renders author with correct styling', () => {
        render(<MemeCard meme={mockMeme} />)
        
        const author = screen.getByText('Test Author')
        expect(author).toHaveClass('text-sm', 'text-gray-600')
      })

})