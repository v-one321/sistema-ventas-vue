import { urlBase, http } from "./Http";
export const index = (page) => {
    return http().get(`${urlBase}productos?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}productos`, formulario);
}
export const update = (id, formulario) => {
    return http().put(`${urlBase}productos/${id}`, formulario);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}productos/${id}`);
}
export const show = id => {
    return http().get(`${urlBase}productos/${id}`);
}
export const proveedoresActivos = () => {
    return http().get(`${urlBase}productos-activos`);
}