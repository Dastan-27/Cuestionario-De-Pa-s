/**
 * Servicio para consumir la API de países
 * Métodos para obtener información de países
 */

import api from './api.js';
import { DEFAULT_FIELDS } from './config.js';

/**
 * Obtiene todos los países con campos específicos
 * @param {string} fields - Campos a retornar (separados por comas)
 * @returns {Promise} Lista de países
 */
export const getAllCountries = async (fields = DEFAULT_FIELDS) => {
  try {
    const response = await api.get('/all', {
      params: {
        fields,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los países:', error);
    throw error;
  }
};

/**
 * Obtiene un país por su nombre
 * @param {string} countryName - Nombre del país
 * @param {string} fields - Campos a retornar (separados por comas)
 * @returns {Promise} Datos del país
 */
export const getCountryByName = async (countryName, fields = DEFAULT_FIELDS) => {
  try {
    const response = await api.get(`/name/${countryName}`, {
      params: {
        fields,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el país ${countryName}:`, error);
    throw error;
  }
};

/**
 * Obtiene un país por su código ISO
 * @param {string} countryCode - Código ISO del país (ej: 'CO', 'PE')
 * @param {string} fields - Campos a retornar (separados por comas)
 * @returns {Promise} Datos del país
 */
export const getCountryByCode = async (countryCode, fields = DEFAULT_FIELDS) => {
  try {
    const response = await api.get(`/alpha/${countryCode}`, {
      params: {
        fields,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el país con código ${countryCode}:`, error);
    throw error;
  }
};

/**
 * Filtra países por región
 * @param {string} region - Región a filtrar
 * @param {string} fields - Campos a retornar (separados por comas)
 * @returns {Promise} Lista de países de la región
 */
export const getCountriesByRegion = async (region, fields = DEFAULT_FIELDS) => {
  try {
    const response = await api.get(`/region/${region}`, {
      params: {
        fields,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener países de la región ${region}:`, error);
    throw error;
  }
};
