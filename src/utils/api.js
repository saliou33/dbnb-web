import axios from 'axios';

//export const apiUrl = 'https://dbnb-flask.onrender.com/api';
 export const apiUrl = 'http://127.0.0.1:5000/api';

export const remote = axios.create({
  baseURL: apiUrl,
});


