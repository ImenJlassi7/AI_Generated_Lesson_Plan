import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // This is important to send cookies with each request
});

export default instance;
