<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
    <Toast />

    <div class="px-8 py-10 bg-white shadow-xl rounded-2xl w-full max-w-md border border-gray-100">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 tracking-tight">Bienevenido</h2>
        <p class="text-gray-500 text-sm mt-2">Inicia sesión en tu cuenta</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <InputText 
            v-model="email" 
            type="email" 
            :class="['w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors', emailError ? 'border-red-500' : 'border-gray-300']" 
            placeholder="correo@ejemplo.com" 
          />
          <span v-if="emailError" class="text-red-500 text-xs mt-1 block">{{ emailError }}</span>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <Password 
            v-model="password" 
            :feedback="false" 
            toggleMask 
            class="w-full" 
            :inputClass="['w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors', passwordError ? 'border-red-500' : 'border-gray-300']" 
            placeholder="••••••••" 
          />
          <span v-if="passwordError" class="text-red-500 text-xs mt-1 block">{{ passwordError }}</span>
        </div>
        
        <Button 
          label="Iniciar Sesión" 
          icon="pi pi-lock" 
          type="submit" 
          :loading="isSubmitting"
          class="w-full p-3.5 mt-2 bg-blue-600 hover:bg-blue-700 border-none rounded-lg text-white font-semibold transition-colors shadow-md" 
        />
      </form>

      <div class="mt-6 text-center">
        <router-link to="/" class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          Volver a la página principal
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const schema = yup.object({
  email: yup.string().required('El correo es obligatorio').email('Debe ser un correo válido'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Debe tener al menos 6 caracteres'),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');

const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.login(values.email, values.password);
    
    // Redirigir según el rol del usuario
    if (auth.user?.role === 'ADMIN') {
      router.push('/admin/products');
    } else {
      router.push('/');
    }
    
    toast.add({ severity: 'success', summary: 'Bienvenido', detail: 'Inicio de sesión correcto', life: 3000 });
  } catch (err: any) {
    const errorMsg = err.response?.data?.error || 'Por favor, comprueba tus credenciales';
    toast.add({ severity: 'error', summary: 'Error de inicio de sesión', detail: errorMsg, life: 3000 });
  }
});
</script>

<style>
/* Reset PrimeVue default borders for simpler design if needed */
.p-password input {
  box-shadow: none !important;
}
</style>
