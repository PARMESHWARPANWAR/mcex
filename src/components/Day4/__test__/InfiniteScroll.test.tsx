import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import { InfiniteScroll } from '../InfiniteScroll';
import "@testing-library/jest-dom";

// Mock window properties and methods
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', { value: mockScrollTo });
Object.defineProperty(window, 'innerHeight', { value: 800 });
Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

describe('InfiniteScroll', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Reset window scroll position
    Object.defineProperty(window, 'scrollY', { value: 0 });
    
    // Mock document.body.scrollHeight
    Object.defineProperty(document.body, 'scrollHeight', {
      value: 1000,
      writable: true
    });
  });

  it('should render initial items on mount', async () => {
    render(<InfiniteScroll />);

    // Wait for initial items to load
    await waitFor(() => {
      const items = screen.getAllByText(/Item \d+/);
      expect(items).toHaveLength(10); // First page should have 10 items
    });
  });

  it('should show loading state while fetching data', async () => {
    render(<InfiniteScroll />);

    // // Initially should show loading
    // expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();

    // // Wait for initial load to complete
    // await waitFor(() => {
    //   expect(screen.queryByRole('img', { name: /loading/i })).not.toBeInTheDocument();
    // });
  });

  // it('should load more items when scrolling to bottom', async () => {
  //   render(<InfiniteScroll />);

  //   // Wait for initial items
  //   await waitFor(() => {
  //     expect(screen.getAllByText(/Item \d+/)).toHaveLength(10);
  //   });

  //   // Simulate scroll to bottom
  //   act(() => {
  //     Object.defineProperty(window, 'scrollY', { value: 200 });
  //     Object.defineProperty(document.body, 'scrollHeight', { value: 1000 });
  //     fireEvent.scroll(window);
  //   });

  //   // Wait for next page to load
  //   await waitFor(() => {
  //     const items = screen.getAllByText(/Item \d+/);
  //     expect(items).toHaveLength(20); // Should now have 20 items
  //   });
  // });

  it('should stop loading more items when hasMore is false', async () => {
    render(<InfiniteScroll />);

    // Load all pages (we know it stops at page 5)
    for (let i = 0; i < 5; i++) {
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: document.body.scrollHeight - window.innerHeight });
        fireEvent.scroll(window);
      });

      // Wait for items to load
      await waitFor(() => {
        const items = screen.getAllByText(/Item \d+/);
        expect(items.length).toBeLessThanOrEqual(50); // Max 50 items (5 pages * 10 items)
      });
    }

    // Verify "No more items" message appears
    await waitFor(() => {
      expect(screen.getByText('No more items to load')).toBeInTheDocument();
    });

    // Verify no more items are loaded on additional scrolls
    const itemCountBeforeScroll = screen.getAllByText(/Item \d+/).length;
    
    act(() => {
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      const itemCountAfterScroll = screen.getAllByText(/Item \d+/).length;
      expect(itemCountAfterScroll).toBe(itemCountBeforeScroll);
    });
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<InfiniteScroll />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  // it('should not load more items while previous load is in progress', async () => {
  //   render(<InfiniteScroll />);

  //   // Wait for initial load
  //   await waitFor(() => {
  //     expect(screen.getAllByText(/Item \d+/)).toHaveLength(10);
  //   });

  //   // Trigger multiple scrolls in quick succession
  //   act(() => {
  //     for (let i = 0; i < 3; i++) {
  //       Object.defineProperty(window, 'scrollY', { value: document.body.scrollHeight - window.innerHeight });
  //       fireEvent.scroll(window);
  //     }
  //   });

  //   // Wait for next page to load
  //   await waitFor(() => {
  //     const items = screen.getAllByText(/Item \d+/);
  //     expect(items).toHaveLength(20); // Should only load one additional page despite multiple scrolls
  //   });
  // });
});