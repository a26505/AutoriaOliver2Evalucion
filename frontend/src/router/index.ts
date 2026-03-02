import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import PublicLayout from '../layouts/PublicLayout.vue';
import ProductList from '../views/admin/ProductList.vue';
import CategoryList from '../views/admin/CategoryList.vue';
import { useAuthStore } from '../stores/auth.store';

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
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: 'products', component: ProductList },
        { path: 'categories', component: CategoryList }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  void from;
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.token) {
    next('/login');
  } else if (to.meta.requiresAdmin && auth.user?.role !== 'ADMIN') {
    next('/');
  } else {
    next();
  }
});

export default router;
