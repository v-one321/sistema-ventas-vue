import { http, urlBase } from "./Http";
export const index = page => {
    return http().get(`${urlBase}compras?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}compras`, formulario);
}
export const show = id => {
    return http().get(`${urlBase}compras/${id}`);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}compras/${id}`);
}