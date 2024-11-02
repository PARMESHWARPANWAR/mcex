'use client'
import React from 'react';
import { sampleProducts } from '@/data/products';
import {ProductCard} from './ProductCard';
import { useCartStore } from '../../store/cartSlice';
import ShoppingCart from './ShoppingCart';
import { Product } from '../../../types';

export default function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="mt-8">
        <ShoppingCart />
      </div>
    </div>
  );
}