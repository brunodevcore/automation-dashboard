import api from './axios'

export const registerRequest = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

export const loginRequest = async (userData) => {
  const response = await api.post('/auth/login', userData)
  return response.data
}