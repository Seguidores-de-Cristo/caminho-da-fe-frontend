<template>
  <div class="max-w-2xl bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Editar' : 'Adicionar' }} Novo Convertido</h2>
    <form @submit.prevent="save" class="space-y-3">
      <div>
        <label class="block text-sm">Nome <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <input v-model="form.nome" class="w-full border rounded p-2" />
        <div v-if="errors.nome" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.nome" :key="i">{{ m }}</div>
        </div>
      </div>

      <div>
        <label class="block text-sm">Telefone <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <input v-model="form.telefone" class="w-full border rounded p-2" />
        <div v-if="errors.telefone" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.telefone" :key="i">{{ m }}</div>
        </div>
      </div>

      <div>
        <label class="block text-sm">CEP <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <input v-model="form.cep" class="w-full border rounded p-2" />
        <div v-if="errors.cep" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.cep" :key="i">{{ m }}</div>
        </div>
      </div>

      <div>
        <label class="block text-sm">Endereço <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <input v-model="form.endereco" class="w-full border rounded p-2" />
        <div v-if="errors.endereco" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.endereco" :key="i">{{ m }}</div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-sm">Cidade <span class="text-xs text-slate-500">(obrigatório)</span></label>
          <input v-model="form.cidade" class="w-full border rounded p-2" />
          <div v-if="errors.cidade" class="text-sm text-red-600 mt-1">
            <div v-for="(m, i) in errors.cidade" :key="i">{{ m }}</div>
          </div>
        </div>
        <div>
          <label class="block text-sm">Bairro <span class="text-xs text-slate-500">(obrigatório)</span></label>
          <input v-model="form.bairro" class="w-full border rounded p-2" />
          <div v-if="errors.bairro" class="text-sm text-red-600 mt-1">
            <div v-for="(m, i) in errors.bairro" :key="i">{{ m }}</div>
          </div>
        </div>
        <div>
          <label class="block text-sm">UF <span class="text-xs text-slate-500">(obrigatório)</span></label>
          <input v-model="form.uf" class="w-full border rounded p-2" />
          <div v-if="errors.uf" class="text-sm text-red-600 mt-1">
            <div v-for="(m, i) in errors.uf" :key="i">{{ m }}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Data Nascimento <span class="text-xs text-slate-500">(obrigatório)</span></label>
          <input type="date" v-model="form.data_nascimento" class="w-full border rounded p-2" />
          <div v-if="errors.data_nascimento" class="text-sm text-red-600 mt-1">
            <div v-for="(m, i) in errors.data_nascimento" :key="i">{{ m }}</div>
          </div>
        </div>
        <div>
          <label class="block text-sm">Data Conversão <span class="text-xs text-slate-500">(obrigatório)</span></label>
          <input type="date" v-model="form.data_conversao" class="w-full border rounded p-2" />
          <div v-if="errors.data_conversao" class="text-sm text-red-600 mt-1">
            <div v-for="(m, i) in errors.data_conversao" :key="i">{{ m }}</div>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm">Discipulador (ID) <span class="text-xs text-slate-500">(obrigatório)</span></label>
        <input type="number" v-model.number="form.discipulador_id" class="w-full border rounded p-2" />
        <div v-if="errors.discipulador_id" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.discipulador_id" :key="i">{{ m }}</div>
        </div>
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
import { useRoute, useRouter } from 'vue-router'
import axios from '../api/client'
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

function mapDetailToField(loc: any[]): string {
  // loc can be like ["body", "field_name"] or similar; prefer last string
  if (!Array.isArray(loc)) return 'non_field_errors'
  for (let i = loc.length - 1; i >= 0; i--) {
    const v = loc[i]
    if (typeof v === 'string') return v
  }
  return 'non_field_errors'
}

function clearErrors() {
  errors.value = {}
  generalError.value = null
}

async function load() {
  if (!id) return
  const res = await axios.get(`/novos-convertidos/${id}`)
  Object.assign(form.value, res.data)
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
        // OpenAPI-style validation error: { detail: [{loc: [...], msg: '...', type: '...'}, ...] }
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
</script>
