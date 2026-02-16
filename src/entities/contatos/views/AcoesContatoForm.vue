<template>
  <div class="max-w-3xl bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">Ações do Contato</h2>
    <form @submit.prevent="save" class="space-y-3">
      <div>
        <label class="block text-sm">Contato (ID)</label>
        <input v-model.number="form.contato_novo_convertido_id" class="w-full border rounded p-2" />
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-sm">Convite Culto Igreja</label>
          <input type="checkbox" v-model="form.convite_culto_igreja" />
        </div>
        <div>
          <label class="block text-sm">Convite Culto Lar</label>
          <input type="checkbox" v-model="form.convite_culto_lar" />
        </div>
        <div>
          <label class="block text-sm">Convite Escola Dominical</label>
          <input type="checkbox" v-model="form.convite_escola_dominicial" />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-sm">Convite Reunião Discipulado</label>
          <input type="checkbox" v-model="form.convite_reuniao_discipulado" />
        </div>
        <div>
          <label class="block text-sm">Teleoração</label>
          <input type="checkbox" v-model="form.teleoracao" />
        </div>
        <div>
          <label class="block text-sm">Outros - Especificar</label>
          <input v-model="form.especificacao_outros" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="mt-3">
        <h3 class="font-medium">Respostas aos convites</h3>
        <div class="grid grid-cols-3 gap-3 mt-2">
          <div>
            <label class="block text-sm">Culto Igreja (resposta)</label>
            <input type="checkbox" v-model="form.convite_culto_igreja_resposta" />
          </div>
          <div>
            <label class="block text-sm">Culto Lar (resposta)</label>
            <input type="checkbox" v-model="form.convite_culto_lar_resposta" />
          </div>
          <div>
            <label class="block text-sm">Escola Dominical (resposta)</label>
            <input type="checkbox" v-model="form.convite_escola_dominicial_resposta" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3 mt-2">
          <div>
            <label class="block text-sm">Reunião Discipulado (resposta)</label>
            <input type="checkbox" v-model="form.convite_reuniao_discipulado_resposta" />
          </div>
          <div>
            <label class="block text-sm">Outros (resposta)</label>
            <input type="checkbox" v-model="form.outros_especificar_resposta" />
          </div>
          <div>
            <label class="block text-sm">Especificação - resposta</label>
            <input v-model="form.especificacao_outros_resposta" class="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div class="mt-3">
        <label class="block text-sm">Manter Contato</label>
        <input type="checkbox" v-model="form.manter_contato" />
      </div>

      <div v-if="!form.manter_contato" class="mt-2">
        <label class="block text-sm">Motivo de não manter contato</label>
        <input v-model="form.motivo_nao_manter_contato" class="w-full border rounded p-2" />
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Candidato abandonou discipulado</label>
          <input type="checkbox" v-model="form.candidato_abandonou_discipulado" />
        </div>
        <div v-if="form.candidato_abandonou_discipulado">
          <label class="block text-sm">Motivo abandono discipulado</label>
          <input v-model="form.motivo_abandono_discipulado" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Agendar próximo contato (data)</label>
          <input type="date" v-model="form.agendar_proximo_contato_data" class="w-full border rounded p-2" />
        </div>
        <div>
          <label class="block text-sm">Agendar próximo contato (hora)</label>
          <input type="time" v-model="form.agendar_proximo_contato_hora" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Candidato preparado para batismo</label>
          <input type="checkbox" v-model="form.candidato_preparado_batismo" />
        </div>
        <div v-if="form.candidato_preparado_batismo">
          <label class="block text-sm">Data batismo</label>
          <input type="date" v-model="form.data_batismo" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Candidato em dúvidas sobre batismo</label>
          <input type="checkbox" v-model="form.candidato_esta_em_duvidas_batismo" />
        </div>
        <div v-if="form.candidato_esta_em_duvidas_batismo">
          <label class="block text-sm">Motivo dúvidas batismo</label>
          <input v-model="form.motivo_duvidas_batismo" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Candidato desistiu batismo</label>
          <input type="checkbox" v-model="form.candidato_desistiu_batismo" />
        </div>
        <div v-if="form.candidato_desistiu_batismo">
          <label class="block text-sm">Motivo desistência batismo</label>
          <input v-model="form.motivo_desistencia_batismo" class="w-full border rounded p-2" />
        </div>
      </div>

      <div v-if="generalError" class="text-red-700">{{ generalError }}</div>

      <div class="text-right">
        <button :disabled="submitting" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
          <span v-if="submitting">Salvando...</span>
          <span v-else>Salvar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { AxiosError } from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { createAcao } from '../../../composables/useContatos'

const router = useRouter()
const route = useRoute()
const form = ref<any>({
  contato_novo_convertido_id: null,
  convite_culto_igreja: false,
  convite_culto_lar: false,
  convite_escola_dominicial: false,
  convite_reuniao_discipulado: false,
  teleoracao: false,
  outros_especificar: false,
  especificacao_outros: '',
  convite_culto_igreja_resposta: false,
  convite_culto_lar_resposta: false,
  convite_escola_dominicial_resposta: false,
  convite_reuniao_discipulado_resposta: false,
  outros_especificar_resposta: false,
  especificacao_outros_resposta: '',
  manter_contato: true,
  motivo_nao_manter_contato: '',
  candidato_abandonou_discipulado: false,
  motivo_abandono_discipulado: '',
  agendar_proximo_contato_data: '',
  agendar_proximo_contato_hora: '',
  candidato_preparado_batismo: false,
  data_batismo: '',
  candidato_esta_em_duvidas_batismo: false,
  motivo_duvidas_batismo: '',
  candidato_desistiu_batismo: false,
  motivo_desistencia_batismo: ''
})

const generalError = ref<string | null>(null)
const submitting = ref(false)

onMounted(() => {
  const idParam = route.params.id as string | number | undefined
  if (idParam) {
    const num = Number(idParam)
    if (!Number.isNaN(num)) form.value.contato_novo_convertido_id = num
  }
})

async function save() {
  generalError.value = null
  if (!form.value.contato_novo_convertido_id) {
    generalError.value = 'Informe o contato (id).'
    return
  }
  submitting.value = true
  try {
    await createAcao(form.value)
    router.push('/contatos-novos-convertidos')
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
</script>
