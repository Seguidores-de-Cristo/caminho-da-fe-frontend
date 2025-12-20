<template>
  <div class="max-w-2xl bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Editar' : 'Novo' }} Novo Convertido</h2>
    <form @submit.prevent="save" class="space-y-3">
      <div>
        <label class="block text-sm">Nome</label>
        <input v-model="form.nome" class="w-full border rounded p-2" />
      </div>
      <div>
        <label class="block text-sm">Telefone</label>
        <input v-model="form.telefone" class="w-full border rounded p-2" />
      </div>
      <div class="text-right">
        <button class="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../api/client'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string | undefined
const isEdit = !!id

const form = ref({ nome: '', telefone: '' })

async function load() {
  if (!id) return
  const res = await axios.get(`/novos-convertidos/${id}`)
  Object.assign(form.value, res.data)
}

async function save() {
  if (isEdit) {
    await axios.put(`/novos-convertidos/${id}`, form.value)
  } else {
    await axios.post('/novos-convertidos/', form.value)
  }
  router.push('/novos-convertidos')
}

onMounted(load)
</script>
