import axios from "axios";

const apiURL = "https://9f03-2402-800-61c4-4085-20ae-2b4b-9dfb-e287.ngrok-free.app/api";

// axiosAPi.defaults.withCredentials = true;
let axiosAPi = axios.create();

axiosAPi.defaults.baseURL = apiURL;

export default axiosAPi;