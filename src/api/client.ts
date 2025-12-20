import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const client = axios.create({
  baseURL: 'http://localhost:8000'
})

client.interceptors.request.use((config) => {
  try {
    const store = useAuthStore()
    const token = store.token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    // during initialization the store may not be available
  }
  return config
})

export default client
