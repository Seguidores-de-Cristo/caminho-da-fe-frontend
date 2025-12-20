<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Discipuladores</h2>
      <router-link to="/usuarios/new" class="px-3 py-1 bg-green-600 text-white rounded">Novo</router-link>
    </div>
    <div v-if="loading">Carregando...</div>
    <table v-else class="w-full bg-white rounded shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">Nome</th>
          <th class="p-2">Email</th>
          <th class="p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t">
          <td class="p-2">{{ item.id }}</td>
          <td class="p-2">{{ item.nome }}</td>
          <td class="p-2">{{ item.email }}</td>
          <td class="p-2">
            <router-link :to="`/usuarios/${item.id}/edit`" class="text-blue-600">Editar</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '../api/client'

const items = ref<any[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  const res = await axios.get('/users/')
  items.value = res.data || []
  loading.value = false
}

onMounted(load)
</script>
