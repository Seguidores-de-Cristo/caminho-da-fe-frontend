<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h1 class="text-xl font-semibold mb-4">Login</h1>
    <form @submit.prevent="onSubmit" class="space-y-3">
      <div>
        <label class="block text-sm">Email</label>
        <input v-model="username" class="w-full border rounded p-2" />
      </div>
      <div>
        <label class="block text-sm">Senha</label>
        <input v-model="password" type="password" class="w-full border rounded p-2" />
      </div>

      <div v-if="auth.error" class="text-red-600 text-sm">{{ auth.error }}</div>

      <div class="text-right">
        <button :disabled="auth.loading" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
          <span v-if="auth.loading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

async function onSubmit() {
  const ok = await auth.login(username.value, password.value)
  if (ok) router.push('/novos-convertidos')
}
</script>
