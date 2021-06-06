import axios from 'axios'

export const http = axios.create({
    baseURL: "https://api-gswatcher.herokuapp.com/auth",
    headers: {
        "Content-type": "application/json"
    }
});