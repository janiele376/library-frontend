# Altis Library — Frontend

O **Altis Library** é um sistema web de gerenciamento de bibliotecas, desenvolvido com **Vue 3, TypeScript e Quasar Framework**, com o objetivo de facilitar a administração de livros, editoras, usuários e empréstimos.

A aplicação oferece uma interface responsiva, suporte a múltiplos idiomas, autenticação de usuários e gerenciamento de permissões.

O frontend é integrado a uma API REST desenvolvida com **Java e Spring Boot**, seguindo uma arquitetura modular baseada na separação de responsabilidades, reutilização de componentes e organização do código.

## Tecnologias Utilizadas

| Tecnologia       | Finalidade                                       |
| ---------------- | ------------------------------------------------ |
| Vue 3            | Desenvolvimento da interface com Composition API |
| TypeScript       | Tipagem estática e segurança do código           |
| Quasar Framework | Componentes visuais e responsividade             |
| Pinia            | Gerenciamento de estado global                   |
| Vue Router       | Navegação e gerenciamento de rotas               |
| Vue I18n         | Internacionalização                              |
| Axios            | Comunicação com a API REST                       |
| CSS3             | Estilização personalizada                        |
| PNPM             | Gerenciamento de dependências                    |

## Funcionalidades

### Autenticação

- Cadastro de usuários.
- Login com e-mail e senha.
- Recuperação de senha.
- Gerenciamento de sessão.
- Proteção de rotas.
- Controle de acesso conforme as permissões do usuário.

### Gerenciamento de Livros

- Cadastro de novos livros.
- Listagem de livros cadastrados.
- Edição de informações.
- Exclusão de livros.
- Associação de livros a editoras.
- Pesquisa por título.
- Paginação dos resultados.

### Gerenciamento de Editoras

- Cadastro de editoras.
- Consulta de editoras cadastradas.
- Atualização de informações.
- Exclusão de editoras.
- Pesquisa e paginação.

### Gerenciamento de Usuários

- Listagem de usuários cadastrados.
- Pesquisa de usuários.
- Edição de informações.
- Exclusão de usuários.
- Paginação.

### Gerenciamento de Empréstimos

- Registro de empréstimos de livros.
- Consulta de empréstimos.
- Renovação de empréstimos.
- Registro de devoluções.
- Pesquisa e paginação.

### Configurações de Perfil

- Visualização das informações pessoais.
- Atualização de dados cadastrais.
- Alteração de senha.
- Validação dos dados informados.

### Internacionalização

A aplicação possui suporte a três idiomas:

- Português (Brasil).
- Inglês.
- Espanhol.

A internacionalização utiliza o **Vue I18n**, permitindo traduzir textos da interface, formulários, mensagens de validação e notificações.

## Arquitetura e Organização

O projeto utiliza uma arquitetura modular, separando componentes visuais, lógica de negócio, comunicação com a API e gerenciamento de estado.

### Estrutura do Projeto

```text
library-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── boot/
│   ├── components/
│   ├── composables/
│   │   ├── auth/
│   │   ├── books/
│   │   ├── profile/
│   │   ├── publishers/
│   │   ├── rentals/
│   │   └── users/
│   ├── css/
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── stores/
│   ├── types/
│   └── utils/
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── quasar.config.ts
├── tsconfig.json
└── README.md
```

### Responsabilidades dos Diretórios

| Diretório      | Responsabilidade                                  |
| -------------- | ------------------------------------------------- |
| `assets/`      | Recursos estáticos da aplicação                   |
| `boot/`        | Configuração e inicialização de bibliotecas       |
| `components/`  | Componentes reutilizáveis da interface            |
| `composables/` | Lógica reutilizável organizada por funcionalidade |
| `css/`         | Estilos globais                                   |
| `i18n/`        | Configuração e arquivos de tradução               |
| `layouts/`     | Estruturas compartilhadas entre páginas           |
| `pages/`       | Páginas da aplicação                              |
| `router/`      | Configuração das rotas                            |
| `services/`    | Requisições HTTP e integração com a API           |
| `stores/`      | Gerenciamento de estado com Pinia                 |
| `types/`       | Interfaces e tipos TypeScript                     |
| `utils/`       | Funções auxiliares e validações                   |

