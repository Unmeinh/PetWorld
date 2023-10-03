import axios from "axios";

const apiURL = "https://9307-2402-800-61c4-4085-1115-3d2b-6c5f-cb97.ngrok-free.app/api";

// axiosAPi.defaults.withCredentials = true;
let axiosAPi = axios.create();

axiosAPi.defaults.baseURL = apiURL;

export default axiosAPi;