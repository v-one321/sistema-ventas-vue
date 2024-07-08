import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue';
import Dashboard from '@/views/general/Dashboard.vue';
import Proveedores from '@/views/general/Proveedores.vue';
import LayoutApp from '@/layout/LayoutApp.vue';
import ProveedoresForm from '@/views/general/Proveedores-form.vue';
import ClientesForm from '@/views/general/Clientes-form.vue';
import Clientes from '@/views/general/Clientes.vue';
import Productos from '@/views/general/Productos.vue';
import ProductosForm from '@/views/general/Producto-form.vue';
import Compras from '@/views/movimientos/Compras.vue';
import ComprasFormulario from '@/views/movimientos/Compras-formulario.vue';
import Ventas from '@/views/movimientos/Ventas.vue';
import VentasFormulario from '@/views/movimientos/Ventas-formulario.vue';

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
          path: '/proveedor-formulario/:idProveedor?',
          component: ProveedoresForm
        },
        {
          path: '/cliente',
          component: Clientes
        },
        {
          path: '/cliente-formulario/:idCliente?',
          component: ClientesForm
        },
        {
          path: '/producto',
          component: Productos
        },
        {
          path: '/producto-formulario/:idProducto?',
          component: ProductosForm
        },
        {
          path: '/compras',
          component: Compras
        },
        {
          path: '/compras-formulario',
          component: ComprasFormulario
        },
        {
          path: '/ventas',
          component: Ventas
        },
        {
          path: '/ventas-formulario',
          component: VentasFormulario
        }
      ]
    },
    
    {
      path: '/:catchAll(.*)',
      redirect: '/login'
    }
  ]
})

export default router
