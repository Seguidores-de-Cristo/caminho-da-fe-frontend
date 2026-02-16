import { ref } from 'vue'
import * as api from '../entities/novos-convertidos/api'

export function useNovosConvertidos() {
  const items = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load(params?: any) {
    loading.value = true
    error.value = null
    try {
      const res = await api.list(params)
      items.value = res.data || []
      return res
    } catch (e: any) {
      error.value = e?.message || 'Erro ao carregar novos convertidos.'
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
    getOne: api.getOne,
    create: api.create,
    update: api.update,
    inactivate: api.inactivate,
    raw: api
  }
}

export async function listNovos(params?: any) {
  return api.list(params)
}

export default useNovosConvertidos
