import { create } from "zustand";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import { persist } from "zustand/middleware";
import {
  confirmClearCart,
  showCartCleared,
  showProductAdded,
  showProductDecreased,
  showProductRemoved,
  showStockLimitReached,
} from "../utils/cartAlerts";

interface CartStoreType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decrementCartItem: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  vaciarCarrito: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: Product) => {
        const currentCart = get().cart;

        const existingItem = currentCart.find(
          (item) => item.producto.id === product.id,
        );

        const currentQuantity = existingItem?.cantidad ?? 0;

        if (currentQuantity >= product.stock) {
          showStockLimitReached();
          return;
        }

        showProductAdded(product.nombre);

        if (existingItem) {
          const newCart = currentCart.map((item) =>
            item.producto.id === product.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item,
          );
          set({ cart: newCart });
          return;
        }
        const newCart = [...currentCart, { producto: product, cantidad: 1 }];

        set({ cart: newCart });
      },

      decrementCartItem: (productId: string) => {
        const currentCart = get().cart;

        const existingItem = currentCart.find(
          (item) => item.producto.id === productId,
        );

        if (!existingItem) return;

        showProductDecreased(existingItem.producto.nombre);

        if (existingItem.cantidad <= 1) {
          const newCart = currentCart.filter(
            (item) => item.producto.id !== productId,
          );
          set({ cart: newCart });
          return;
        }

        const newCart = currentCart.map((item) =>
          item.producto.id === productId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item,
        );
        set({ cart: newCart });
      },

      removeFromCart: (productId: string) => {
        const currentCart = get().cart;

        const itemToRemove = currentCart.find(
          (item) => item.producto.id === productId,
        );

        if (!itemToRemove) return;

        showProductRemoved(itemToRemove.producto.nombre);

        const newCart = currentCart.filter(
          (item) => item.producto.id !== productId,
        );

        set({ cart: newCart });
      },

      clearCart: async () => {
        const currentCart = get().cart;
        if (currentCart.length === 0) return;

        const confirmed = await confirmClearCart();

        if (!confirmed) return;

        set({ cart: [] });
        showCartCleared();
      },
      vaciarCarrito: () => {
        set({ cart: [] });
      },
      totalItems: () =>
        get().cart.reduce((acc, item) => acc + item.cantidad, 0),
      totalPrice: () =>
        get().cart.reduce(
          (acc, item) => acc + item.producto.precio * item.cantidad,
          0,
        ),
    }),
    {
      name: "cart",
    },
  ),
);
