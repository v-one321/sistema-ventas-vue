import { urlBase, http } from "./Http";
export const index = (page) => {
    return http().get(`${urlBase}proveedores?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}proveedores`, formulario);
}
export const update = (id, formulario) => {
    return http().put(`${urlBase}proveedores/${id}`, formulario);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}proveedores/${id}`);
}
export const show = id => {
    return http().get(`${urlBase}proveedores/${id}`);
}
export const proveedoresActivos = () => {
    return http().get(`${urlBase}proveedores-activos`);
}