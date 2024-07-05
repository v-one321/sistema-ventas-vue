<template>
    <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/dashboard"><img src="https://tiendalotengo.com/media/logo/default/logo.png"
                    width="120px" alt=""></RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/dashboard">Inicio</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/proveedor">Proveedores</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/cliente">Clientes</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/producto">Productos</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/compras-formulario">Compras</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                                width="40px" height="40px" class="rounded-circle" alt="">Vladimir</a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a href="ver-perfil.html" class="dropdown-item">Ver perfil</a>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item" @click="logout()">Cerrar sesión</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <RouterView />
</template>
<script setup>
    import { cerrarSesion } from "@/services/authService";
    import { RouterView, RouterLink, useRouter } from "vue-router";
    const router = useRouter();
    const logout = async () => {
        try {
            const { data } = await cerrarSesion();
            localStorage.clear();
            router.push({path: '/login'});
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style>
 
</style>