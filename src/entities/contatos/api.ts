import * as upstream from '../../api/contatos'

export const createContato = upstream.createContato
export const listContatos = upstream.listContatos
export const createAcao = upstream.createAcao
export const listAcoesByContato = upstream.listAcoesByContato

export default { createContato, listContatos, createAcao, listAcoesByContato }
