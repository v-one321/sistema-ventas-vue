<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title">Ventas registradas</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Buscar...">
                    </div>
                    <div class="col-12 col-md-4 text-center mt-3">
                        <button type="button" class="btn btn-primary" @click="agregar()">Agregar</button>
                    </div>
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Item</th>
                                        <th>Proveedor</th>
                                        <th>Numero identificacion</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, indice) in datos" :key="item.id">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ item.clientes.nombre }} {{ item.clientes.apellido }}</td>
                                        <td>{{ item.clientes.identificacion }}</td>
                                        <td class="text-end">{{ item.total }}</td>
                                        <td><span class="badge" :class="item.estado ? 'bg-success' : 'bg-danger'">{{
                                            item.estado ? 'Activo' : 'Inactivo' }}</span></td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn btn-warning" @click="detalle(item.id)"><i
                                                        class="fas fa-eye"></i></button>
                                                <button class="btn" :class="item.estado ? 'btn-danger' : 'btn-success'"
                                                    @click="estado(item.id)"><i
                                                        class="fa-solid fa-retweet"></i></button>
                                            </div>
                                        </td>
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
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary-subtle">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalle de venta</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row gy-3">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead class="table-primary">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Codigo</th>
                                            <th>Cantidad</th>
                                            <th>Precio <small class="text-danger">(Unitario)</small></th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in dato.detalle_venta" :key="item.id">
                                            <td>{{ item.producto.nombre }}</td>
                                            <td>{{ item.producto.codigo }}</td>
                                            <td>{{ item.cantidad }}</td>
                                            <td>{{ item.precio_unitario }}</td>
                                            <td>{{ item.total }}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="4" class="text-end fs-4">TOTAL</th>
                                            <th class="text-end fs-4">{{ dato.total }}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';
import { changeStatus, index, show } from '@/services/ventasService';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
const datos = ref([]);
const paginacion = ref({
    total: null,
    pagina: 1
});
const router = useRouter();
let modal = null;
let instanciaModal = null;
const dato = ref({});
onMounted(() => {
    modal = document.getElementById('staticBackdrop');
    instanciaModal = new Modal(modal);
    listar();
})
const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina);
        datos.value = data.datos.data;
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
}
const estado = param => {
    try {
        Swal.fire({
            title: "¿Esta seguro?",
            text: "Esta a punto de modificar el estado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, modificar!",
            cancelButtonText: "No, cancelar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await changeStatus(param);
                listar();
                Swal.fire({
                    title: "Bien!",
                    text: data.mensaje,
                    icon: "success"
                });
            }
        });

    } catch (error) {
        console.log(error);
    }
}
const agregar = () => {
    router.push({ path: '/ventas-formulario' });
}
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
const detalle = async param => {
    try {
        const { data } = await show(param);
        dato.value = data.datos;
        instanciaModal.show()
    } catch (error) {
        console.log(error);
    }
}
</script>
<style></style>