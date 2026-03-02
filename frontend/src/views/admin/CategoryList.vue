<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Categorías</h2>
      <Button label="Añadir Categoría" icon="pi pi-plus" @click="openNew" />
    </div>

    <DataTable :value="categoryStore.categories" :loading="categoryStore.loading" stripedRows class="p-datatable-sm shadow-sm rounded-lg overflow-hidden">
      <template #empty>No se encontraron categorías.</template>
      <Column field="name" header="Nombre" sortable></Column>
      <Column header="Acciones" class="w-32">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button icon="pi pi-pencil" severity="warning" text rounded @click="editCategory(data)" />
            <Button icon="pi pi-trash" severity="danger" text rounded @click="confirmDelete(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="showDialog" :header="isEditing ? 'Editar Categoría' : 'Nueva Categoría'" :style="{ width: '400px' }" modal class="p-fluid">
      <form @submit="onSubmit" class="space-y-4 pt-4">
        <div class="field">
          <label for="name" class="block mb-1 font-bold">Nombre de la Categoría</label>
          <InputText id="name" v-model="name" :class="{ 'p-invalid': errors.name }" />
          <small class="p-error">{{ errors.name }}</small>
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
import { useCategoryStore } from '../../stores/category.store';
import { useUIStore } from '../../stores/ui.store';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import { useConfirm } from 'primevue/useconfirm';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';

const categoryStore = useCategoryStore();
const uiStore = useUIStore();
const toast = useToast();
const confirm = useConfirm();
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref<string | null>(null);

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres')
});

const { handleSubmit, errors, resetForm, setValues } = useForm<{ name: string }>({ validationSchema: schema });
const { value: name } = useField<string>('name');

const openNew = () => {
  isEditing.value = false;
  editingId.value = null;
  resetForm();
  showDialog.value = true;
};

const editCategory = (category: any) => {
  isEditing.value = true;
  editingId.value = category.id;
  setValues({ name: category.name });
  showDialog.value = true;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    if (isEditing.value && editingId.value) {
      await categoryStore.updateCategory(editingId.value, values.name);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría actualizada', life: 3000 });
    } else {
      await categoryStore.addCategory(values.name);
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría creada', life: 3000 });
    }
    showDialog.value = false;
    resetForm();
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al guardar categoría' });
  }
});

const confirmDelete = (id: string) => {
  confirm.require({
    message: '¿Estás seguro de que quieres eliminar esta categoría?',
    header: 'Confirmación de Eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await categoryStore.removeCategory(id);
      toast.add({ severity: 'info', summary: 'Eliminada', detail: 'Categoría borrada', life: 3000 });
    }
  });
};

onMounted(() => {
  categoryStore.fetchCategories();
  uiStore.setPage('Categorías', [
    { label: 'Admin', to: '/admin/products' },
    { label: 'Gestión de Categorías' }
  ]);
});
</script>

