<template>
  <div class="product-card group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
    <!-- Image Container -->
    <div class="aspect-square w-full overflow-hidden bg-gray-100">
      <img 
        :src="product.image || 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=400'" 
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-1 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-primary/70">{{ product.category?.name }}</span>
        <div class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-purple-500"></div>
          <span class="text-[10px] font-bold text-purple-600">{{ product.stock }} en stock</span>
        </div>
      </div>
      
      <h3 class="mb-2 text-lg font-bold text-gray-900 line-clamp-1">{{ product.name }}</h3>
      
      <div class="mt-auto flex items-center justify-between">
        <span class="text-xl font-black text-gray-900">${{ product.price }}</span>
        <Button 
          icon="pi pi-plus" 
          rounded 
          text 
          aria-label="Add to cart" 
          class="!h-8 !w-8 hover:!bg-primary/10 hover:!text-primary transition-colors"
          @click="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image?: string;
    category?: {
      name: string;
    }
  }
}>();

const toast = useToast();

const addToCart = () => {
  toast.add({ 
    severity: 'success', 
    summary: 'Producto Añadido', 
    detail: `${props.product.name} se ha añadido al carrito`, 
    life: 2000 
  });
};
</script>
