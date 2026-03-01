<template>
  <div class="home-page min-h-screen bg-gray-50">
    <header class="p-6 bg-white shadow-sm flex justify-between items-center px-12">
      <div class="text-2xl font-bold text-primary italic">NEXUS</div>
      <router-link to="/login">
        <Button label="Acceso Admin" icon="pi pi-user" />
      </router-link>
    </header>
    
    <main class="max-w-6xl mx-auto py-12 px-6">
      <section class="text-center mb-16">
        <h1 class="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Gestión Moderna de Inventario
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Optimiza tus operaciones con nuestro sistema de inventario rápido, seguro y bonito.
        </p>
      </section>

      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Productos Destacados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductItem 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </main>

    <footer class="py-12 bg-gray-900 text-white text-center mt-auto">
      <p>&copy; 2026 Nexus Software Solutions. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import Button from 'primevue/button';
import ProductItem from '../components/ProductItem.vue';
import { useProductStore } from '../stores/product.store';

const productStore = useProductStore();
const products = computed(() => productStore.products.slice(0, 4));

onMounted(() => {
  productStore.fetchProducts();
});
</script>
