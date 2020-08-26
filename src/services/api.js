import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-aviacao.herokuapp.com/api'
});

export default api;
