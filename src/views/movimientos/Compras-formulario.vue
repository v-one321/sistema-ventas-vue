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
                                <select name="proveedor" id="proveedor" class="form-select">
                                    <option value="">Seleccione</option>
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
                                            <tr v-for="(item, indice) in carritoCompras" :key="indice">
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.codigo }}</td>
                                                <td>{{ item.precio_unitario }}</td>
                                                <td>{{ item.cantidad }}</td>
                                                <td>{{ item.precio_unitario }}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import ProductosActivosVue from '@/components/Productos-activos.vue';
import { useCarritoStore } from '@/stores/carrito';
const { carritoCompras } = useCarritoStore();

</script>
<style>
    
</style>