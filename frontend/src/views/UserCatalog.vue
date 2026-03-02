<template>
  <div class="user-catalog p-6 lg:p-12">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <h1 class="text-4xl font-black text-gray-900 tracking-tighter">Gestión de Productos</h1>
        <p class="text-gray-500 mt-2 text-lg">Visualización completa del inventario Nexus para usuarios registrados.</p>
      </div>
      <div class="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 w-full md:w-80">
        <i class="pi pi-search text-gray-400 ml-2"></i>
        <InputText v-model="searchQuery" placeholder="Filtrar por nombre o categoría..." class="!border-none !bg-transparent focus:!ring-0 flex-1 !p-1" />
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div class="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <i class="pi pi-box text-xl"></i>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Productos</p>
          <p class="text-2xl font-black text-gray-900">{{ productStore.products.length }}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div class="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
          <i class="pi pi-tags text-xl"></i>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Categorías</p>
          <p class="text-2xl font-black text-gray-900">{{ categoriesCount }}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div class="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
          <i class="pi pi-exclamation-triangle text-xl"></i>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Stock Crítico</p>
          <p class="text-2xl font-black text-gray-900">{{ lowStockCount }}</p>
        </div>
      </div>
    </div>

    <div v-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
       <div v-for="i in 8" :key="i" class="h-96 bg-gray-200/50 animate-pulse rounded-3xl"></div>
    </div>
    
    <div v-else class="container mx-auto px-6 pb-12">
       <ProductGrid :products="filteredProducts" />
    </div>

    <div v-if="!productStore.loading && filteredProducts.length === 0" class="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
       <div class="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
         <i class="pi pi-search text-3xl text-gray-300"></i>
       </div>
       <h3 class="text-xl font-bold text-gray-900">Sin resultados</h3>
       <p class="text-gray-500 mt-2">No se encontraron productos que coincidan con tu búsqueda.</p>
       <Button label="Limpiar filtros" text class="mt-4" @click="searchQuery = ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '../stores/product.store';
import { useUIStore } from '../stores/ui.store';
import ProductGrid from '../components/ProductGrid.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const productStore = useProductStore();
const uiStore = useUIStore();
const searchQuery = ref('');

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productStore.products;
  const q = searchQuery.value.toLowerCase();
  return productStore.products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    (p.category?.name || '').toLowerCase().includes(q)
  );
});

const categoriesCount = computed(() => {
  const cats = new Set(productStore.products.map(p => p.categoryId));
  return cats.size;
});

const lowStockCount = computed(() => {
  return productStore.products.filter(p => p.stock < 10).length;
});

onMounted(() => {
  productStore.fetchProducts();
  uiStore.setPage('Catálogo', [
    { label: 'Inicio', to: '/' },
    { label: 'Catálogo' }
  ]);
});
</script>
