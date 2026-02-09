import { defineStore } from 'pinia'
import axios from '../api/client'
import type { AxiosError } from 'axios'

type State = {
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({ token: localStorage.getItem('token'), loading: false, error: null }),
  getters: {
    isAuthenticated: (s) => !!s.token
  },
  actions: {
    /**
     * Faz login com username/password.
     * Retorna true se autenticado, false caso contrário.
     * Popula `error` com mensagem legível em caso de falha.
     */
    async login(username: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const params = new URLSearchParams()
        // OpenAPI expects OAuth-style fields; enviar grant_type e scope
        params.append('grant_type', 'password')
        params.append('username', username)
        params.append('password', password)
        params.append('scope', '')
        const res = await axios.post('/auth/token', params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        const token = res.data?.access_token || res.data?.token || null
        if (token) {
          this.token = token
          localStorage.setItem('token', token)
          return true
        }
        // Resposta 2xx sem token
        this.error = 'Resposta inesperada do servidor.'
        return false
      } catch (err) {
        // Tratamento cuidadoso de erro Axios
        const e = err as AxiosError<any>
        if (e.response) {
          const status = e.response.status
          const data = e.response.data
          // Tentar extrair mensagem do body (campo comum: detail, message, error)
          const detail = data?.detail || data?.message || data?.error
          this.error = detail || `Erro ${status} ao autenticar.`
        } else if (e.request) {
          this.error = 'Sem resposta do servidor. Verifique a conexão.'
        } else {
          this.error = 'Erro ao preparar a requisição.'
        }
        return false
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
