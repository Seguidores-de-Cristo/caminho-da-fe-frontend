<template>
  <div class="max-w-md bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">Confirmar desativação</h2>

    <div v-if="loading">Carregando...</div>

    <div v-else class="space-y-4">
      <div>Deseja realmente desativar o discipulador <strong>{{ item.nome }}</strong> (ID: {{ item.id }})? Isso manterá o registro, mas impedirá o acesso.</div>

      <div v-if="generalError" class="text-red-700">{{ generalError }}</div>

      <div class="flex justify-end gap-2">
        <button @click="cancel" class="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
        <button @click="confirm" :disabled="submitting" class="px-4 py-2 bg-yellow-600 text-white rounded disabled:opacity-50">
          <span v-if="submitting">Desativando...</span>
          <span v-else>Desativar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../api/client'
import type { AxiosError } from 'axios'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const item = ref<any>({ id: id, nome: '' })
const loading = ref(false)
const submitting = ref(false)
const generalError = ref<string | null>(null)

async function load() {
  loading.value = true
  try {
    const res = await axios.get(`/users/${id}`)
    Object.assign(item.value, res.data)
  } finally {
    loading.value = false
  }
}

async function confirm() {
  generalError.value = null
  submitting.value = true
  try {
    // enviar PUT para desativar (is_active: false)
    await axios.put(`/users/${id}`, { is_active: false })
    router.push('/usuarios')
  } catch (err) {
    const e = err as AxiosError<any>
    if (e.response) {
      generalError.value = e.response.data?.detail || `Erro ${e.response.status}`
    } else if (e.request) {
      generalError.value = 'Sem resposta do servidor.'
    } else {
      generalError.value = 'Erro ao enviar requisição.'
    }
  } finally {
    submitting.value = false
  }
}

function cancel() {
  router.push('/usuarios')
}

onMounted(load)
</script>
