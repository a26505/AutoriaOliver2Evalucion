<template>
  <footer class="bg-gray-950 text-white border-t border-white/5">
    <div class="container mx-auto py-16 px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <span class="text-xl font-black tracking-tighter">NEXUS</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            La solución líder en gestión de activos para empresas modernas que buscan eficiencia y transparencia.
          </p>
        </div>

        <!-- Quick Links -->
        <div v-for="section in footerSections" :key="section.title">
          <h3 class="font-bold text-white mb-6 uppercase text-xs tracking-widest">{{ section.title }}</h3>
          <ul class="space-y-4">
            <li v-for="link in section.links" :key="link.label">
              <a href="#" class="text-gray-400 hover:text-white text-sm">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-gray-500 text-xs">
          &copy; 2026 Nexus Software Solutions. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerSections = [
  {
    title: 'Producto',
    links: [{ label: 'Características' }, { label: 'Integraciones' }, { label: 'Precios' }, { label: 'Changelog' }]
  },
  {
    title: 'Compañía',
    links: [{ label: 'Sobre nosotros' }, { label: 'Blog' }, { label: 'Carreras' }, { label: 'Contacto' }]
  },
  {
    title: 'Legal',
    links: [{ label: 'Privacidad' }, { label: 'Términos' }, { label: 'Cookies' }]
  }
];

const socialIcons = ['pi-twitter', 'pi-facebook', 'pi-github', 'pi-linkedin'];
</script>
