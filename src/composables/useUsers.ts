import { ref } from 'vue'
import * as api from '../entities/users/api'

export function useUsers() {
  const items = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      const res = await api.listUsers()
      items.value = res || []
      return res
    } catch (e: any) {
      error.value = e?.message || 'Erro ao carregar usuários.'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    load,
    getUser: api.getUser,
    createUser: api.createUser,
    updateUser: api.updateUser,
    inactivateUser: api.inactivateUser,
    raw: api
  }
}

export async function listUsers() {
  return api.listUsers()
}

export default useUsers
