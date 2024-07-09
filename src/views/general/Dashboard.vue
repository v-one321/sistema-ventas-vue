<template>
    <div class="container mt-5">
        <div class="row gy-3">
            <div class="col-12 col-md-3 mt-3">
                <div class="card bg-success text-white">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7">
                                <span class="h5">Total Clientes <b>{{ datos.totalClientes }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-2">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-3 mt-3">
                <div class="card bg-primary text-white">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7">
                                <span class="h5">Total Productos <b>{{ datos.totalProductos }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-2">
                                <i class="fas fa-cubes"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3">
                <div class="card bg-danger text-white">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7">
                                <span class="h5">Total Compras <b>{{ datos.totalCompras }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-2">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3">
                <div class="card bg-warning text-white">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7">
                                <span class="h5">Total Ventas <b>{{ datos.totalVentas }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-2">
                                <i class="fas fa-shop"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <Bar id="my-chart-id" :options="opcionesBarra" :data="datosBarra" />
            </div>
            <div class="col-12 col-md-6">
                <Pie :options="opcionesBarra" :data="datosTorta" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { index } from '@/services/dashboardService';
import { ref, onMounted } from 'vue';
//Importaciones Vue-chartjs
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)
//Termina importaciones vue-chartjs
const datosBarra = ref({
    labels: [],
    datasets: [
        {
            backgroundColor: [],
            data: []
        }
    ]
})
const datosTorta = ref({
    labels: [],
    datasets: [
        {
            backgroundColor: [],
            data: []
        }
    ]
})
const opcionesBarra = ref({
    responsive: true
})
const datos = ref({
    totalClientes: null,
    totalProveedores: null,
    totalProductos: null,
    totalVentas: null,
    totalCompras: null
});
const listar = async () => {
    let nombreBarra = [];
    let totalBarra = [];
    let nombreTorta = [];
    let totalTorta = [];
    try {
        const { data } = await index();
        datos.value.totalClientes = data.total_clientes;
        datos.value.totalProveedores = data.total_prorveedores;
        datos.value.totalProductos = data.total_productos;
        datos.value.totalVentas = data.total_ventas;
        datos.value.totalCompras = data.total_compras;
        data.chartCompras.forEach(element => {
            nombreBarra.push(element.nombre_producto);
            totalBarra.push(element.total_compras);
        });
        data.chartVentas.forEach(element => {
            nombreTorta.push(element.nombre_producto);
            totalTorta.push(element.total_ventas);
        });
        datosBarra.value = {
            labels: nombreBarra,
            datasets: [
                {
                    backgroundColor: ['blue', 'pink', 'orange'],
                    data: totalBarra
                }
            ]
        }
        datosTorta.value = {
            labels: nombreTorta,
            datasets: [
                {
                    backgroundColor: ['cyan', 'green', 'orange'],
                    data: totalTorta
                }
            ]
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listar();
})
</script>
<style></style>