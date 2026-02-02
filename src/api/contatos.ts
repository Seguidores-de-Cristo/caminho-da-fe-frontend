import axios from './client'
import type { components } from './openapi-types'
import type { AxiosResponse } from 'axios'

type ContatoCreate = components['schemas']['ContatoNovoConvertidoCreate']
type ContatoOut = components['schemas']['ContatoNovoConvertidoOut']
type AcaoCreate = components['schemas']['ContatoNovosConvertidosAcoesCreate']
type AcaoOut = components['schemas']['ContatoNovosConvertidosAcoesOut']

export async function createContato(payload: ContatoCreate): Promise<AxiosResponse<ContatoOut>> {
  return axios.post<ContatoOut>('/contatos-novos-convertidos/', payload)
}

export async function listContatos(): Promise<AxiosResponse<ContatoOut[]>> {
  return axios.get<ContatoOut[]>('/contatos-novos-convertidos/')
}

export async function createAcao(payload: AcaoCreate): Promise<AxiosResponse<AcaoOut>> {
  return axios.post<AcaoOut>('/contatos-novos-convertidos-acoes/', payload)
}

export async function listAcoesByContato(contatoId: number): Promise<AxiosResponse<AcaoOut[]>> {
  return axios.get<AcaoOut[]>(`/contatos-novos-convertidos-acoes/contato/${contatoId}`)
}

export default { createContato, listContatos, createAcao, listAcoesByContato }
