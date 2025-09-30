import { create } from 'zustand';
import api from '../lib/api';
import type { Product } from '../types/product';

type State = {
  products: Product[];
  loading: boolean;
  error?: string | null;
  fetchProducts: () => Promise<void>;
  setProducts: (p: Product[]) => void;
};

export const useProductStore = create<State>((set) => ({
  products: [],
  loading: true,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<Product[]>('/products');
      set({ products: res.data, loading: false });
    } catch (err: any) {
      set({ error: err?.message ?? 'Unknown error', loading: false });
    }
  },
  setProducts: (p: Product[]) => set({ products: p }),
}));
