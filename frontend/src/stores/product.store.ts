import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  }
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
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
    async addProduct(product: Partial<Product>) {
      await api.post('/products', product);
      await this.fetchProducts();
    },
    async updateProduct(id: string, product: Partial<Product>) {
      await api.put(`/products/${id}`, product);
      await this.fetchProducts();
    },
    async removeProduct(id: string) {
      await api.delete(`/products/${id}`);
      await this.fetchProducts();
    }
  }
});
