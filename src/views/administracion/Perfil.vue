<template>
    <div class="container mt-4">
        <div class="row gy-3">
            <div class="col-12 col-md-8">
                <div class="card">
                    <div class="card-header bg-priamry-subtle">
                        <h5 class="card-title"><i class="fas fa-user me-2"></i>Modificar datos</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-6">
                                <label for="usuario" class="form-label">Usuario</label>
                                <input type="text" id="usuario" class="form-control" v-model="dato.name" placeholder="Escriba...">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" class="form-control" v-model="dato.email" placeholder="Escriba...">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="password" class="form-label">Password</label>
                                <input type="text" id="password" class="form-control" v-model="dato.password" placeholder="Escriba...">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="password_confirmation" class="form-label">Confirmar Password</label>
                                <input type="text" id="password_confirmation" class="form-control" v-model="dato.password_confirmation" placeholder="Escriba...">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button type="button" class="btn btn-warning" @click="editarDatos()"><i class="fas fa-pencil me-2"></i>Modificar datos</button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5 class="card-title"><i class="fas fa-image me-2"></i>Modificar foto</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 text-center">
                                <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" class="rounded-circle" width="150" height="150" alt="">
                            </div>
                            <div class="col-12">
                                <label for="imagen" class="form-label">Seleccione una imagen</label>
                                <input type="file" id="imagen" class="form-control" @change="obtenerImagen($event)">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-success" @click="editarImagen()"><i class="fas fa-save me-2" ></i>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { actualizarImagen, show, update } from '@/services/usuarioService';
import { useUserStore } from '@/stores/usuario';
import { ref, onMounted } from 'vue';
const userStore = useUserStore();
const dato = ref({
    name: null,
    email: null,
    password: '',
    password_confirmation: ''
});
const listar = async () => {
    try {
        const{ data } = await show(userStore.usuario.id);
        dato.value.name = data.name;
        dato.value.email = data.email;
    } catch (error) {
        console.log(error);
    }
}
const editarDatos = async () => {
    try {
        const { data } = await update(userStore.usuario.id, dato.value);
        let objeto = {
            nombre: data.datos.name,
            email: data.datos.email,
            id: data.datos.id,
            image: data.datos.foto_perfil,
        }
        localStorage.setItem('usuario', JSON.stringify(objeto));
        userStore.obtenerPerfil();
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listar();
})
const image = ref(null);
const obtenerImagen = (event)=>{
    image.value = event.target.files[0];
}
const editarImagen = async () => {
    try {
        let formulario = new FormData();
        formulario.append('imagen', image.value);
        formulario.append('id', userStore.usuario.id);
        const { data } = await actualizarImagen(formulario);
        console.log(data);
        let objeto = {
            nombre: data.datos.name,
            email: data.datos.email,
            id: data.datos.id,
            image: data.datos.foto_perfil,
        }
        localStorage.setItem('usuario', JSON.stringify(objeto));
        userStore.obtenerPerfil();
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>