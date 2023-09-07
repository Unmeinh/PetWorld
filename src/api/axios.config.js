import axios from "axios";
import { storageMMKV } from "../storage/storageMMKV";

const tokenHeader =  (storageMMKV.checkKey('login.token')) ? `Bearer ${storageMMKV.getString('login.token')}` : undefined;
const apiURL = "https://ec17-2a09-bac1-7a80-40-00-245-96.ngrok-free.app/api";

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

const instance = axios.create({
    baseURL: apiURL,
});

export {axiosJSON, axiosFormData};
export default axiosGet;
