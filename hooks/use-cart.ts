import { ProductCart } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface CartStore {
  items: ProductCart[];
  addItem: (data: ProductCart) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductCart) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);

        if (existingItems) {
          set({
            items: [
              ...get().items.filter((item) => item.id != existingItems.id),
            ],
          });
          existingItems.quantity += 1;
          set({ items: [...get().items, existingItems] });
          return toast.success("Item added to cart");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id != id)] });
        toast.success("Item removed from the cart");
      },
      removeAll: () => set({ items: [] }),
      increaseQuantity: (id: string) => {
        const currentItems = get().items;
        currentItems.map((item) => {
          if (item.id === id) {
            item.quantity += 1;
          }
        });
        return set({ items: [...currentItems] });
      },
      decreaseQuantity: (id: string) => {
        const currentItems = get().items;
        currentItems.map((item) => {
          if (item.id === id) {
            item.quantity -= 1;
          }
        });
        return set({ items: [...currentItems] });
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
