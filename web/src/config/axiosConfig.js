import axios from 'axios';

console.log(process.env.NODE_ENV)

const clientAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
});

export default clientAxios;