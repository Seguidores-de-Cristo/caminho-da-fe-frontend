<template>
  <div class="max-w-2xl bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">Adicionar Contato — Novo Convertido</h2>
    <form @submit.prevent="save" class="space-y-3">
      <div>
        <label class="block text-sm">Novo Convertido <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <select v-model.number="form.novo_convertido_id" class="w-full border rounded p-2">
          <option value="">Selecione</option>
          <option v-for="n in novos" :key="n.id" :value="n.id">{{ n.nome }} — {{ n.telefone }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm">Discipulador <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <select v-model.number="form.discipulador_id" class="w-full border rounded p-2">
          <option value="">Selecione</option>
          <option v-for="u in users" :key="u.id" :value="u.id">{{ u.nome }} — {{ u.email }}</option>
        </select>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-sm">Sucesso no Contato</label>
          <input type="checkbox" v-model="form.sucesso_contato" />
        </div>
        <div>
          <label class="block text-sm">Confirmar Contato</label>
          <input type="checkbox" v-model="form.confirmar_contato" />
        </div>
        <div>
          <label class="block text-sm">Protocolo</label>
          <input v-model="form.protocolo" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Data Contato</label>
          <input type="date" v-model="form.data_contato" class="w-full border rounded p-2" />
        </div>
        <div>
          <label class="block text-sm">Hora Protocolo</label>
          <input type="time" v-model="form.hora_protocolo" class="w-full border rounded p-2" />
        </div>
      </div>

      <div>
        <label class="block text-sm">Status</label>
        <input v-model="form.status_contato" class="w-full border rounded p-2" />
      </div>

      <div v-if="generalError" class="text-red-700">{{ generalError }}</div>

      <div class="text-right">
        <button :disabled="submitting" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
          <span v-if="submitting">Salvando...</span>
          <span v-else>Salvar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '../../../api/client'
import type { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { createContato } from '../api'

const router = useRouter()
const form = ref<any>({ discipulador_id: null, novo_convertido_id: null, sucesso_contato: false, data_contato: '', protocolo: '', hora_protocolo: '', status_contato: '', confirmar_contato: false })
const errors = ref<Record<string, string[]>>({})
const generalError = ref<string | null>(null)
const submitting = ref(false)
const users = ref<any[]>([])
const novos = ref<any[]>([])

function mapDetailToField(loc: any[]): string {
  if (!Array.isArray(loc)) return 'non_field_errors'
  for (let i = loc.length - 1; i >= 0; i--) {
    const v = loc[i]
    if (typeof v === 'string') return v
  }
  return 'non_field_errors'
}

async function loadLists() {
  try {
    const [u, n] = await Promise.all([axios.get('/users/'), axios.get('/novos-convertidos/')])
    users.value = u.data || []
    novos.value = n.data || []
  } catch (e) {
    generalError.value = 'Não foi possível carregar listas.'
  }
}

async function save() {
  errors.value = {}
  generalError.value = null
  if (!form.value.novo_convertido_id || !form.value.discipulador_id) {
    generalError.value = 'Preencha novo convertido e discipulador.'
    return
  }
  submitting.value = true
  try {
    await createContato(form.value)
    router.push('/contatos-novos-convertidos')
  } catch (err) {
    const e = err as AxiosError<any>
    if (e.response) {
      if (e.response.status === 422) {
        const detail = e.response.data?.detail
        if (Array.isArray(detail)) {
          for (const item of detail) {
            const field = mapDetailToField(item.loc)
            errors.value[field] = errors.value[field] || []
            errors.value[field].push(item.msg || JSON.stringify(item))
          }
        } else {
          generalError.value = e.response.data?.detail || JSON.stringify(e.response.data)
        }
      } else {
        generalError.value = e.response.data?.detail || `Erro ${e.response.status}`
      }
    } else if (e.request) {
      generalError.value = 'Sem resposta do servidor.'
    } else {
      generalError.value = 'Erro ao enviar requisição.'
    }
  } finally {
    submitting.value = false
  }
}

onMounted(loadLists)
</script>
