<template>
    <div class="col-12 col-md-6">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title"><i class="fas fa-cubes me-2"></i>Lista de productos</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Codigo</th>
                                        <th>Precio <small class="text-danger">({{ propiedades.tipoPrecio == 'compra' ? 'Compra' : 'Venta'}})</small></th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in datos" :key="item.id">
                                        <td>{{ item.nombre }}</td>
                                        <td>{{ item.codigo }}</td>
                                        <td>{{ propiedades.tipoPrecio == 'compra' ? item.precio_compra : item.precio_venta}}</td>
                                        <td>{{ item.cantidad }}</td>
                                        <td class="text-center"><button class="btn btn-primary btn-sm" @click="propiedades.tipoPrecio=='compra'? addCarritoCompras(item) : addCarritoVentas(item)"><i class="fas fa-plus"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                    <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()">
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                    v-for="(item, indice) in paginacion.total" :key="indice"><button type="button"
                                        class="page-link" @click="paginaCambio(item)">{{ item }}</button>
                                </li>
                                <li class="page-item" :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                    <button type="button" class="page-link" aria-label="Next" @click="paginaNext()">
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { productosActivos } from '@/services/productosService';
import { ref, onMounted, defineProps } from 'vue';
import { useCarritoStore } from '@/stores/carrito';
const datos = ref([]);
const paginacion = ref({
    total: null,
    pagina: 1,
});
const { addCarritoCompras, addCarritoVentas } = useCarritoStore();
const propiedades = defineProps({
    tipoPrecio: {
        type: String,
        required: true,
    }
});
const listar = async () => {
    try {
        const { data } = await productosActivos(paginacion.value.pagina);
        paginacion.value.total = data.datos.last_page;
        datos.value = data.datos.data;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listar();
});

const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
const paginaCambio = param => {
    paginacion.value.pagina = param;
    listar();
}
</script>
<style></style>