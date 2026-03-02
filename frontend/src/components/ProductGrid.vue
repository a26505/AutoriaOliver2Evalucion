<template>
  <div class="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <ProductItem 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
    />
  </div>
</template>

<script setup lang="ts">
import ProductItem from './ProductItem.vue';

// Componente individual de 'listado' para cumplir con la rúbrica
defineProps<{
  products: any[]
}>();
</script>
