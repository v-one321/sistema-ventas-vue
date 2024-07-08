import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
export const useCarritoStore = defineStore('carritoMovimiento', () => {
    const carritoCompras = ref([]);
    const carritoVentas = ref([]);
    const totalCompras = computed(() => carritoCompras.value.reduce((suma, elemento) => { return suma + elemento.precio_total}, 0));
    const addCarritoCompras = param => {
        if (!comprobarProducto(param.id, carritoCompras.value)) {
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
    const comprobarProducto = (param, array) => {
        const existe = array.some(elemento => elemento.producto_id === param);
        return existe;
    }
    const eliminarCarritoCompra = param => {
        carritoCompras.value.splice(param, 1);        
    }
    const totalVentas = computed(() => carritoVentas.value.reduce((suma, elemento) => { return suma + elemento.precio_total}, 0));
    const addCarritoVentas = param => {
        if (parseFloat(param.cantidad) > 0) {            
            if (!comprobarProducto(param.id, carritoVentas.value)) {
                let objeto = {
                    producto_id: param.id,
                    nombre: param.nombre,
                    codigo: param.codigo,
                    cantidad: 1,
                    precio_unitario: parseFloat(param.precio_venta),
                    precio_total: parseFloat(param.precio_venta),
                    stock: param.cantidad
                };
                carritoVentas.value.push(objeto);
            }else{
                const posicion = carritoVentas.value.findIndex(elemento => elemento.producto_id == param.id);
                if (carritoVentas.value[posicion].stock > carritoVentas.value[posicion].cantidad) {             
                    carritoVentas.value[posicion].precio_total+=parseFloat(param.precio_venta);
                    carritoVentas.value[posicion].cantidad++;
                } else {
                    Swal.fire({
                        title: 'Advertencia!',
                        text: 'La cantidad Solicitada es mayo a la cantidad en Stock',
                        icon: 'warning'
                    });
                }
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'El producto seleccionado tiene un stock de 0',
                icon: 'error'
            });            
        }
    }
    const eliminarCarritoVenta = param => {
        carritoVentas.value.splice(param, 1);        
    }
    return {
        carritoCompras,
        carritoVentas,
        addCarritoCompras,
        totalCompras,
        eliminarCarritoCompra,
        totalVentas,
        addCarritoVentas,
        eliminarCarritoVenta,
    }
})