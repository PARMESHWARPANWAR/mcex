import React,{act}  from 'react';
import { ImageProps } from 'next/image';

import { render, screen, fireEvent } from '@testing-library/react';
import { ImageSlider } from '../ImageSlider';

import "@testing-library/jest-dom";


type MockImageProps = Omit<ImageProps, 'src'> & {
    src: string;
    onLoad?: () => void;
    onError?: () => void;
};

// Mock next/image
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

// Mock Lucide icons
jest.mock('lucide-react', () => ({
    ChevronLeft: () => <div data-testid="chevron-left">{'<'}</div>,
    ChevronRight: () => <div data-testid="chevron-right">{'>'}</div>,
}));

describe('ImageSlider', () => {
    const mockImageList = [
        "https://t4.ftcdn.net/jpg/09/09/16/93/360_F_909169323_g3WDMyzG8JvRQ1stqcOuATa3e6Ki7CmI.jpg",
        "https://t4.ftcdn.net/jpg/08/32/30/07/360_F_832300776_E6NKEowvwYvGaYx07xN5Xqhym7UzN479.jpg",
        "https://png.pngtree.com/thumb_back/fh260/background/20220204/pngtree-space-sky-background-image_985633.jpg",
    ];

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    
    it('renders without crashing',  () => {
        act( () => {render(<ImageSlider imageList={mockImageList} />)});
        
        const image = screen.getByAltText('Slide 1');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockImageList[0]);
    });

    it('displays error message when imageList is empty', async () => {
        await act( async ()=> render(<ImageSlider imageList={[]} />));
        expect(screen.getByText('No images to display')).toBeInTheDocument();
    });

    it('navigates to next image when right arrow is clicked', async () => {
        await act( ()=>render(<ImageSlider imageList={mockImageList} />));
        const nextButton = screen.getByText('>');

        fireEvent.click(nextButton);
        const image = screen.getByAltText('Slide 2');
        expect(image).toHaveAttribute('src', mockImageList[1]);
    });

    it('navigates to previous image when left arrow is clicked', async () => {
        await act( ()=> render(<ImageSlider imageList={mockImageList} />));
        const prevButton = screen.getByText('<');

        // First click next to move to second image
        fireEvent.click(screen.getByText('>'));
        // Then click prev to go back
        fireEvent.click(prevButton);
        const image = screen.getByAltText('Slide 1');
        expect(image).toHaveAttribute('src', mockImageList[0]);
    });

    it('wraps around to last image when clicking previous on first image', async () => {
        await act( ()=>render(<ImageSlider imageList={mockImageList} />));
        const prevButton = screen.getByText('<');

        fireEvent.click(prevButton);
        const image = screen.getByAltText(`Slide ${mockImageList.length}`);
        expect(image).toHaveAttribute('src', mockImageList[mockImageList.length - 1]);
    });

    it('wraps around to first image when clicking next on last image', async () => {
        await act( ()=>render(<ImageSlider imageList={mockImageList} />));
        const nextButton = screen.getByText('>');

        // Click next twice to get to last image
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        // Click next again to wrap around
        fireEvent.click(nextButton);
        const image = screen.getByAltText('Slide 1');
        expect(image).toHaveAttribute('src', mockImageList[0]);
    });

    // describe('Auto-play functionality', () => {
    //     it('advances to next image automatically when autoPlay is true', async () => {
    //         await act( ()=>render(<ImageSlider imageList={mockImageList} autoPlay autoPlayInterval={3000} />));

    //         act(() => {
    //             jest.advanceTimersByTime(3000);
    //         });

    //         const image = screen.getByAltText('Slide 2');
    //         expect(image).toHaveAttribute('src', mockImageList[1]);
    //     });

    //     it('stops auto-play on hover', async () => {
    //         await act( ()=>render(<ImageSlider imageList={mockImageList} autoPlay autoPlayInterval={3000} />));
    //         const container = screen.getByTestId('slider-container');

    //         fireEvent.mouseEnter(container);

    //         act(() => {
    //             jest.advanceTimersByTime(3000);
    //         });

    //         const image = screen.getByAltText('Slide 1');
    //         expect(image).toHaveAttribute('src', mockImageList[0]);
    //     });

    //     it('resumes auto-play after hover ends', async() => {
    //         await act( ()=> render(<ImageSlider imageList={mockImageList} autoPlay autoPlayInterval={3000} />));
    //         const container = screen.getByTestId('slider-container');

    //         fireEvent.mouseEnter(container);
    //         fireEvent.mouseLeave(container);

    //         act(() => {
    //             jest.advanceTimersByTime(3000);
    //         });

    //         const image = screen.getByAltText('Slide 2');
    //         expect(image).toHaveAttribute('src', mockImageList[1]);
    //     });
    // });

    // describe('Accessibility', () => {
    //     it('has accessible navigation buttons', async () => {
    //         await act( ()=>render(<ImageSlider imageList={mockImageList} />));
    //         expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    //         expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
    //     });

    //     it('provides correct image descriptions', async() => {
    //         await act( ()=>render(<ImageSlider imageList={mockImageList} />));
    //         expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
    //     });
    // });

});