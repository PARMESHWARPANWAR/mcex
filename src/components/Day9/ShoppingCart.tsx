'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {CartItemComponent} from './CartItem';
import { useCartStore } from '@/store/cartSlice';
import ProductsPage from './products';

const ShoppingCart: React.FC = () => {
  const { cart, removeItem, updateQuantity, clearCart } = useCartStore();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.items.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-col space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => clearCart()}
              >
                Clear Cart
              </Button>
              <Button className="w-full">Checkout</Button>
            </div>
          </>
        )}
      </CardContent>
      <ProductsPage/>
    </Card>
  );
};

export default ShoppingCart;