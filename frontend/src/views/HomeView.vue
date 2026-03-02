<template>
  <div class="home-page overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-white py-24 sm:py-32">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="max-w-2xl">
            <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-6">
              Domina tu <span class="text-purple-600">Stock</span> con Inteligencia
            </h1>
            <p class="text-lg leading-8 text-gray-600 mb-10">
              Nexus es la plataforma definitiva para gestionar inventarios a gran escala. Velocidad, precisión y diseño premium integrados en una sola herramienta.
            </p>
            <div class="flex items-center gap-x-6">
              <router-link to="/login">
                <Button label="Comenzar ahora" size="large" raised class="shadow-xl shadow-primary/30" />
              </router-link>
              <a href="#features" class="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2 group">
                Saber más <i class="pi pi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div class="relative hidden lg:block">
            <div class="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 ring-1 ring-gray-200">
              <img src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1200" alt="App screenshot" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-gray-50">
      <div class="container mx-auto px-6 lg:px-8 text-center mb-16">
        <h2 class="text-base font-semibold leading-7 text-primary uppercase tracking-widest">Características</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl italic">Potencia tu negocio sin límites</p>
      </div>
      <div class="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <i :class="[feature.icon, 'text-2xl']"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Product Showcase -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-6 lg:px-8 flex items-end justify-between mb-12">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Catálogo en Vivo</h2>
          <p class="mt-4 text-lg text-gray-600">Explora una muestra de los productos gestionados en tiempo real.</p>
        </div>
        <router-link :to="authStore.user ? '/catalog' : '/login'">
          <Button label="Ver catálogo completo" text icon="pi pi-external-link" iconPos="right" />
        </router-link>
      </div>
      
      <div class="container mx-auto px-6 lg:px-8">
        <ProductGrid :products="products" />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-primary overflow-hidden relative">
      <div class="absolute inset-0 opacity-20 pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48 blur-3xl"></div>
      </div>
      <div class="container mx-auto px-6 lg:px-8 relative text-center">
        <h2 class="text-4xl font-black tracking-tight text-white sm:text-5xl mb-6 drop-shadow-sm">¿Listo para revolucionar tu inventario?</h2>
        <p class="text-xl text-white font-medium max-w-2xl mx-auto mb-10 opacity-90">Únete a miles de administradores que ya confían en Nexus para el control total de sus activos.</p>
        <router-link to="/login">
          <Button label="Empezar Gratis" severity="secondary" size="large" class="!px-12 !py-4 rounded-2xl font-bold shadow-2xl" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import Button from 'primevue/button';
import ProductGrid from '../components/ProductGrid.vue';
import { useProductStore } from '../stores/product.store';
import { useUIStore } from '../stores/ui.store';
import { useAuthStore } from '../stores/auth.store';

const productStore = useProductStore();
const uiStore = useUIStore();
const authStore = useAuthStore();
const products = computed(() => productStore.products.slice(0, 4));

const features = [
  {
    title: 'Control Total',
    description: 'Gestión granular de stock, categorías y movimientos con auditoría en tiempo real.',
    icon: 'pi pi-chart-bar'
  },
  {
    title: 'Nube Segura',
    description: 'Tus datos protegidos y disponibles 24/7 desde cualquier dispositivo.',
    icon: 'pi pi-cloud'
  },
  {
    title: 'IA Predictiva',
    description: 'Anticípate a la demanda con nuestro motor de análisis sugerido.',
    icon: 'pi pi-bolt'
  }
];

onMounted(() => {
  productStore.fetchProducts();
  uiStore.setPage('Inicio', []);
});
</script>

<style scoped>
</style>
