import axios from "axios";

const axiosJSON = axios.create();

axiosJSON.defaults.baseURL = 'https://76b3-2402-800-6189-1302-a1ff-753e-d5fd-ccc2.ngrok-free.app/api';

axiosJSON.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Content-Type": "application/x-www-form-urlencoded",
};

const axiosFormData = axios.create();

axiosFormData.defaults.baseURL = 'https://76b3-2402-800-6189-1302-a1ff-753e-d5fd-ccc2.ngrok-free.app/api';

axiosFormData.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
};

// axiosJSON.defaults.timeout = 2000;

// axiosJSON.defaults.withCredentials = true;

export {axiosJSON, axiosFormData};