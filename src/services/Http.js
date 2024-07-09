import axios from 'axios';
import { Buffer } from 'buffer';
export const urlBase = 'https://api.repuestosangel.net/api/';
export const urlBaseAsset = 'https://api.repuestosangel.net/';
export const http = () =>{
    let token = "";
    if(localStorage.getItem('token') != null){
        token = Buffer.from(localStorage.getItem('token'), 'base64').toString('ascii');
    }
    const interceptor = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 15000,
    });
    return interceptor;
}
export const httpAsset = () =>{
    let token = "";
    if(localStorage.getItem('token') != null){
        token = Buffer.from(localStorage.getItem('token'), 'base64').toString('ascii');
    }
    const interceptor = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        timeout: 15000,
    });
    return interceptor;
}