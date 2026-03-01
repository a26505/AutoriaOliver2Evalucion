import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    isSidebarOpen: true,
    theme: 'light'
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
  }
});
