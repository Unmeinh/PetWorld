import axios from "axios";
import { storageMMKV } from "../storage/storageMMKV";

const apiURL = "https://9307-2402-800-61c4-4085-1115-3d2b-6c5f-cb97.ngrok-free.app/api";

// axiosAPi.defaults.timeout = 2000;

// axiosAPi.defaults.withCredentials = true;
let axiosAPi = axios.create();

axiosAPi.defaults.baseURL = apiURL;
axiosAPi.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined
};
export default axiosAPi;
