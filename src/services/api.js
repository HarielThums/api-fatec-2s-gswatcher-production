import axios from 'axios'

export const http = axios.create({
    baseURL: "https://api-gswatcher.herokuapp.com/auth",
    headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('@gswatcher:token'),
        "Content-type": "application/json"
    }
});