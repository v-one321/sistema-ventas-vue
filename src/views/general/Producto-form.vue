<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title"><i class="fas fa-edit me-2"></i>{{ idProducto != "" ? 'Editar registro' : 'Agregar Registro'}}</h5>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-12 col-md-6">
                        <label for="nombre" class="form-label text-muted fw-bold">Nombre</label>
                        <input type="text" id="nombre" class="form-control" :class="{'border-danger' : errors.nombre }" placeholder="Escriba..." v-model="formulario.nombre">
                        <small class="text-danger" v-if="errors.nombre"><i class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="codigo" class="form-label text-muted fw-bold">Codigo</label>
                        <input type="text" id="codigo" class="form-control" :class="{'border-danger' : errors.codigo }" placeholder="Escriba..." v-model="formulario.codigo">
                        <small class="text-danger" v-if="errors.codigo"><i class="fas fa-times me-1"></i>{{ errors.codigo[0] }}</small>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="precio_compra" class="form-label text-muted fw-bold">Precio <small class="text-danger">(Compra)</small></label>
                        <input type="text" id="precio_compra" class="form-control" :class="{'border-danger' : errors.precio_compra }" placeholder="Escriba..." v-model="formulario.precio_compra">
                        <small class="text-danger" v-if="errors.precio_compra"><i class="fas fa-times me-1"></i>{{ errors.precio_compra[0] }}</small>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="precio_venta" class="form-label text-muted fw-bold">Precio <small class="text-danger">(Venta)</small></label>
                        <input type="text" id="precio_venta" class="form-control" :class="{'border-danger' : errors.precio_venta }" placeholder="Ej. 7777777" v-model="formulario.precio_venta">
                        <small class="text-danger" v-if="errors.precio_venta"><i class="fas fa-times me-1"></i>{{ errors.precio_venta[0] }}</small>
                    </div>
                    <div class="col-12">
                        <label for="descripcion" class="form-label text-muted fw-bold">Descripcion</label>
                        <textarea id="descripcion" class="form-control" :class="{'border-danger' : errors.descripcion }" placeholder="Ej. 7777777" v-model="formulario.descripcion"></textarea>
                        <small class="text-danger" v-if="errors.descripcion"><i class="fas fa-times me-1"></i>{{ errors.descripcion[0] }}</small>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <button type="button" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Cancelar</button>
                <button type="button" class="btn ms-2" :class="idProducto != '' ? 'btn-warning' : 'btn-success'" @click="guardar()">{{ idProducto != "" ? 'Editar': 'Guardar'}}<i class="fas ms-2" :class="idProducto != '' ? 'fa-pencil' : 'fa-save'"></i></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { show, store, update } from '@/services/productosService';
import Swal from 'sweetalert2';
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
const formulario = ref({});
const router = useRouter();
const errors = ref({});
const idProducto = router.currentRoute.value.params.idProducto;
onMounted(() => {
    if (idProducto != "") {
        verRegistro();
    }
});
const volver = () => {
    router.push({path: '/producto'});
}
const guardar = async () => {
    errors.value = {};
    try {
        let mensaje = null;
        if (idProducto != "") {
            const { data } = await update(idProducto, formulario.value);
            mensaje = data.mensaje;
        } else {
            const { data } = await store(formulario.value);   
            mensaje = data.mensaje;         
        }
        Swal.fire({
            title: "Bien!",
            text: mensaje,
            icon: "success"
        });
        volver();
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error"
            });
        } else {
            console.log(error);
        }
    }
}
const verRegistro = async () => {
    try {
        const { data } = await show(idProducto);
        formulario.value = {
            nombre: data.datos.nombre,
            codigo: data.datos.codigo,
            precio_compra: data.datos.precio_compra,
            precio_venta: data.datos.precio_venta,
            descripcion: data.datos.descripcion
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>