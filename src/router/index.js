import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue';
import Dashboard from '@/views/general/Dashboard.vue';
import Proveedores from '@/views/general/Proveedores.vue';
import LayoutApp from '@/layout/LayoutApp.vue';
import ProveedoresForm from '@/views/general/Proveedores-form.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: LayoutApp,
      children: [
        {
          path: '/dashboard',
          component: Dashboard
        },
        {
          path: '/proveedor',
          component: Proveedores
        },
        {
          path: '/proveedor-formulario',
          component: ProveedoresForm
        },
      ]
    },
    
    {
      path: '/:catchAll(.*)',
      redirect: '/login'
    }
  ]
})

export default router
