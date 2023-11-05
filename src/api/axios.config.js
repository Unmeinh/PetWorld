import axios from "axios";
import { storageMMKV } from "../storage/storageMMKV";

const tokenHeader =  (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined;
const apiURL = "https://1f2f-2402-800-617f-ac20-8988-305-bf76-9d62.ngrok-free.app/api";

const axiosJSON = axios.create();

axiosJSON.defaults.baseURL = apiURL;

axiosJSON.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization" : tokenHeader
};

const axiosFormData = axios.create();

axiosFormData.defaults.baseURL = apiURL;

axiosFormData.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    "Authorization" : tokenHeader
};

// axiosJSON.defaults.timeout = 2000;

// axiosJSON.defaults.withCredentials = true;
const axiosGet = axios.create();

axiosGet.defaults.baseURL = apiURL;

axiosGet.defaults.headers = {
    "Authorization" : tokenHeader
};

export {axiosJSON, axiosFormData};
export default axiosGet;
