# Caminho da Fé — Frontend

Projeto Vue 3 + Vite + Tailwind minimal criado para integrar com a API local.

Scripts úteis:

- `npm run dev` — inicia dev server
- `npm run gen:openapi` — gera `src/api/openapi-types.ts` a partir de `http://localhost:8000/openapi.json` (usa `openapi-typescript` via npx)

Instalação:

```bash
cd caminho-da-fe-frontend
npm install
npm run gen:openapi
npm run dev
```
