# desafio-zarpon

## Descrição do Desafio

### Critérios avaliativos:

— O projeto deve ser desenvolvido utilizando Vue 3 com Composition API.

— Deve ser utilizado typescript.

— Manter padrão, organização e reutilização de código.

---

### Descrição do projeto:

- Desenvolver interface para CRUD de usuários. [OK]
- O cadastro/edição do usuário deve ser feito por um modal aberto pela listagem. [OK]
  - Deve conter campos de nome, email, telefone, CPF/CNPJ, ganho mensal aproximado, status (ativo/inativo) e dados de endereço. [OK]
  - Não precisa ter conexão com backend, mas os dados cadastrados devem ser salvos em uma **store** (ex: Pinia) para serem exibidos na listagem e deve ser possível a edição dos mesmos. [OK]
  - Ao cadastrar/editar o usuário simular tempo de loading e fazer tratativa de mensagens em sucesso/exceção. [OK]
- A interface deve conter uma listagem com filtros personalizados e ordenação por coluna. [OK]
- A exibição de colunas e layout da interface fica a critério do desenvolvedor. [OK]

---

## Opcionais desejáveis:

- Conter um menu lateral colapsável.
  - Adicionar opções de navegação para outras telas, como configurações, home, etc.
  - As opções adicionais do menu não precisam ter interface, podem ser somente uma tela em branco.
- Conter uma toolbar com avatar e nome do usuário logado.
- Integração com o viacep para pegar dados de endereço a partir do CEP: https://viacep.com.br/
  - Ex de request: [viacep.com.br/ws/01001000/json/](https://viacep.com.br/ws/01001000/json/)

---

### Tooling:

- Vue 3
- Vue Router
- Pinia
- Vite
- TypeScript
- TailwindCSS

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# desafio-zarpon
