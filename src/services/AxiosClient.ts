import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://www.cheapshark.com/api/1.0",
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;