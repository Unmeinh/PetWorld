import axios from "axios";
import { storageMMKV } from "../storage/storageMMKV";

const apiURL = "https://a40e-2402-800-61c4-4085-5e42-57bb-f1d4-f9c.ngrok-free.app/api";

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