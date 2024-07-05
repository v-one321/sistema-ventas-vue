import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useCarritoStore = defineStore('carritoMovimiento', () => {
    const carritoCompras = ref([]);
    const carritoVentas = ref([]);
    const addCarritoCompras = param => {        
        let objeto = {
            producto_id: param.id,
            nombre: param.nombre,
            codigo: param.codigo,
            cantidad: 1,
            precio_unitario: param.precio_compra,
            precio_total: param.precio_total
        };
        carritoCompras.value.push(objeto);
    }
    return {
        carritoCompras,
        carritoVentas,
        addCarritoCompras,
    }
})