import axios from 'axios'
const apiClient = axios.create({
    baseURL: "https://phulbari-seven.vercel.app/api/"
});

export default apiClient;