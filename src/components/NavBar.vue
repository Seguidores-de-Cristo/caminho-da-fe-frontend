<template>
  <header class="bg-white shadow">
    <div class="max-w-4xl mx-auto flex items-center justify-between p-4">
      <div class="text-lg font-bold">Caminho da Fé</div>
      <nav class="flex items-center gap-3">
        <router-link to="/novos-convertidos" class="text-sm">Novos Convertidos</router-link>
        <router-link to="/contatos-novos-convertidos" class="text-sm">Contatos</router-link>
        <router-link to="/usuarios" class="text-sm">Discipuladores</router-link>
        <div v-if="auth.isAuthenticated" class="flex items-center gap-3">
          <button @click="goLogout" class="text-sm text-red-600">Sair</button>
        </div>
        <router-link v-else to="/login" class="text-sm text-blue-600">Login</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()
function goLogout() { router.push('/logout') }
</script>
