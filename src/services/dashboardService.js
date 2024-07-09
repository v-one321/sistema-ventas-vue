import { http, urlBase } from "./Http";
export const index = () => {
    return http().get(`${urlBase}dashboard`);
}