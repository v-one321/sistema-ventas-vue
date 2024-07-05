<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title"><i class="fas fa-edit me-2"></i>{{ idCliente != "" ? 'Editar registro' : 'Agregar Registro'}}</h5>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-12 col-md-4">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" id="nombre" class="form-control" :class="{'border-danger' : errors.nombre }" placeholder="Escriba..." v-model="formulario.nombre">
                        <small class="text-danger" v-if="errors.nombre"><i class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="apellido" class="form-label">Apellido</label>
                        <input type="text" id="apellido" class="form-control" :class="{'border-danger' : errors.apellido }" placeholder="Escriba..." v-model="formulario.apellido">
                        <small class="text-danger" v-if="errors.apellido"><i class="fas fa-times me-1"></i>{{ errors.apellido[0] }}</small>
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="identificacion" class="form-label">Identificacion</label>
                        <input type="text" id="identificacion" class="form-control" :class="{'border-danger' : errors.identificacion }" placeholder="Escriba..." v-model="formulario.identificacion">
                        <small class="text-danger" v-if="errors.identificacion"><i class="fas fa-times me-1"></i>{{ errors.identificacion[0] }}</small>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <button type="button" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Cancelar</button>
                <button type="button" class="btn ms-2" :class="idCliente != '' ? 'btn-warning' : 'btn-success'" @click="guardar()">{{ idCliente != "" ? 'Editar': 'Guardar'}}<i class="fas ms-2" :class="idCliente != '' ? 'fa-pencil' : 'fa-save'"></i></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { show, store, update } from '@/services/clientesService';
import Swal from 'sweetalert2';
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
const formulario = ref({});
const router = useRouter();
const errors = ref({});
const idCliente = router.currentRoute.value.params.idCliente;
onMounted(() => {
    if (idCliente != "") {
        verRegistro();
    }
});
const volver = () => {
    router.push({path: '/cliente'});
}
const guardar = async () => {
    errors.value = {};
    try {
        let mensaje = null;
        if (idCliente != "") {
            const { data } = await update(idCliente, formulario.value);
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
        const { data } = await show(idCliente);
        formulario.value = {
            nombre: data.datos.nombre,
            apellido: data.datos.apellido,
            identificacion: data.datos.identificacion
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>