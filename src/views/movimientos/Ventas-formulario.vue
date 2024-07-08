<template>
    <div class="container mt-5">
        <div class="row gy-4">
            <ProductosActivosVue tipoPrecio="venta" />
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5 class="card-title"><i class="fas fa-shopping-cart me-2"></i>Carrito</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12">
                                <label for="cliente" class="form-label fw-bold text-muted">Cliente</label>
                                <select name="cliente" id="cliente" class="form-select" v-model="cliente">
                                    <option value="">Seleccione</option>
                                    <option :value="item.id" v-for="item in clientes" :key="item.id">{{ item.nombre
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
                                            <tr v-for="(item, indice) in useStore.carritoVentas" :key="indice">
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.codigo }}</td>
                                                <td>{{ item.precio_unitario }}</td>
                                                <td>{{ item.cantidad }}</td>
                                                <td>{{ item.precio_total }}</td>
                                                <td><button type="button" class="btn btn-danger btn-sm"
                                                        @click="useStore.eliminarCarritoVenta(indice)"><i
                                                            class="fas fa-trash"></i></button></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <th colspan="4" class="text-end fs-4 fw-bold">TOTAL</th>
                                            <th class="text-end fs-4">{{ useStore.totalVentas }}Bs</th>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center">
                <button class="btn btn-danger btn-lg me-2" @click="cancelar()"><i class="fas fa-reply me-2"></i>Volver</button>
                <button class="btn btn-success btn-lg ms-2" @click="guardar()">Guardar<i class="fas fa-save ms-2"></i></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import ProductosActivosVue from '@/components/Productos-activos.vue';
import { store } from '@/services/ventasService';
import { clientesActivos } from '@/services/clientesService';
import { useCarritoStore } from '@/stores/carrito';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const useStore = useCarritoStore();
const clientes = ref([]);
const cliente = ref('');
const router = useRouter();
const listar = async () => {
    try {
        const { data } = await clientesActivos();
        clientes.value = data.datos;
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
            total: useStore.totalVentas,
            cliente_id: cliente.value,
            detalle: useStore.carritoVentas
        }
        const { data } = await store(objeto);
        useStore.carritoVentas = [];
        Swal.fire({
            text: data.mensaje,
            title: 'Bien!',
            icon: 'success'
        });
        cancelar();
    } catch (error) {
        if (error.response.status == 422) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error'
            })
        } else {
            console.log(error);
        }
    }
}
const cancelar = () => {
    router.push({path: '/ventas'});
}
</script>
<style></style>