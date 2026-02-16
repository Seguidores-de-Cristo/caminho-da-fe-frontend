import axios from '../../api/client'
import * as contatosUpstream from '../../api/contatos'

export function list(params?: any) {
  return axios.get('/novos-convertidos/', { params })
}

export function getOne(id: string | number) {
  return axios.get(`/novos-convertidos/${id}`)
}

export function create(payload: any) {
  return axios.post('/novos-convertidos/', payload)
}

export function update(id: string | number, payload: any) {
  return axios.put(`/novos-convertidos/${id}`, payload)
}

export function inactivate(id: string | number) {
  return axios.put(`/novos-convertidos/${id}`, { is_active: false })
}

// Expose contatos (contatos de novos convertidos) CRUD via this model
export const createContato = contatosUpstream.createContato
export const listContatos = contatosUpstream.listContatos
export const createAcao = contatosUpstream.createAcao
export const listAcoesByContato = contatosUpstream.listAcoesByContato

export default { list, getOne, create, update, inactivate, createContato, listContatos, createAcao, listAcoesByContato }
