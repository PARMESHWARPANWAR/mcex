// // __tests__/stores/cartStore.test.ts
// import { renderHook, act } from '@testing-library/react';
// import { useCartStore } from '../../stores/cartStore';

// // __tests__/components/CartItem.test.tsx
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { CartItem } from '../../components/CartItem';

// describe('CartItem', () => {
//   const mockItem = {
//     id: '1',
//     name: 'Test Product',
//     price: 10.00,
//     quantity: 1,
//   };

//   const mockHandlers = {
//     onUpdateQuantity: jest.fn(),
//     onRemove: jest.fn(),
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders item details correctly', () => {
//     render(<CartItem item={mockItem} {...mockHandlers} />);

//     expect(screen.getByText(mockItem.name)).toBeInTheDocument();
//     expect(screen.getByText(`$${mockItem.price.toFixed(2)}`)).toBeInTheDocument();
//     expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();
//   });

//   test('calls onUpdateQuantity when increment button is clicked', () => {
//     render(<CartItem item={mockItem} {...mockHandlers} />);

//     fireEvent.click(screen.getByText('+'));
//     expect(mockHandlers.onUpdateQuantity).toHaveBeenCalledWith(mockItem.id, 2);
//   });

//   test('calls onUpdateQuantity when decrement button is clicked', () => {
//     render(<CartItem item={mockItem} {...mockHandlers} />);

//     fireEvent.click(screen.getByText('-'));
//     expect(mockHandlers.onUpdateQuantity).toHaveBeenCalledWith(mockItem.id, 0);
//   });

//   test('calls onRemove when remove button is clicked', () => {
//     render(<CartItem item={mockItem} {...mockHandlers} />);

//     fireEvent.click(screen.getByText('Remove'));
//     expect(mockHandlers.onRemove).toHaveBeenCalledWith(mockItem.id);
//   });

//   test('disables decrement button when quantity is 1', () => {
//     render(<CartItem item={mockItem} {...mockHandlers} />);

//     const decrementButton = screen.getByText('-');
//     expect(decrementButton).toBeDisabled();
//   });
// });

// // __tests__/components/Cart.test.tsx
// import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
// import { Cart } from '../../components/Cart';
// import { useCartStore } from '../../stores/cartStore';

// // Mock the cart store
// jest.mock('../../stores/cartStore');

// describe('Cart', () => {
//   const mockItems = [
//     { id: '1', name: 'Product 1', price: 10.00, quantity: 1 },
//     { id: '2', name: 'Product 2', price: 20.00, quantity: 2 },
//   ];

//   const mockStore = {
//     items: mockItems,
//     addItem: jest.fn(),
//     removeItem: jest.fn(),
//     updateQuantity: jest.fn(),
//     clearCart: jest.fn(),
//     getTotal: jest.fn().mockReturnValue(50.00),
//   };

//   beforeEach(() => {
//     (useCartStore as jest.Mock).mockReturnValue(mockStore);
//   });

//   test('renders empty cart message when no items', () => {
//     (useCartStore as jest.Mock).mockReturnValue({ ...mockStore, items: [] });
//     render(<Cart />);
//     expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
//   });

//   test('renders cart items when items exist', () => {
//     render(<Cart />);
    
//     mockItems.forEach(item => {
//       expect(screen.getByText(item.name)).toBeInTheDocument();
//       expect(screen.getByText(`$${item.price.toFixed(2)}`)).toBeInTheDocument();
//     });
//   });

//   test('displays correct total', () => {
//     render(<Cart />);
//     expect(screen.getByText('$50.00')).toBeInTheDocument();
//   });

//   test('calls clearCart when clear button is clicked', () => {
//     render(<Cart />);
    
//     fireEvent.click(screen.getByText('Clear Cart'));
//     expect(mockStore.clearCart).toHaveBeenCalled();
//   });
// });

// // jest.setup.js
// import '@testing-library/jest-dom';

// // jest.config.js
// module.exports = {
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   moduleNameMapper: {
//     '^@/components/(.*)$': '<rootDir>/components/$1',
//     '^@/stores/(.*)$': '<rootDir>/stores/$1',
//   },
//   testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
// };