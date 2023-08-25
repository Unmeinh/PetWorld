import axios from "axios";

const axiosFormData = axios.create();

axiosFormData.defaults.baseURL = 'https://76b3-2402-800-6189-1302-a1ff-753e-d5fd-ccc2.ngrok-free.app/api';

axiosFormData.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
};

// axiosFormData.defaults.timeout = 2000;

// axiosFormData.defaults.withCredentials = true;

export default axiosFormData;