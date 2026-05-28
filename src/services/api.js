/**
 * Instancia centralizada de axios
 * Configuración base para todas las peticiones HTTP
 */

import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './config.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar respuestas exitosas
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error.message);
    return Promise.reject(error);
  }
);

export default api;
