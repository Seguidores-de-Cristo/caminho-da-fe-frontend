<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Contatos — Novos Convertidos</h2>
      <router-link to="/contatos-novos-convertidos/new" class="px-3 py-1 bg-green-600 text-white rounded">Novo</router-link>
    </div>
    <div v-if="loading">Carregando...</div>
    <table v-else class="w-full bg-white rounded shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="p-2">Novo Convertido</th>
          <th class="p-2">Telefone</th>
          <th class="p-2">Discipulador</th>
          <th class="p-2">Email</th>
          <th class="p-2">Data</th>
          <th class="p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t">
          <td class="p-2">{{ getNovoNome(item.novo_convertido_id) }}</td>
          <td class="p-2">{{ getNovoTelefone(item.novo_convertido_id) }}</td>
          <td class="p-2">{{ getUserNome(item.discipulador_id) }}</td>
          <td class="p-2">{{ getUserEmail(item.discipulador_id) }}</td>
          <td class="p-2">{{ item.data_contato }}</td>
          <td class="p-2">
            <router-link :to="`/contatos-novos-convertidos/${item.id}/acoes`" class="text-blue-600">Ações</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '../../../api/client'
import { listContatos } from '../api'

const items = ref<any[]>([])
const loading = ref(false)
const users = ref<any[]>([])
const novos = ref<any[]>([])

async function load() {
  loading.value = true
  try {
    const [cRes, uRes, nRes] = await Promise.all([
      listContatos(),
      axios.get('/users/'),
      axios.get('/novos-convertidos/')
    ])
    items.value = cRes.data || []
    users.value = uRes.data || []
    novos.value = nRes.data || []
  } catch (e) {
    items.value = []
    users.value = []
    novos.value = []
  } finally {
    loading.value = false
  }
}

function getNovoNome(id: number) {
  const n = novos.value.find((x: any) => x.id === id)
  return n ? n.nome : id
}

function getNovoTelefone(id: number) {
  const n = novos.value.find((x: any) => x.id === id)
  return n ? n.telefone : '-'
}

function getUserNome(id: number) {
  const u = users.value.find((x: any) => x.id === id)
  return u ? u.nome : id
}

function getUserEmail(id: number) {
  const u = users.value.find((x: any) => x.id === id)
  return u ? u.email : '-'
}

onMounted(load)
</script>
