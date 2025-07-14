# Documentação da API

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de aplicações escaláveis e eficientes, utilizando TypeScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, melhorando a robustez do código.
- **Prisma ORM**: Ferramenta de mapeamento objeto-relacional para manipulação do banco de dados de forma tipada e segura.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários.
- **Bcrypt**: Biblioteca para hash e verificação de senhas.
- **ESLint**: Ferramenta de linting para manter a qualidade e padronização do código.
- **Jest**: Framework de testes para garantir a confiabilidade da aplicação.

## Estrutura do Projeto

- `src/app`: Módulo principal da aplicação.
- `src/prisma`: Integração com o Prisma ORM.
- `src/tasks`: CRUD de tarefas (Tasks).
- `src/auth`: Autenticação, geração e validação de tokens JWT.
- `src/users`: Gerenciamento de usuários.
- `src/common`: DTOs, filtros, guards, interceptors e middlewares reutilizáveis.

## Principais Módulos e Métodos

### Usuários (`/users`)

- **POST `/users`**: Criação de usuário.
- **GET `/users`**: Listagem de usuários (com paginação).
- **GET `/users/:id`**: Detalhes de um usuário.
- **PATCH `/users/:id`**: Atualização de dados do usuário.
- **DELETE `/users/:id`**: Remoção de usuário.

### Autenticação (`/auth`)

- **POST `/auth/signin`**: Login do usuário, retorna JWT.
- **Guards**: Protegem rotas utilizando validação do token JWT.

### Tarefas (`/tasks`)

- **POST `/tasks`**: Criação de tarefa.
- **GET `/tasks`**: Listagem de tarefas (com paginação).
- **GET `/tasks/:id`**: Detalhes de uma tarefa.
- **PATCH `/tasks/:id`**: Atualização de tarefa.
- **DELETE `/tasks/:id`**: Remoção de tarefa.

### Middlewares, Guards e Interceptors

- **LoggerMiddleware**: Loga requisições recebidas.
- **AdminGuard**: Restringe acesso a rotas administrativas.
- **LoggerInterceptor**: Loga tempo de execução das requisições.
- **ExceptionFilter**: Tratamento global de exceções.

### DTOs (Data Transfer Objects)

Utilizados para validação e tipagem dos dados recebidos e enviados pela API, garantindo integridade e segurança.

### Prisma

- **PrismaService**: Serviço responsável pela comunicação com o banco de dados.
- **Migrations**: Controle de versões do banco via arquivos em `prisma/migrations`.

## Testes

- **Unitários**: Cobrem regras de negócio dos serviços.
- **E2E**: Testam fluxos completos da API.

## Como rodar o projeto

```bash
npm install
npm run start:dev
```

## Como rodar os testes

```bash
npm run test         # Testes unitários
npm run test:e2e     # Testes end-to-end
npm run test:cov     # Cobertura de testes
```