## Instalação e Execução

### Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- Node.js instalado.
- PNPM instalado.
- Git instalado.
- Backend da aplicação configurado e em execução.

### 1. Clonar o Repositório

```bash
git clone https://github.com/janiele376/library-frontend.git
```

Acesse a pasta do projeto:

```bash
cd library-frontend
```

### 2. Instalar as Dependências

```bash
pnpm install
```

### 3. Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080
```

A variável representa o endereço da API REST utilizada pelo frontend.

**Importante:** verifique o prefixo da variável configurado no Quasar e ajuste a URL conforme o ambiente em que o backend estiver sendo executado.

### 4. Executar em Ambiente de Desenvolvimento

```bash
pnpm dev
```

A aplicação será iniciada no endereço informado pelo servidor de desenvolvimento do Quasar.

## Comandos do Projeto

### Executar o Servidor de Desenvolvimento

```bash
pnpm dev
```

### Verificar o Código com ESLint

```bash
pnpm run lint
```

### Verificar Formatação e Lint

```bash
pnpm run lint:check
```

### Gerar a Versão de Produção

```bash
pnpm exec quasar build
```

O processo de build gera os arquivos necessários para disponibilizar a aplicação em um ambiente de produção.

## Integração com o Backend

O frontend foi desenvolvido para consumir uma API REST construída com as seguintes tecnologias:

- Java.
- Spring Boot.
- Spring Security.
- PostgreSQL.

A comunicação entre frontend e backend é realizada utilizando o **Axios**.

As requisições HTTP são centralizadas em arquivos de serviço, evitando que os componentes visuais dependam diretamente dos detalhes de comunicação com a API.

A autenticação utiliza tokens enviados nas requisições aos endpoints protegidos.

## Padrões e Boas Práticas

Durante o desenvolvimento, foram adotadas práticas voltadas à organização, reutilização e manutenção do código.

### Componentização

A interface é dividida em componentes reutilizáveis, reduzindo a duplicação de código e facilitando a manutenção.

### Composition API e Composables

A lógica dos componentes é organizada utilizando a Composition API do Vue 3.

Os composables permitem reutilizar comportamentos relacionados a formulários, validações, carregamento de dados, paginação e operações de gerenciamento.

### Separação de Responsabilidades

O projeto busca manter uma divisão clara entre:

- **Componentes:** apresentação e interação com o usuário.
- **Composables:** estados e lógica reutilizável.
- **Services:** comunicação com o backend.
- **Stores:** gerenciamento de estado global.
- **Types:** contratos e tipagem dos dados.
- **Utils:** funções auxiliares.

### Tipagem Estática

O TypeScript é utilizado para definir interfaces, contratos de dados e tipos, contribuindo para a identificação de erros durante o desenvolvimento.

### Tratamento de Erros

A aplicação apresenta notificações de sucesso e erro durante operações como cadastro, edição, exclusão e comunicação com a API.

### Internacionalização

Os textos da aplicação são centralizados em arquivos de tradução, facilitando a manutenção e a inclusão de novos idiomas.

## Objetivo do Projeto

O Altis Library foi desenvolvido para aplicar conhecimentos de desenvolvimento web em um sistema de gerenciamento de bibliotecas.

O projeto contempla conceitos como:

- Desenvolvimento de aplicações SPA.
- Integração com APIs REST.
- Autenticação e autorização.
- Operações CRUD.
- Gerenciamento de estado.
- Validação de formulários.
- Internacionalização.
- Organização modular.
- Desenvolvimento de interfaces responsivas.

Além das funcionalidades implementadas, o projeto prioriza uma estrutura de código organizada, reutilizável e de fácil manutenção.

## Repositório

**Frontend:** https://github.com/janiele376/library-frontend
