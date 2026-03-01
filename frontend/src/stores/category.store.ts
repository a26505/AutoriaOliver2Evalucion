import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as any[],
    loading: false
  }),
  actions: {
    async fetchCategories() {
      this.loading = true;
      try {
        const res = await api.get('/categories');
        this.categories = res.data;
      } finally {
        this.loading = false;
      }
    },
    async addCategory(name: string) {
      await api.post('/categories', { name });
      await this.fetchCategories();
    },
    async removeCategory(id: string) {
      await api.delete(`/categories/${id}`);
      await this.fetchCategories();
    }
  }
});
