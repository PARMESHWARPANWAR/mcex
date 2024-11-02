import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }

interface CartState {
    items: CartItem[];
    total: number;
}

interface CartStore {
  cart: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
      },
      addItem: (item) => {
        const { cart } = get();
        const existingItem = cart.items.find((i) => i.id === item.id);

        if (existingItem) {
          const updatedItems = cart.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          set({
            cart: {
              items: updatedItems,
              total: calculateTotal(updatedItems),
            },
          });
        } else {
          const updatedItems = [...cart.items, { ...item, quantity: 1 }];
          set({
            cart: {
              items: updatedItems,
              total: calculateTotal(updatedItems),
            },
          });
        }
      },
      removeItem: (id) => {
        const { cart } = get();
        const updatedItems = cart.items.filter((item) => item.id !== id);
        set({
          cart: {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          },
        });
      },
      updateQuantity: (id, quantity) => {
        const { cart } = get();
        const updatedItems = cart.items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        );
        set({
          cart: {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          },
        });
      },
      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
          },
        });
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
