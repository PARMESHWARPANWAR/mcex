import {act} from 'react';
import { 
  renderHook
} from '@testing-library/react';

import '@testing-library/jest-dom'
import { useCartStore } from '../../../store/cartSlice';

describe('cartStore', () => {
    beforeEach(() => {
      // Clear the store before each test
      act(() => {
        useCartStore.getState().clearCart();
      });
    });
  
    const mockItem = {
      id: '1',
      name: 'Test Product',
      price: 10.00,
    };
  
    test('should initialize with empty cart', () => {
      const { result } = renderHook(() => useCartStore());
      expect(result.current.cart.items).toHaveLength(0);
      expect(result.current.cart.total).toBe(0);
    });
  
    test('should add item to cart', () => {
      const { result } = renderHook(() => useCartStore());
  
      act(() => {
        result.current.addItem(mockItem);
      });
  
      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0]).toEqual({
        ...mockItem,
        quantity: 1,
      });
    });
  
    test('should increment quantity when adding existing item', () => {
      const { result } = renderHook(() => useCartStore());
  
      act(() => {
        result.current.addItem(mockItem);
        result.current.addItem(mockItem);
      });
  
      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].quantity).toBe(2);
    });
  
    test('should remove item from cart', () => {
      const { result } = renderHook(() => useCartStore());
  
      act(() => {
        result.current.addItem(mockItem);
        result.current.removeItem(mockItem.id);
      });
  
      expect(result.current.cart.items).toHaveLength(0);
    });
  
    test('should update item quantity', () => {
      const { result } = renderHook(() => useCartStore());
  
      act(() => {
        result.current.addItem(mockItem);
        result.current.updateQuantity(mockItem.id, 5);
      });
  
      expect(result.current.cart.items[0].quantity).toBe(5);
    });
  
    test('should not allow negative quantities', () => {
      const { result } = renderHook(() => useCartStore());
  
      act(() => {
        result.current.addItem(mockItem);
        result.current.updateQuantity(mockItem.id, -1);
      });
  
      expect(result.current.cart.items[0].quantity).toBe(0);
    });
  
    test('should calculate total correctly', () => {
      const { result } = renderHook(() => useCartStore());
  
      act(() => {
        result.current.addItem(mockItem);
        result.current.updateQuantity(mockItem.id, 3);
      });
  
      expect(result.current.cart.total).toBe(30.00);
    });
  
    test('should clear cart', () => {
      const { result } = renderHook(() => useCartStore());
  
      act(() => {
        result.current.addItem(mockItem);
        result.current.clearCart();
      });
  
      expect(result.current.cart.items).toHaveLength(0);
      expect(result.current.cart.total).toBe(0);
    });
  });