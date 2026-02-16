import axios from '../../api/client'

export async function listUsers() {
  const res = await axios.get('/users/')
  return res.data
}

export async function getUser(id: string) {
  const res = await axios.get(`/users/${id}`)
  return res.data
}

export async function createUser(payload: any) {
  const res = await axios.post('/users/', payload)
  return res.data
}

export async function updateUser(id: string, payload: any) {
  const res = await axios.put(`/users/${id}`, payload)
  return res.data
}

export async function inactivateUser(id: string) {
  const res = await axios.put(`/users/${id}`, { is_active: false })
  return res.data
}

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  inactivateUser
}
