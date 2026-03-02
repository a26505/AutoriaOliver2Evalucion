import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    isSidebarOpen: true,
    theme: 'light',
    pageTitle: 'Nexus',
    breadcrumbs: [] as { label: string, to?: string }[]
  }),
  actions: {
    setPage(title: string, breadcrumbs: { label: string, to?: string }[] = []) {
      this.pageTitle = title;
      this.breadcrumbs = breadcrumbs;
    },
    toggleSidebar() {

      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
  }
});
