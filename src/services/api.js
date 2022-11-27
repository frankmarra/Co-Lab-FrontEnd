import Axios from 'axios'
import { supabase } from '../supabaseClient'

export const BASE_URL = 'co-lab-backend-production.up.railway.app/api'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
