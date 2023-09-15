import axios from "axios";

const apiURL = "https://fd36-2402-800-61c4-c98-994a-8106-4713-f9aa.ngrok-free.app/api";

// axiosAPi.defaults.timeout = 2000;

// axiosAPi.defaults.withCredentials = true;
let axiosAPi = axios.create();

axiosAPi.defaults.baseURL = apiURL;

export default axiosAPi;
