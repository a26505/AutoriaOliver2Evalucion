<template>
  <div class="login-page min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <Toast />
    
    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
      <div class="mb-10 text-center">
        <router-link to="/" class="inline-flex items-center gap-2 mb-8">
          <span class="text-2xl font-black tracking-tighter text-gray-900">NEXUS</span>
        </router-link>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Bienvenido de nuevo</h2>
        <p class="mt-2 text-sm text-gray-500">
          Accede a tu panel centralizado de inventario.
        </p>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-bold text-gray-700 mb-2 ml-1">Correo Electrónico</label>
          <InputText 
            id="email"
            v-model="email" 
            type="email" 
            class="w-full !p-4 !rounded-2xl !border-gray-100 !bg-gray-50/50 focus:!bg-white focus:!ring-2 focus:!ring-primary/20 transition-all placeholder:text-gray-300" 
            placeholder="admin@nexus.com" 
            :class="{ 'p-invalid': emailError }"
          />
          <small class="text-red-500 mt-1 block h-4 ml-1">{{ emailError }}</small>
        </div>

        <div>
          <label for="password" class="block text-sm font-bold text-gray-700 mb-2 ml-1">Contraseña</label>
          <Password 
            id="password"
            v-model="password" 
            :feedback="false" 
            toggleMask 
            class="w-full" 
            inputClass="w-full !p-4 !rounded-2xl !border-gray-100 !bg-gray-50/50 focus:!bg-white focus:!ring-2 focus:!ring-primary/20 transition-all font-mono" 
            placeholder="••••••••" 
            :class="{ 'p-invalid': passwordError }"
          />
          <small class="text-red-500 mt-1 block h-4 ml-1">{{ passwordError }}</small>
        </div>

        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center">
            <label class="flex items-center gap-2 cursor-pointer">
              <Checkbox id="remember-me" name="remember-me" :binary="true" class="!h-5 !w-5" />
              <span class="text-sm font-medium text-gray-500">Recuérdame</span>
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-bold text-gray-900 hover:text-primary transition-colors">¿Olvidaste la contraseña?</a>
          </div>
        </div>

        <div class="pt-4">
          <Button 
            type="submit" 
            label="Iniciar Sesión" 
            :loading="isSubmitting"
            class="w-full !py-4 !rounded-2xl !bg-[#10b981] hover:!bg-[#059669] !border-none !text-white !font-bold !text-lg shadow-lg shadow-emerald-200 transition-all transform active:scale-[0.98]"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
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
    
    if (auth.user?.role === 'ADMIN') {
      router.push('/admin/products');
    } else {
      router.push('/');
    }
    
    toast.add({ severity: 'success', summary: 'Bienvenido', detail: 'Inicio de sesión correcto', life: 3000 });
  } catch (err: any) {
    const errorMsg = err.response?.data?.error || (err.request ? 'Error de conexión con el servidor' : 'Por favor, comprueba tus credenciales');
    toast.add({ severity: 'error', summary: 'Error de inicio de sesión', detail: errorMsg, life: 3000 });
  }
});
</script>

<style scoped>
.p-invalid {
  border-color: #ef4444 !important;
}
</style>
