import axios from 'axios';

export const apiUrl = 'https://dbnb-flask.onrender.com/api';

export const remote = axios.create({
  baseURL: apiUrl,
});
