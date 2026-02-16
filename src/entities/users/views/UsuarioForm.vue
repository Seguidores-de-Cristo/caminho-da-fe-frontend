<template>
  <div class="max-w-md bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Editar' : 'Adicionar' }} Discipulador</h2>
    <form @submit.prevent="save" class="space-y-3">
      <div>
        <label class="block text-sm">Nome</label>
        <input v-model="form.nome" class="w-full border rounded p-2" />
        <div v-if="errors.nome" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.nome" :key="i">{{ m }}</div>
        </div>
      </div>

      <div v-if="!isEdit">
        <label class="block text-sm">Email</label>
        <input v-model="form.email" type="email" class="w-full border rounded p-2" />
        <div v-if="errors.email" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.email" :key="i">{{ m }}</div>
        </div>
      </div>

      <div>
        <label class="block text-sm">Telefone</label>
        <input v-model="form.telefone" class="w-full border rounded p-2" />
        <div v-if="errors.telefone" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.telefone" :key="i">{{ m }}</div>
        </div>
      </div>

      <div v-if="!isEdit">
        <label class="block text-sm">Senha</label>
        <input v-model="form.password" type="password" class="w-full border rounded p-2" />
        <div v-if="errors.password" class="text-sm text-red-600 mt-1">
          <div v-for="(m, i) in errors.password" :key="i">{{ m }}</div>
        </div>
      </div>

      <div v-if="isEdit" class="space-y-2">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="changePassword" />
          <span class="text-sm">Alterar senha</span>
        </label>
        <div v-if="changePassword">
          <label class="block text-sm">Nova senha</label>
          <input v-model="form.password" type="password" class="w-full border rounded p-2" />
          <div v-if="errors.password" class="text-sm text-red-600 mt-1">
            <div v-for="(m, i) in errors.password" :key="i">{{ m }}</div>
          </div>

          <label class="block text-sm mt-2">Confirme a nova senha</label>
          <input v-model="passwordConfirm" type="password" class="w-full border rounded p-2" />
          <div v-if="errors.password_confirm" class="text-sm text-red-600 mt-1">
            <div v-for="(m, i) in errors.password_confirm" :key="i">{{ m }}</div>
          </div>
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
import { useUsers } from '../../../composables/useUsers'
import type { AxiosError } from 'axios'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string | undefined
const isEdit = !!id

const form = ref<any>({ nome: '', email: '', telefone: '', password: '' })
const errors = ref<Record<string, string[]>>({})
const generalError = ref<string | null>(null)
const submitting = ref(false)
const changePassword = ref(false)
const passwordConfirm = ref('')

function mapDetailToField(loc: any[]): string {
  if (!Array.isArray(loc)) return 'non_field_errors'
  for (let i = loc.length - 1; i >= 0; i--) {
    const v = loc[i]
    if (typeof v === 'string') return v
  }
  return 'non_field_errors'
}

function clearErrors() { errors.value = {}; generalError.value = null }

const { getUser, createUser, updateUser } = useUsers()

async function load() {
  if (!id) return
  const res = await getUser(id)
  Object.assign(form.value, res)
}

function clientValidate() {
  let ok = true
  errors.value = {}
  if (!form.value.nome) { errors.value.nome = ['Campo obrigatório.']; ok = false }
  if (!isEdit && !form.value.email) { errors.value.email = ['Campo obrigatório.']; ok = false }
  if (!isEdit && !form.value.password) { errors.value.password = ['Campo obrigatório.']; ok = false }
  if (isEdit && changePassword.value) {
    if (!form.value.password) { errors.value.password = ['Campo obrigatório.']; ok = false }
    if (form.value.password && form.value.password !== passwordConfirm.value) {
      errors.value.password_confirm = ['As senhas não conferem.']; ok = false
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
      const payload = { ...form.value }
      // remover campos que a API não espera no PUT (ex: email)
      if ('email' in payload) delete payload.email
      // se não for para alterar senha, remover campo password
      if (!changePassword.value && 'password' in payload) delete payload.password
      await updateUser(id as string, payload)
    } else {
      await createUser(form.value)
    }
    router.push('/usuarios')
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
</script>
