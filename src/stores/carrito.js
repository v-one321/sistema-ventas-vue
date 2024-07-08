import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useCarritoStore = defineStore('carritoMovimiento', () => {
    const carritoCompras = ref([]);
    const carritoVentas = ref([]);
    const totalCompras = computed(() => carritoCompras.value.reduce((suma, elemento) => { return suma + elemento.precio_total}, 0));
    const addCarritoCompras = param => {
        if (!comprobarProducto(param.id)) {
            let objeto = {
                producto_id: param.id,
                nombre: param.nombre,
                codigo: param.codigo,
                cantidad: 1,
                precio_unitario: parseFloat(param.precio_compra),
                precio_total: parseFloat(param.precio_compra)
            };
            carritoCompras.value.push(objeto);
        }else{
            const posicion = carritoCompras.value.findIndex(elemento => elemento.producto_id == param.id);
            carritoCompras.value[posicion].precio_total+=parseFloat(param.precio_compra);
            carritoCompras.value[posicion].cantidad++;
        }
    }
    const comprobarProducto = (param) => {
        const existe = carritoCompras.value.some(elemento => elemento.producto_id === param);
        return existe;
    }
    const eliminarCarritoCompra = param => {
        carritoCompras.value.splice(param, 1);        
    }
    return {
        carritoCompras,
        carritoVentas,
        addCarritoCompras,
        totalCompras,
        eliminarCarritoCompra,
    }
})