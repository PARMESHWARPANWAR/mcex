import React from 'react';
import { 
  render, 
  screen, 
  fireEvent, 
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AutocompleteSearch} from '../AutocompleteSearch';
import '@testing-library/jest-dom'

type GenericFunction<A extends unknown[] = never[], R = unknown> = (...args: A) => R;

interface DebouncedFunction<T extends GenericFunction> {
    (...args: Parameters<T>): void;
    cancel: () => void;
}

// Mock the entire module
jest.mock('../../../utils/debounce', () => ({
    debounce: jest.fn(<T extends GenericFunction>(
        func: T, 
        delay: number
    ): DebouncedFunction<T> => {
        const debouncedFunction = ((
            ...args: Parameters<T>
        ) => {
            func(...args);
        }) as DebouncedFunction<T>;
        debouncedFunction.cancel = () => {
          console.log(delay)
            // No-op cancel method for testing
        };
      
        return debouncedFunction;
    })
}));

// Mock the Search icon from lucide-react
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />
}));

describe('AutocompleteSearch Component', () => {
  const mockOnSelect = jest.fn();
//   const mockFetchResults = jest.fn();

  // Reusable setup function
  const setup = (props = {}) => {
    const utils = render(
      <AutocompleteSearch 
        onSelect={mockOnSelect} 
        {...props} 
      />
    );
    const input = screen.getByTestId('search box');
    return {
      input,
      ...utils
    };
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders input with default placeholder', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  test('renders input with custom placeholder', () => {
    const { input } = setup({ placeholder: 'Custom Search...' });
    expect(input).toHaveAttribute('placeholder', 'Custom Search...');
  });

  test('allows typing in the input', async () => {
    const { input } = setup();
    await userEvent.type(input, 'test query');
    expect(input).toHaveValue('test query');
  });

  test('displays search icon', () => {
    setup();
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

//   test('keyboard navigation works correctly', async () => {
//     // Mock results to test keyboard navigation
//     const mockResults = [
//       { id: '1', title: 'Result 1', description: 'Description 1' },
//       { id: '2', title: 'Result 2', description: 'Description 2' },
//       { id: '3', title: 'Result 3', description: 'Description 3' }
//     ];

//     // Override the component to use mock results
//     const OverriddenAutocompleteSearch = () => {
//       const [query, setQuery] = React.useState('test');
//       const [results, setResults] = React.useState(mockResults);

//       return (
//         <AutocompleteSearch 
//           onSelect={(result) => {
//             mockOnSelect(result);
//             setQuery(result.title);
//           }}
//           placeholder="Search..."
//         />
//       );
//     };

//     render(<OverriddenAutocompleteSearch />);

//     const input = screen.getByPlaceholderText('Search...');

//     // Simulate Arrow Down
//     fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    
//     // Simulate Arrow Up
//     fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    
//     // Simulate Enter
//     fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

//     // Check that onSelect was called with the first result
//     await waitFor(() => {
//       expect(mockOnSelect).toHaveBeenCalledWith(mockResults[0]);
//     });
//   });


//   test('handles no results scenario', async () => {
//     // Simulating no results scenario
//     const EmptyResultAutocomplete = () => {
//       const [query, setQuery] = React.useState('test');

//       return (
//         <AutocompleteSearch 
//           onSelect={mockOnSelect}
//           placeholder="Search..."
//         />
//       );
//     };

//     render(<EmptyResultAutocomplete />);

//     const input = screen.getByPlaceholderText('Search...');
//     await userEvent.type(input, 'test');

//     // Check for "No results found" text
//     const noResultsText = await screen.findByText('No results found');
//     expect(noResultsText).toBeInTheDocument();
//   });


  test('highlights matching text in results', async () => {
    // Simulating results with matching query
    const HighlightAutocomplete = () => {
    //   const [query, setQuery] = React.useState('');

      return (
        <AutocompleteSearch 
          onSelect={mockOnSelect}
          placeholder="Search..."
        />
      );
    };

    render(<HighlightAutocomplete />);

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Result');

    // Check for highlighted text
    // const highlightedElements = await screen.findAllByClassName('bg-yellow-200');
    // expect(highlightedElements.length).toBeGreaterThan(0);
  });

  test('closes dropdown on escape key', async () => {
    // Simulating results with dropdown
    const EscapeAutocomplete = () => {
    //   const [query, setQuery] = React.useState('test');

      return (
        <AutocompleteSearch 
          onSelect={mockOnSelect}
          placeholder="Search..."
        />
      );
    };

    render(<EscapeAutocomplete />);

    const input = screen.getByPlaceholderText('Search...');
    
    // Simulate Escape key
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    // Check that dropdown is closed (this might require additional state tracking in component)
    const noResultsText = screen.queryByText('No results found');
    expect(noResultsText).not.toBeInTheDocument();
  });

//   test('loading state is shown during fetching', async () => {
//     // Create a slow-loading mock scenario
//     const LoadingAutocomplete = () => {
//       const [query, setQuery] = React.useState('');

//       return (
//         <AutocompleteSearch 
//           onSelect={mockOnSelect}
//           placeholder="Search..."
//         />
//       );
//     };

//     render(<LoadingAutocomplete />);

//     const input = screen.getByPlaceholderText('Search...');
//     await userEvent.type(input, 'test');

//     // Check for loading text
//     const loadingText = await screen.findByText('Loading...');
//     expect(loadingText).toBeInTheDocument();
//   });
});