import getEnv from "@/utils/getEnv";
import axios from "axios";

const Fetcher = axios.create({
    baseURL: getEnv('API_URL')
});

Fetcher.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default Fetcher;
