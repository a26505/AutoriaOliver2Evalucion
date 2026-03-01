<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-900 overflow-hidden relative">
    <Toast />
    <div class="absolute inset-0 z-0 overflow-hidden">
        <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[100px] rounded-full"></div>
        <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[100px] rounded-full"></div>
    </div>

    <div class="p-10 bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl w-full max-w-md z-10">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-black text-white tracking-tight uppercase">Nexus</h2>
        <p class="text-white/60 text-sm mt-2">Accede a tu panel de control</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-white/50 uppercase mb-2 ml-1">Correo Electrónico</label>
          <InputText v-model="email" type="email" class="w-full bg-white/5 border-white/10 text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-500/50" placeholder="admin@nexus.com" required />
        </div>
        <div>
          <label class="block text-xs font-bold text-white/50 uppercase mb-2 ml-1">Contraseña</label>
          <Password v-model="password" :feedback="false" toggleMask class="w-full" inputClass="w-full bg-white/5 border-white/10 text-white p-3 rounded-xl" placeholder="••••••••" required />
        </div>
        
        <Button label="Iniciar Sesión" icon="pi pi-lock" type="submit" class="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 border-none rounded-xl text-white font-bold shadow-lg shadow-blue-600/20" />
      </form>

      <div class="mt-8 text-center">
        <router-link to="/" class="text-xs text-white/40 hover:text-white transition">Volver a la página principal</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push('/admin/products');
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error de inicio de sesión', detail: 'Por favor, comprueba tus credenciales', life: 3000 });
  }
};
</script>

<style>
/* PrimeVue overrides for dark theme feel */
.p-password input {
    background: transparent !important;
}
</style>
