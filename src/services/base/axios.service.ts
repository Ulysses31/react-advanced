import axios from 'axios';

const axios_instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000, // timeout after 10 seconds
  headers: {
    //'Content-Encoding': 'utf-8',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'User-Agent': 'axios/0.21.1',
  },
});

export default axios_instance;
