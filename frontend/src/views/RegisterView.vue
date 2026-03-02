<template>
  <div class="register-page min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <Toast />
    
    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
      <div class="mb-10 text-center">
        <router-link to="/" class="inline-flex items-center gap-2 mb-8">
          <span class="text-2xl font-black tracking-tighter text-gray-900">NEXUS</span>
        </router-link>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Crea tu cuenta</h2>
        <p class="mt-2 text-sm text-gray-500">
          Únete a Nexus para gestionar tu inventario.
        </p>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-bold text-gray-700 mb-2 ml-1">Correo Electrónico</label>
          <InputText 
            id="email"
            v-model="email" 
            type="email" 
            class="w-full !p-4 !rounded-2xl !border-gray-100 !bg-gray-50/50 focus:!bg-white focus:!ring-2 focus:!ring-primary/20 transition-all" 
            placeholder="usuario@ejemplo.com" 
            :class="{ 'p-invalid': emailError }"
          />
          <small class="text-red-500 mt-1 block h-4 ml-1">{{ emailError }}</small>
        </div>

        <div>
          <label for="password" class="block text-sm font-bold text-gray-700 mb-2 ml-1">Contraseña</label>
          <Password 
            id="password"
            v-model="password" 
            :feedback="true" 
            toggleMask 
            class="w-full" 
            inputClass="w-full !p-4 !rounded-2xl !border-gray-100 !bg-gray-50/50 focus:!bg-white focus:!ring-2 focus:!ring-primary/20 transition-all font-mono" 
            placeholder="••••••••" 
            :class="{ 'p-invalid': passwordError }"
          />
          <small class="text-red-500 mt-1 block h-4 ml-1">{{ passwordError }}</small>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-bold text-gray-700 mb-2 ml-1">Confirmar Contraseña</label>
          <Password 
            id="confirmPassword"
            v-model="confirmPassword" 
            :feedback="false" 
            toggleMask 
            class="w-full" 
            inputClass="w-full !p-4 !rounded-2xl !border-gray-100 !bg-gray-50/50 focus:!bg-white focus:!ring-2 focus:!ring-primary/20 transition-all font-mono" 
            placeholder="••••••••" 
            :class="{ 'p-invalid': confirmPasswordError }"
          />
          <small class="text-red-500 mt-1 block h-4 ml-1">{{ confirmPasswordError }}</small>
        </div>

        <div class="pt-4">
          <Button 
            type="submit" 
            label="Registrarse" 
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
  confirmPassword: yup.string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>('confirmPassword');

const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.register(values.email, values.password);
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Cuenta creada correctamente. Ahora puedes iniciar sesión.', life: 3000 });
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err: any) {
    const errorMsg = err.response?.data?.error || 'No se pudo crear la cuenta. El usuario podría ya existir.';
    toast.add({ severity: 'error', summary: 'Error de registro', detail: errorMsg, life: 3000 });
  }
});
</script>

<style scoped>
.p-invalid {
  border-color: #ef4444 !important;
}
</style>
