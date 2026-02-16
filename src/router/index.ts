import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NovoConvertidosList from '../views/NovoConvertidosList.vue'
import NovoConvertidoForm from '../views/NovoConvertidoForm.vue'
import UsuariosList from '../views/UsuariosList.vue'
import UsuarioForm from '../views/UsuarioForm.vue'
import UsuarioInactivateConfirm from '../views/UsuarioInactivateConfirm.vue'
import ContatoNovoConvertidoList from '../views/ContatoNovoConvertidoList.vue'
import ContatoNovoConvertidoForm from '../views/ContatoNovoConvertidoForm.vue'
import AcoesContatoForm from '../views/AcoesContatoForm.vue'
import Logout from '../views/Logout.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', redirect: '/novos-convertidos' },
  { path: '/login', component: Login },
  { path: '/usuarios', component: UsuariosList, meta: { requiresAuth: true } },
  { path: '/usuarios/new', component: UsuarioForm, meta: { requiresAuth: true } },
  { path: '/usuarios/:id/edit', component: UsuarioForm, meta: { requiresAuth: true } },
  { path: '/usuarios/:id/inactivate', component: UsuarioInactivateConfirm, meta: { requiresAuth: true } },
  { path: '/novos-convertidos', component: NovoConvertidosList, meta: { requiresAuth: true } },
  { path: '/novos-convertidos/new', component: NovoConvertidoForm, meta: { requiresAuth: true } },
  { path: '/novos-convertidos/:id/edit', component: NovoConvertidoForm, meta: { requiresAuth: true } },
  { path: '/contatos-novos-convertidos', component: ContatoNovoConvertidoList, meta: { requiresAuth: true } },
  { path: '/contatos-novos-convertidos/new', component: ContatoNovoConvertidoForm, meta: { requiresAuth: true } },
  { path: '/contatos-novos-convertidos/:id/acoes', component: AcoesContatoForm, meta: { requiresAuth: true } },
  { path: '/contatos-novos-convertidos/:id/acoes/new', component: AcoesContatoForm, meta: { requiresAuth: true } },
  { path: '/logout', component: Logout }
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
