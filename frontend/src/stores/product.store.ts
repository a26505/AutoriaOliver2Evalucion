import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as any[],
    loading: false
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await api.get('/products');
        this.products = res.data;
      } finally {
        this.loading = false;
      }
    },
    async addProduct(product: any) {
      await api.post('/products', product);
      await this.fetchProducts();
    },
    async removeProduct(id: string) {
      await api.delete(`/products/${id}`);
      await this.fetchProducts();
    }
  }
});
