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
            <span class="mx-2">|</span>
              <template v-if="(currentUserId !== item.id) && (currentUserEmail !== item.email)">
              <router-link :to="`/usuarios/${item.id}/inactivate`" class="text-red-600">Desativar</router-link>
            </template>
            <template v-else>
              <span class="relative inline-block group" aria-disabled="true">
                <span class="text-slate-400 cursor-not-allowed opacity-60 italic">Desativar</span>
                <span class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Você não pode desativar seu próprio usuário
                </span>
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from '../api/client'
import { useAuthStore } from '../stores/auth'

const items = ref<any[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  const res = await axios.get('/users/')
  items.value = res.data || []
  loading.value = false
}

function decodeJwtPayload(token: string | null): any | null {
  if (!token) return null
  try {
    // remover prefixo 'Bearer ' caso exista
    if (typeof token === 'string' && token.startsWith('Bearer ')) token = token.split(' ')[1]
    const parts = token.split('.')
    if (parts.length < 2) return null
    // corrigir padding base64 se necessário
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4 !== 0) b64 += '='
    const payload = JSON.parse(atob(b64))
    return payload
  } catch (e) {
    return null
  }
}

const auth = useAuthStore()
const currentUserId = computed(() => {
  const p = decodeJwtPayload(auth.token)
  const id = p?.user_id ?? p?.id ?? p?.user?.id
  return id == null ? null : Number(id)
})
const currentUserEmail = computed(() => {
  const p = decodeJwtPayload(auth.token)
  // sub might be an email; prefer explicit email claims
  const email = p?.email ?? p?.user?.email ?? p?.sub
  return typeof email === 'string' ? email : null
})

onMounted(load)
</script>
