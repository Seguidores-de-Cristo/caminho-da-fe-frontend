# Contexto do Projeto: Caminho da Fé Frontend

Este documento fornece um resumo técnico do projeto para agilizar o desenvolvimento e a integração de novos colaboradores (incluindo IAs).

## 1. Visão Geral

Este é o frontend da aplicação "Caminho da Fé", uma ferramenta para gestão de discipuladores e novos convertidos. A aplicação é um Single Page Application (SPA) construído com Vue.js.

## 2. Stack de Tecnologia

- **Framework Principal:** [Vue.js 3](https://vuejs.org/) (utilizando a sintaxe `<script setup>`)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Roteamento:** [Vue Router](https://router.vuejs.org/)
- **Gerenciamento de Estado:** [Pinia](https://pinia.vuejs.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)

## 3. Estrutura do Projeto

O código-fonte está localizado no diretório `src/`.

- `src/api/`: Contém a configuração do cliente Axios (`client.ts`) e os tipos TypeScript gerados a partir da especificação OpenAPI (`openapi-types.ts`).
- `src/assets/`: Arquivos estáticos, como o CSS principal (`index.css`).
- `src/components/`: Componentes Vue reutilizáveis (ex: `NavBar.vue`).
- `src/router/`: Configuração do Vue Router, incluindo as rotas e os guardas de navegação (`navigation guards`) para controle de acesso.
- `src/stores/`: Módulos de estado do Pinia (ex: `auth.ts` para autenticação).
- `src/views/`: Componentes de página, cada um geralmente associado a uma rota.

## 4. API Backend

- **URL Base:** `http://localhost:8000`
- **Documentação Interativa (ReDoc):** `http://localhost:8000/redoc`
- **Especificação OpenAPI:** `http://localhost:8000/openapi.json`

### Autenticação

A API utiliza autenticação via Token JWT (Bearer Token) obtido através de um fluxo OAuth2 Password Flow no endpoint `/auth/token`.

- O frontend envia `username` e `password` para obter o `access_token`.
- O token é armazenado no `localStorage`.
- O cliente Axios (`src/api/client.ts`) intercepta todas as requisições para injetar o token no cabeçalho `Authorization`.

## 5. Fluxo de Desenvolvimento

- **Instalação:** `npm install`
- **Servidor de Desenvolvimento:** `npm run dev` (disponível em `http://localhost:5173`)
- **Build para Produção:** `npm run build`

### Sincronização com a API

O projeto possui um script para gerar as definições de tipo TypeScript a partir da especificação OpenAPI do backend. **É crucial executar este comando sempre que a API for atualizada.**

- **Comando:** `npm run gen:openapi`
- **Saída:** O arquivo `src/api/openapi-types.ts` é atualizado.

## 6. Funcionalidades (Checklist de Desenvolvimento)

### Módulo de Autenticação
- [x] Tela de Login
- [x] Lógica de autenticação (store/auth.ts)
- [x] Proteção de rotas (router/index.ts)
- [ ] Tela de Logout (atualmente só a lógica existe)
- [ ] Tela de "Esqueci minha senha"

### Módulo de Discipuladores (Usuários)
- [x] Listagem de Discipuladores
- [x] Formulário de Cadastro/Edição de Discipulador

### Módulo de Novos Convertidos
- [x] Listagem de Novos Convertidos
- [x] Formulário de Cadastro/Edição de Novo Convertido
- [ ] Integração com API de CEP para preenchimento de endereço
- [ ] Visualização detalhada do perfil do convertido

### Módulo de Acompanhamento (Contatos)
- [ ] Tela para visualizar os contatos realizados com um Novo Convertido
- [ ] Formulário para registrar um novo contato
- [ ] Formulário para registrar as ações de um contato (convites, etc.)
- [ ] Visualização do histórico de acompanhamento

### Relacionamentos
- [ ] Tela para visualizar os convertidos de um discipulador específico
- [ ] Funcionalidade para vincular/desvincular um convertido de um discipulador