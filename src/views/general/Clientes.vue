<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title">Clientes registrados</h5>
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
                                        <th>Nombre(s)</th>
                                        <th>Apellido(s)</th>
                                        <th>Numero identificacion</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, indice) in datos" :key="item.id">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ item.nombre }}</td>
                                        <td>{{ item.apellido }}</td>
                                        <td>{{ item.identificacion }}</td>
                                        <td><span class="badge" :class="item.estado ? 'bg-success' : 'bg-danger'">{{
                                                item.estado?'Activo':'Inactivo'}}</span></td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn btn-warning" @click="editar(item.id)"><i
                                                        class="fas fa-pencil"></i></button>
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
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { changeStatus, index } from '@/services/clientesService';
import { RouterLink, useRouter } from 'vue-router'
import Swal from 'sweetalert2';
const datos = ref([]);
const paginacion = ref({
    total: null,
    pagina: 3
});
const router = useRouter();
onMounted(() => {
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
    router.push({ path: '/cliente-formulario' });
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
const editar = param => {
    router.push({ path: `/cliente-formulario/${param}` });
}
</script>
<style></style>