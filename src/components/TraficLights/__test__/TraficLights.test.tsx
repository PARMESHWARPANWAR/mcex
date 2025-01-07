import { render, screen, fireEvent, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TraficLights from '../TraficLights';

// Mock timer functions 
jest.useFakeTimers();

describe('TraficLights Component', () => {
    beforeEach(() => {
        jest.clearAllTimers();
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    it('shold render initial state correctly', () => {
        render(<TraficLights/>);

        // Check initial countdown 
        expect(screen.getByText(/countDown:/i)).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();

        //Check if all lights are present 
        const lights = screen.getAllByRole('generic').filter(
            element => element.style.borderRadius === '50%'
        );

        expect(lights).toHaveLength(3);


        // Check if red light is active initially
        const redLight = lights[0];
        expect(redLight).toHaveStyle({opacity:'1'})
    });

    it('counts down correctly and changes light', () => {
        render(<TraficLights/>);

        // Initial state 
        expect(screen.getByText('2')).toBeInTheDocument();

        // Advance timer by 1 second 
        act(()=>{
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getByText('1')).toBeInTheDocument();

        // Advance timer to trigger light change 
        act(()=>{
            jest.advanceTimersByTime(1000);
        });

        // Should switch to yellow with its timer value 
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('allow manual light selection', async() => {
        render(<TraficLights/>);

        const lights = screen.getAllByRole('generic').filter(
            element => element.style.borderRadius === '50%'
        );

        // Click green light 
        await userEvent.click(lights[2]);

        // Should show green light timer 
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(lights[2]).toHaveStyle({opacity:'1'});
    });

    it('handles time increase correctly', async() => {
        render(<TraficLights/>); 

        const input = screen.getByLabelText(/increase time/i);

        // Type new value and press enter 
        await userEvent.type(input, '5');
        await userEvent.type(input, '{enter}');

        // Initial value (2) + added value (5)
        expect(screen.getByText('7')).toBeInTheDocument();

        // Input should be cleared 
        expect(input).toHaveValue('');
    });

    it('only accepts numeric input for time increase', async() => {
        render(<TraficLights/>);

        const input = screen.getByLabelText(/increase time/i);

        // Try typing non-numeric characters 
        await userEvent.type(input, 'abc123def');

        // Should only contain numbers
        expect(input).toHaveValue('123');
    });

    it('maintains correct light sequence', () => {
        render(<TraficLights />);
        
        const lights = screen.getAllByRole('generic').filter(
            element => element.style.borderRadius === '50%'
        );
        
        // Initial state (red)
        expect(lights[0]).toHaveStyle({ opacity: '1' });
        
        // Complete red light cycle
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        
        // Should be yellow
        expect(lights[1]).toHaveStyle({ opacity: '1' });
        
        // Complete yellow light cycle
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        
        // Should be green
        expect(lights[2]).toHaveStyle({ opacity: '1' });
    });
    it('cleans up interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
        const { unmount } = render(<TraficLights />);
        
        unmount();
        
        expect(clearIntervalSpy).toHaveBeenCalled();
    });
    
    it('resets timer when manually changing lights', async () => {
        render(<TraficLights />);
        
        const lights = screen.getAllByRole('generic').filter(
            element => element.style.borderRadius === '50%'
        );
        
        // Advance timer by 1 second
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getByText('1')).toBeInTheDocument();
        
        // Click yellow light
        await userEvent.click(lights[1]);
        
        // Should reset to yellow's timer value
        expect(screen.getByText('5')).toBeInTheDocument();
    });
})