import axios from "axios";
import { storageMMKV } from "../storage/storageMMKV";

const apiURL = "http://10.0.2.2:3000/api";

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
