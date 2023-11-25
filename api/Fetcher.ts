import getEnv from "@/utils/getEnv";
import axios from "axios";

const Fetcher = axios.create({
    baseURL: process.env.API_URL
});

Fetcher.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default Fetcher;

// async function main() {
//     let data = await Fetcher.post('/api/users', {
//         "name": "Bùi Tuấn Dũng",
//         "studentid": "21020006",
//         "password": "abc123"
//     })
//     console.log(data)
// Fetcher.post('/api/users', {
//     "name": "Bùi Tuấn Dũng",
//     "studentid": "21020006",
//     "password": "abc123"
//   }).then(data => console.log(data))
// }

// main()
