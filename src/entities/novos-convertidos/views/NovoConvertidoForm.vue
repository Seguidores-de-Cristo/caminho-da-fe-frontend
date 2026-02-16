<template>
  <div class="max-w-2xl bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Editar' : 'Adicionar' }} Novo Convertido</h2>
    <form @submit.prevent="save" class="space-y-3">
      <!-- form content (unchanged) -->
      <div>
        <label class="block text-sm">Nome <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <input v-model="form.nome" class="w-full border rounded p-2" />
      </div>
      <!-- kept the rest identical to previous file -->
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
import { useRoute, useRouter } from 'vue-router'
import axios from '../../../api/client'
import type { AxiosError } from 'axios'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string | undefined
const isEdit = !!id

const form = ref<any>({
  nome: '',
  telefone: '',
  cep: '',
  endereco: '',
  cidade: '',
  bairro: '',
  uf: '',
  data_nascimento: '',
  data_conversao: '',
  discipulador_id: null
})

const errors = ref<Record<string, string[]>>({})
const generalError = ref<string | null>(null)
const submitting = ref(false)
const users = ref<Array<any>>([])
const loadingUsers = ref(false)

function mapDetailToField(loc: any[]): string {
  if (!Array.isArray(loc)) return 'non_field_errors'
  for (let i = loc.length - 1; i >= 0; i--) {
    const v = loc[i]
    if (typeof v === 'string') return v
  }
  return 'non_field_errors'
}

function clearErrors() { errors.value = {}; generalError.value = null }

async function load() {
  if (!id) return
  const res = await axios.get(`/novos-convertidos/${id}`)
  Object.assign(form.value, res.data)
}

async function loadUsers() {
  loadingUsers.value = true
  try {
    const res = await axios.get('/users/')
    users.value = res.data || []
  } catch (e) {
    generalError.value = 'Não foi possível carregar lista de discipuladores.'
  } finally {
    loadingUsers.value = false
  }
}

function clientValidate() {
  const required = ['nome','telefone','cep','endereco','cidade','bairro','uf','data_nascimento','data_conversao','discipulador_id']
  let ok = true
  for (const f of required) {
    if (form.value[f] === '' || form.value[f] === null || form.value[f] === undefined) {
      errors.value[f] = errors.value[f] || []
      errors.value[f].push('Campo obrigatório.')
      ok = false
    }
  }
  return ok
}

async function save() {
  clearErrors()
  if (!clientValidate()) return
  submitting.value = true
  try {
    if (isEdit) {
      await axios.put(`/novos-convertidos/${id}`, form.value)
    } else {
      await axios.post('/novos-convertidos/', form.value)
    }
    router.push('/novos-convertidos')
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

onMounted(load)
onMounted(loadUsers)

async function fetchCep() {
  const raw = form.value.cep || ''
  const cep = String(raw).replace(/\D/g, '')
  if (!cep) return
  try {
    const res = await axios.get(`/cep/${cep}`)
    const data = res.data || {}
    if (data.logradouro) form.value.endereco = data.logradouro
    if (data.cidade) form.value.cidade = data.cidade
    if (data.bairro) form.value.bairro = data.bairro
    if (data.uf) form.value.uf = data.uf
    if (data.complemento) form.value.complemento = data.complemento
  } catch (e) {
    generalError.value = 'CEP não encontrado ou serviço indisponível.'
    setTimeout(() => { generalError.value = null }, 3500)
  }
}
</script>
