<template>
    <div class="container mt-5">
        <div class="row gy-4">
            <ProductosActivosVue />
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5 class="card-title"><i class="fas fa-shopping-cart me-2"></i>Carrito</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12">
                                <label for="proveedor" class="form-label fw-bold text-muted">Proveedor</label>
                                <select name="proveedor" id="proveedor" class="form-select" v-model="proveedor">
                                    <option value="">Seleccione</option>
                                    <option :value="item.id" v-for="item in proveedores" :key="item.id">{{ item.nombre
                                        }} {{ item.apellido }}</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead class="table-primary">
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Codigo</th>
                                                <th>Precio <small class="text-danger">(Unitario)</small></th>
                                                <th>Cantidad</th>
                                                <th>Precio Total</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, indice) in useStore.carritoCompras" :key="indice">
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.codigo }}</td>
                                                <td>{{ item.precio_unitario }}</td>
                                                <td>{{ item.cantidad }}</td>
                                                <td>{{ item.precio_total }}</td>
                                                <td><button type="button" class="btn btn-danger btn-sm"
                                                        @click="useStore.eliminarCarritoCompra(indice)"><i
                                                            class="fas fa-trash"></i></button></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <th colspan="4" class="text-end fs-4 fw-bold">TOTAL</th>
                                            <th class="text-end fs-4">{{ useStore.totalCompras }}Bs</th>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center">
                <button class="btn btn-danger btn-lg me-2"><i class="fas fa-reply me-2"></i>Volver</button>
                <button class="btn btn-success btn-lg ms-2" @click="guardar()">Guardar<i class="fas fa-save ms-2"></i></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import ProductosActivosVue from '@/components/Productos-activos.vue';
import { store } from '@/services/comprasService';
import { proveedoresActivos } from '@/services/proveedoresService';
import { useCarritoStore } from '@/stores/carrito';
import { ref, onMounted } from 'vue'
const useStore = useCarritoStore();
const proveedores = ref([]);
const proveedor = ref('');
const listar = async () => {
    try {
        const { data } = await proveedoresActivos();
        proveedores.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listar();
})
const guardar = async () => {
    try {
        let objeto = {
            total: useStore.totalCompras,
            proveedor_id: proveedor.value,
            detalle: useStore.carritoCompras
        }
        const { data } = await store(objeto);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
</script>
<style></style>