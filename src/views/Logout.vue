<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-lg font-semibold">Saindo...</h2>
    <p class="text-sm text-slate-500 mt-2">Você será redirecionado para o login.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  auth.logout()
  await router.push('/login')
})
</script>
