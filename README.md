# Banco XYZ 🏦

Banco XYZ é uma aplicação simples que simula funcionalidades básicas de um banco digital. Com esta aplicação, você pode:
- Fazer login com suas credenciais.
- Visualizar o saldo e uma lista de transferências na página inicial.
- Realizar transferências através de um modal acessível na página de listagem de transferências.
- Visualizar informações do perfil, como nome e e-mail.

## Funcionalidades Principais
1. **Login**
   - Interface para autenticação de usuários.

2. **Exibição de saldo atual**
   - Lista de transferências realizadas.
   - Modal para realizar novas transferências.

3. **Página de Perfil**
   - Exibição de informações do usuário logado, incluindo:
     - Nome.
     - E-mail.

## Requisitos
- Node.js (versão 22.12.0 ou superior)

## Instalação
1. Clone o repositório:
```
git clone git@github.com:GiovannyFialho/banco-xyz.git
```
```
cd banco-xyz
```

2. Instale as dependências:
```
npm install
```

## Rodar o Projeto
1. Ambiente de desenvolvimento:
```
npm run dev
```
2. O servidor será iniciado em:
```
http://localhost:5173
```

## Tecnologias Utilizadas
- **Frontend:** React.js + TypeScript
- **Estilização:** Tailwind CSS + Shadcn/ui

## Testes
O projeto inclui testes automatizados para garantir a qualidade do código. Existem dois tipos de testes:

### Testes Unitários (Componentes)
Os testes unitários são realizados com o Vitest e Testing Library.

#### Comandos para Rodar os Testes Unitários:
- **Rodar todos os testes unitários:**
  ```
  npm run test:component
  ```
- **Rodar os testes unitários e aguardar modificações:**
  ```
  npm run test:component:watch
  ```

### Testes E2E (End-to-End)
Os testes E2E são realizados com o Cypress.

#### Comandos para Rodar os Testes E2E:
- **Abrir o Cypress com interface gráfica:**
  ```
  npm run test:e2e:open
  ```
- **Rodar os testes E2E em background (sem interface):**
  ```
  npm run test:e2e:run
  ```

Com esses comandos, você pode garantir que os componentes do frontend estão funcionando corretamente e que a interação geral da aplicação também está sendo validada.
