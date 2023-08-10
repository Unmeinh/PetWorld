import axios from "axios";

const client = axios.create({
    baseURL: "https://192.168.191.4:3000/api",
    headers: {
        "Accept":"application/json",
        "Content-Type": "application/json"
    }
});

export default client;