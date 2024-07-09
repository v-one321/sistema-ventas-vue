import { http, httpAsset, urlBase } from "./Http";
export const update = (id, formulario) => {
    return http().put(`${urlBase}usuario/${id}`, formulario);
}
export const show = id => {
    return http().get(`${urlBase}usuario/${id}`)
}
export const actualizarImagen = formulario => {
    return httpAsset().post(`${urlBase}actualizar-imagen`, formulario);
}