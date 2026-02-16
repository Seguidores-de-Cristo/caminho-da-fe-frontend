import axios from '../../api/client'

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

export default { list, getOne, create, update, inactivate }
