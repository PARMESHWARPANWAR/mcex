import { render,screen,fireEvent } from "@testing-library/react"
import StarRating from "../StarRating";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

describe('StarRating', ()=>{
    // Basic Rendering Tests
    describe('rendering', ()=>{
        it('renders with default props', ()=>{
            render(<StarRating />);
            const stars = screen.getAllByRole('radio');
            expect(stars).toHaveLength(5);
        });

        it('renders correct number of stars based on maxRating', ()=>{
            render(<StarRating maxRating={10}/>);
            const stars = screen.getAllByRole('radio');
            expect(stars).toHaveLength(10);
        });

        it('renders with initail rating', ()=>{
            render(<StarRating initialRating={3}/>);
            const stars = screen.getAllByRole('radio');
            const checkedStars = stars.filter(star => star.getAttribute('aria-checked') === 'true');
            expect(checkedStars).toHaveLength(3);
        });

        it('renders in different sizes', ()=>{
            const { rerender } = render(<StarRating size='sm'/>);
            let stars = screen.getAllByRole('radio');
            expect(stars[0].querySelector('svg')).toHaveAttribute('width', '16');

            rerender(<StarRating size='md'/>);
            stars = screen.getAllByRole('radio');
            expect(stars[0].querySelector('svg')).toHaveAttribute('width', '24');

            rerender(<StarRating size='lg'/>);
            stars = screen.getAllByRole('radio');
            expect(stars[0].querySelector('svg')).toHaveAttribute('width', '32');
        });
    });

    // Interaction Tests
  describe('interactions', () => {
    it('updates rating on click', async () => {
      const handleChange = jest.fn();
      render(<StarRating onChange={handleChange} />);
      const stars = screen.getAllByRole('radio');
      
      await userEvent.click(stars[2]); // Click third star
      
      expect(handleChange).toHaveBeenCalledWith(3);
      expect(stars[2]).toHaveAttribute('aria-checked', 'true');
    });

    it('handles keyboard navigation', async () => {
      const handleChange = jest.fn();
      render(<StarRating onChange={handleChange} />);
      const stars = screen.getAllByRole('radio');
      
      await userEvent.tab(); // Focus first star
      expect(stars[0]).toHaveFocus();
      
      await userEvent.keyboard('{Enter}'); // Select first star
      expect(handleChange).toHaveBeenCalledWith(1);
      
      await userEvent.tab(); // Focus second star
      await userEvent.keyboard(' '); // Select second star with space
      expect(handleChange).toHaveBeenCalledWith(2);
    });

    // it('handles hover states', () => {
    //   render(<StarRating />);
    //   const stars = screen.getAllByRole('radio');
      
    //   fireEvent.mouseMove(stars[2], {
    //     clientX: stars[2].getBoundingClientRect().left + 5, // Near start of star
    //     clientY: 0
    //   });
      
    //   // Check that hover state is applied
    //   expect(stars[2].parentElement).toHaveClass('hover:scale-110');
    // });

    // it('supports half star ratings when allowHalfStars is true', () => {
    //   const handleChange = jest.fn();
    //   render(<StarRating allowHalfStars onChange={handleChange} />);
    //   const stars = screen.getAllByRole('radio');
      
    //   // Simulate click on left half of third star
    //   const thirdStar = stars[2];
    //   const rect = thirdStar.getBoundingClientRect();
    //   fireEvent.mouseMove(thirdStar, {
    //     clientX: rect.left + (rect.width * 0.25), // 25% of star width
    //     clientY: rect.top + (rect.height / 2)
    //   });
      
    //   fireEvent.click(thirdStar);
    //   expect(handleChange).toHaveBeenCalledWith(2.5);
    // });
  
 });

  // Accessibility Tests
  describe('accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<StarRating />);
      const container = screen.getByRole('radiogroup');
      expect(container).toHaveAttribute('aria-label', 'Star rating');
      
      const stars = screen.getAllByRole('radio');
      stars.forEach((star, index) => {
        expect(star).toHaveAttribute('aria-label', `${index + 1} star${index === 0 ? '' : 's'}`);
      });
    });

    it('announces rating changes to screen readers', () => {
      render(<StarRating />);
      const stars = screen.getAllByRole('radio');
      const announcement = screen.getByRole('status');
      
      fireEvent.click(stars[2]);
      expect(announcement).toHaveTextContent('You have selected 3 stars');
      
      fireEvent.click(stars[0]);
      expect(announcement).toHaveTextContent('You have selected 1 star');
    });

    it('is keyboard navigable', async () => {
      render(<StarRating />);
      const stars = screen.getAllByRole('radio');
      
      // Check that we can Tab through all stars
      for (let i = 0; i < stars.length; i++) {
        await userEvent.tab();
        expect(stars[i]).toHaveFocus();
      }
    });
  });

  // Disabled State Tests
  describe('disabled state', () => {
    it('prevents interactions when disabled', () => {
      const handleChange = jest.fn();
      render(<StarRating disabled onChange={handleChange} />);
      const stars = screen.getAllByRole('radio');
      
      fireEvent.click(stars[2]);
      expect(handleChange).not.toHaveBeenCalled();
      
      // Check that stars are not focusable
      stars.forEach(star => {
        expect(star).toHaveAttribute('tabIndex', '-1');
      });
    });

    it('removes hover effects when disabled', () => {
      render(<StarRating disabled />);
      const stars = screen.getAllByRole('radio');
      
      // Verify that hover classes are not applied
      stars.forEach(star => {
        expect(star.parentElement).not.toHaveClass('hover:scale-110');
      });
    });
  });

  // Edge Cases
  describe('edge cases', () => {
    it('handles invalid initial ratings', () => {
      render(<StarRating initialRating={10} maxRating={5} />);
      const checkedStars = screen.getAllByRole('radio')
        .filter(star => star.getAttribute('aria-checked') === 'true');
      expect(checkedStars).toHaveLength(5);
    });

    it('handles negative ratings', () => {
      render(<StarRating initialRating={-1} />);
      const checkedStars = screen.getAllByRole('radio')
        .filter(star => star.getAttribute('aria-checked') === 'true');
      expect(checkedStars).toHaveLength(0);
    });

    it('updates properly when props change', () => {
      const { rerender } = render(<StarRating initialRating={4} />);
      
      // Check initial state
      let checkedStars = screen.getAllByRole('radio')
        .filter(star => star.getAttribute('aria-checked') === 'true');
      expect(checkedStars).toHaveLength(4);
      
      // Update props
      rerender(<StarRating initialRating={4} />);
      
      // Check updated state
      checkedStars = screen.getAllByRole('radio')
        .filter(star => star.getAttribute('aria-checked') === 'true');
      expect(checkedStars).toHaveLength(4);
    });
  });
})