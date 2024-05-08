import axios from "axios";
import { endpoints } from "../api/endpoints";

export const axiosInterceptorInstance = axios.create({
    baseURL : endpoints.baseURL(),

})


axiosInterceptorInstance.interceptors.request.use((request:any)=>{
    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")!) : null;
    if(tokens!=null){
        request.headers= {
            Authorization :"Bearer "+tokens.accessToken
        }
    }
    return request;

})