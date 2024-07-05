import { urlBase, http } from "./Http";
export const index = (page) => {
    return http().get(`${urlBase}clientes?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}clientes`, formulario);
}
export const update = (id, formulario) => {
    return http().put(`${urlBase}clientes/${id}`, formulario);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}clientes/${id}`);
}
export const show = id => {
    return http().get(`${urlBase}clientes/${id}`);
}
export const proveedoresActivos = () => {
    return http().get(`${urlBase}clientes-activos`);
}