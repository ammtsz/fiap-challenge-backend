# Diretrizes

## Problema

Atualmente, a maior parte de professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica.
Para solucionar esse problema, nós utilizamos os conhecimentos adquiridos na última fase para auxiliar a nossa comunidade com a criação de uma aplicação de blogging dinâmico, utilizando a plataforma OutSystems. A plataforma foi um sucesso e, agora, nossa aplicação vai escalar para um panorama nacional. Portanto, precisaremos refatorar nosso Back-end, utilizando a plataforma de desenvolvimento node.js, e precisaremos persistir esses dados em um banco de dados, seja ele SQL ou NoSQL, de acordo com a decisão do grupo.

## Requisitos Funcionais

Os seguintes endpoints REST serão implementados para a aplicação de blogging:

- **GET /posts** \
  Lista de Posts: Este endpoint permitirá aos alunos visualizarem uma lista de todos os posts disponíveis na página principal.

- **GET /posts/:id** \
  Leitura de Posts: Ao acessar este endpoint com um ID específico de post, os alunos poderão ler o conteúdo completo desse post.

- **POST /posts** \
  Criação de Postagens: Permite que professores criem novas postagens. Este endpoint aceitará dados como título, conteúdo e autor no corpo da requisição.

- **PUT /posts/:id** \
  Edição de Postagens: Usado para editar uma postagem existente. Professores deverão fornecer o ID do post que desejam editar e os novos dados no corpo da requisição.

- **GET /posts/admin** \
  Listagem de Todas as Postagens (Visão Administrativa): Este endpoint permitirá que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.

- **DELETE /posts/:id** \
  Exclusão de Postagens: Permite que professores excluam uma postagem específica, usando o ID do post como parâmetro.

- **GET /posts/search** \
  Busca de Posts: Este endpoint permitirá a busca de posts por palavras-chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo.

## Requisitos Técnicos

Back-end em Node.js:

<!-- Nest.js com express -->

- Implementação do servidor usando Node.js.
- Utilização de frameworks como Express para roteamento e middleware.

Persistência de Dados:

<!-- PostgreSQL -->

- Utilização de um sistema de banco de dados (por exemplo, MongoDB, PostgreSQL).
- Implementação de modelos de dados adequados para as postagens.

Containerização com Docker:

- Desenvolvimento e implantação usando contêineres Docker para garantir consistência entre ambientes de desenvolvimento e produção.

Automação com GitHub Actions:

- Configuração de workflows de CI/CD para automação de testes e deploy.

Documentação:

<!-- README.md -->

- Documentação técnica detalhada do projeto, incluindo setup inicial, arquitetura da aplicação e guia de uso das APIs.

Cobertura de Testes:

<!-- TDD -->

- O projeto deve garantir que pelo menos 30% do código seja coberto por testes unitários. Essa medida é essencial para assegurar a qualidade e a estabilidade do código, especialmente em funções críticas como criação, edição e exclusão de postagens.

<!-- JWT e BCrypt -->

_Todos os endpoints que modificam dados (POST, PUT, DELETE) devem incluir autenticação e autorização adequadas para garantir que apenas usuários autorizados (professores) possam realizar essas operações._

## Entrega

- Código-Fonte: repositório GitHub com o código do projeto, incluindo Dockerfiles e scripts de CI/CD.
- Apresentação Gravada: demonstração em vídeo do funcionamento da aplicação, incluindo deta- Ihes técnicos de implementação.
- Documentação: documento descrevendo a arquitetura do sistema, uso da aplicação e relato de experiências e desafios enfrentados pela equipe durante o desenvolvimento.

# Inicializando o projeto

Esta aplicação foi transformada em um container contendo a aplicação em si e o PostgreSQL. Antes de iniciar a aplicação, é preciso criar um arquivo `.env` conforme sugestão em `.env.example`, ou conforme sugestão abaixo, que inclui a parametrização utilizada no docker compose:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=challenge
JWT_SECRET=mysecret
```

Para iniciar a aplicação, basta executar:

```bash
$ docker compose up
```

Após inicialização, a aplicação estará recebendo requisições na porta 3000.

## Rodando o Projeto em NestJS

Caso queira executar a aplicação apenas, os seguintes passos devem ser seguidos:

- Criar arquivo `.env` seguindo o exemplo de `.env.example`

### Instalar os pacotes necessários

```bash
$ npm install
```

### Subir uma instância ou ter o banco de dados PostgreSQL rodando localmente. 

Se desejar, pode utilizar o docker compose também. Sugerimos o uso do container docker db pois na inicialização ele já implementa o script `init.sql` que cria as tabelas necessárias para a aplicação e adiciona alguns registros de exemplo.

```bash
$ docker compose up db
```

### Instalar os pacotes necessários

```bash
$ npm install
```

### Rodar a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
