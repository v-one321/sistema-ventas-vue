import { http, urlBase } from "./Http";
export const index = page => {
    return http().get(`${urlBase}ventas?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}ventas`, formulario);
}
export const show = id => {
    return http().get(`${urlBase}ventas/${id}`);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}ventas/${id}`);
}