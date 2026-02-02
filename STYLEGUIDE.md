# Frontend Style & Implementation Guidelines

Este arquivo registra padrões mínimos adotados no projeto para facilitar consistência entre formulários e chamadas à API (integração com OpenAPI).

Principais regras
- Componentes de formulário usam `script setup lang="ts"` e `ref` para estado local.
- Reutilizar o padrão de tratamento de erros OpenAPI: status 422 retorna `detail: ValidationError[]`. Use `mapDetailToField(loc)` para mapear mensagens por campo.
- Chamadas HTTP centralizadas em `src/api/*` e usar `src/api/client.ts` para interceptores (autenticação).
- Nomes de componentes e views:
  - `NovoConvertidoForm.vue`, `ContatoNovoConvertidoForm.vue`, `AcoesContatoForm.vue` — seguir nome no plural/singular conforme recurso REST.
- Rotas: manter padrão RESTful — `/contatos-novos-convertidos/`, `/contatos-novos-convertidos-acoes/`.

Formulários
- Validar campos obrigatórios no cliente antes de enviar (mensagens simples), mas confiar na validação do servidor para regras complexas.
- Ao enviar formulários que aceitam `application/x-www-form-urlencoded` (login), montar `URLSearchParams`.
- Para datas usar `input type="date"`, para hora `input type="time"`.

Estilo visual
- Utilizar classes utilitárias do Tailwind (já presentes no projeto). Mantê-las simples e consistentes com componentes existentes.

API / Tipos
- Gerar `src/api/openapi-types.ts` com `npm run gen:openapi` quando a API mudar.
- Preferir usar os tipos gerados nas chamadas importantes (ex.: responses) quando for necessário maior segurança de tipos.

Requisitos de UX
- Mostrar mensagens gerais (`generalError`) quando a API não retornar mensagens de campo.
- Para campos relacionados (discipulador, novo convertidos) carregar listas no `onMounted` e mostrar um placeholder `Selecione`.

Boas práticas
- Evitar lógica de negócio complexa nos componentes — extrair para helpers em `src/api` ou stores.
- Manter nomes de variáveis autoexplicativos e evitar abreviações obscuras.

Adendo: OpenAPI
- O OpenAPI gerado apresenta schemas como `ContatoNovoConvertidoCreate` e `ContatoNovosConvertidosAcoesCreate`. Use os nomes de campo exatamente como no schema ao serializar os payloads.
