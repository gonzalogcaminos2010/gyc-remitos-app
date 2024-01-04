import axios from 'axios';

const API_URL = 'tu-url-de-api'; // Reemplaza con la URL de tu API

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/ruta-login`, { // Ajusta la ruta según tu API
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response);
    throw error;
  }
};
