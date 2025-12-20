import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NovoConvertidosList from '../views/NovoConvertidosList.vue'
import NovoConvertidoForm from '../views/NovoConvertidoForm.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', redirect: '/novos-convertidos' },
  { path: '/login', component: Login },
  {
    path: '/novos-convertidos',
    component: NovoConvertidosList,
    meta: { requiresAuth: true }
  },
  { path: '/novos-convertidos/new', component: NovoConvertidoForm, meta: { requiresAuth: true } },
  { path: '/novos-convertidos/:id/edit', component: NovoConvertidoForm, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
