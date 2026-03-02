<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Productos</h2>
      <Button label="Añadir Producto" icon="pi pi-plus" @click="openNew" />
    </div>

    <DataTable :value="productStore.products" :loading="productStore.loading" stripedRows class="p-datatable-sm shadow-sm rounded-lg overflow-hidden">
      <template #empty>No se encontraron productos.</template>
      <Column header="Imagen" class="w-20">
        <template #body="{ data }">
          <img :src="data.image || 'https://via.placeholder.com/50'" class="w-12 h-12 object-cover rounded-md shadow-sm" />
        </template>
      </Column>
      <Column field="name" header="Nombre" sortable></Column>
      <Column field="category.name" header="Categoría" sortable></Column>
      <Column field="price" header="Precio" sortable>
        <template #body="{ data }">
          ${{ data.price }}
        </template>
      </Column>
      <Column field="stock" header="Stock" sortable>
        <template #body="{ data }">
          <Tag style="background: #9333ea; color: white" :value="data.stock" />
        </template>
      </Column>
      <Column header="Acciones" class="w-32">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button icon="pi pi-pencil" severity="warning" text rounded @click="editProduct(data)" />
            <Button icon="pi pi-trash" severity="danger" text rounded @click="confirmDelete(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="showDialog" :header="isEditing ? 'Editar Producto' : 'Nuevo Producto'" :style="{ width: '450px' }" modal class="p-fluid">
      <form @submit="onSubmit" class="space-y-4 pt-4">
        <div class="field">
          <label for="name" class="block mb-1 font-bold">Nombre</label>
          <InputText id="name" v-model="name" :class="{ 'p-invalid': errors.name }" />
          <small class="p-error">{{ errors.name }}</small>
        </div>
        <div class="field">
          <label for="image" class="block mb-1 font-bold">URL de Imagen</label>
          <InputText id="image" v-model="image" :class="{ 'p-invalid': errors.image }" placeholder="https://..." />
          <small class="p-error">{{ errors.image }}</small>
        </div>
        <div class="field">
          <label for="price" class="block mb-1 font-bold">Precio</label>
          <InputNumber id="price" v-model="price" mode="currency" currency="USD" :class="{ 'p-invalid': errors.price }" />
          <small class="p-error">{{ errors.price }}</small>
        </div>
        <div class="field">
          <label for="stock" class="block mb-1 font-bold">Stock</label>
          <InputNumber id="stock" v-model="stock" :class="{ 'p-invalid': errors.stock }" />
          <small class="p-error">{{ errors.stock }}</small>
        </div>
        <div class="field">
          <label for="category" class="block mb-1 font-bold">Categoría</label>
          <Dropdown id="category" v-model="categoryId" :options="categoryStore.categories" optionLabel="name" optionValue="id" placeholder="Seleccionar una Categoría" :class="{ 'p-invalid': errors.categoryId }" />
          <small class="p-error">{{ errors.categoryId }}</small>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <Button label="Cancelar" severity="secondary" text @click="showDialog = false" />
          <Button label="Guardar" type="submit" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useProductStore } from '../../stores/product.store';
import { useCategoryStore } from '../../stores/category.store';
import { useUIStore } from '../../stores/ui.store';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import { useConfirm } from 'primevue/useconfirm';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const uiStore = useUIStore();
const toast = useToast();
const confirm = useConfirm();
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref<string | null>(null);

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  image: yup.string().url('Debe ser una URL válida').optional().nullable(),
  price: yup.number().required('El precio es obligatorio').moreThan(0, 'El precio debe ser mayor a 0'),
  stock: yup.number().required('El stock es obligatorio').integer().min(0, 'No puede ser negativo'),
  categoryId: yup.string().required('Selecciona una categoría')
});

interface ProductForm {
  name: string;
  image?: string;
  price: number;
  stock: number;
  categoryId: string;
}

const { handleSubmit, errors, resetForm, setValues } = useForm<ProductForm>({ validationSchema: schema });
const { value: name } = useField<string>('name');
const { value: image } = useField<string | undefined>('image');
const { value: price } = useField<number>('price');
const { value: stock } = useField<number>('stock');
const { value: categoryId } = useField<string>('categoryId');

const openNew = () => {
  isEditing.value = false;
  editingId.value = null;
  resetForm();
  showDialog.value = true;
};

const editProduct = (product: any) => {
  isEditing.value = true;
  editingId.value = product.id;
  setValues({
    name: product.name,
    image: product.image,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId
  });
  showDialog.value = true;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    if (isEditing.value && editingId.value) {
      await productStore.updateProduct(editingId.value, values);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado', life: 3000 });
    } else {
      await productStore.addProduct(values);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Producto creado', life: 3000 });
    }
    showDialog.value = false;
    resetForm();
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al guardar producto' });
  }
});

const confirmDelete = (id: string) => {
  confirm.require({
    message: '¿Estás seguro de que quieres eliminar este producto?',
    header: 'Confirmación de Eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await productStore.removeProduct(id);
      toast.add({ severity: 'info', summary: 'Eliminado', detail: 'Producto borrado', life: 3000 });
    }
  });
};

onMounted(() => {
  productStore.fetchProducts();
  categoryStore.fetchCategories();
  uiStore.setPage('Productos', [
    { label: 'Admin', to: '/admin/products' },
    { label: 'Gestión de Productos' }
  ]);
});
</script>

