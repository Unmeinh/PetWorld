import axios from "axios";
import { storageMMKV } from "../storage/storageMMKV";

const apiURL = "http://10.0.2.2:3000/api";

// axiosAPi.defaults.withCredentials = true;
let axiosAPi = axios.create();

const getToken = async () => {
    const token = await storageMMKV.getString('login.token');
    return (token != "") ? `Bearer ${token}` : undefined
}
axiosAPi.defaults.baseURL = apiURL;
(async () => {
    axiosAPi.defaults.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": await getToken()
    };
})();

export default axiosAPi;
