import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import PublicLayout from '../layouts/PublicLayout.vue';
import ProductList from '../views/admin/ProductList.vue';
import CategoryList from '../views/admin/CategoryList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', component: HomeView }
      ]
    },
    { path: '/login', component: LoginView },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'products', component: ProductList },
        { path: 'categories', component: CategoryList }
      ]
    }
  ]
});

export default router;
