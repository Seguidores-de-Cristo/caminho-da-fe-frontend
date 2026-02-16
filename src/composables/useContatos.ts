import { ref } from 'vue'
import * as api from '../entities/contatos/api'

export function useContatos() {
  const items = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load(params?: any) {
    loading.value = true
    error.value = null
    try {
      const res = await api.listContatos()
      // upstream may return AxiosResponse or data directly
      items.value = res?.data || res || []
      return res
    } catch (e: any) {
      error.value = e?.message || 'Erro ao carregar contatos.'
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
    listContatos: api.listContatos,
    createContato: api.createContato,
    createAcao: api.createAcao,
    listAcoesByContato: api.listAcoesByContato,
    raw: api
  }
}

export async function listContatos() {
  return api.listContatos()
}

export async function createContato(payload: any) {
  return api.createContato(payload)
}

export async function createAcao(payload: any) {
  return api.createAcao(payload)
}

export default useContatos
