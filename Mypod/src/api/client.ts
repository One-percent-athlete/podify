import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.128.128:8989',
});

export default client;
