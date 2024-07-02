<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

---

Problema
Atualmente, a maior parte de professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica.
Para solucionar esse problema, nós utilizamos os conhecimentos adquiridos na última fase para auxiliar a nossa comunidade com a criação de uma aplicação de blogging dinâmico, utilizando a plataforma OutSystems. A plataforma foi um sucesso e, agora, nossa aplicação vai escalar para um panorama nacional. Portanto, precisaremos refatorar nosso Back-end, utilizando a plataforma de desenvolvimento node.js, e precisaremos persistir esses dados em um banco de dados, seja ele SQL ou NoSQL, de acordo com a decisão do grupo.

Requisitos Funcionais
Os seguintes endpoints REST serão implementados para a aplicação de blogging:

GET /posts
Lista de Posts: Este endpoint permitirá aos alunos visualizarem uma lista de todos os posts disponíveis na página principal.

GET /posts/:id
Leitura de Posts: Ao acessar este endpoint com um ID específico de post, os alunos poderão ler o conteúdo completo desse post.

POST /posts
Criação de Postagens: Permite que professores criem novas postagens. Este endpoint aceitará dados como título, conteúdo e autor no corpo da requisição.

PUT /posts/:id
Edição de Postagens: Usado para editar uma postagem existente. Professores deverão fornecer o ID do post que desejam editar e os novos dados no corpo da requisição.

GET /posts/admin
Listagem de Todas as Postagens (Visão Administrativa): Este endpoint permitirá que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.

DELETE /posts/:id
Exclusão de Postagens: Permite que professores excluam uma postagem específica, usando o ID do post como parâmetro.

GET /posts/search
Busca de Posts: Este endpoint permitirá a busca de posts por palavras-chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo.

Requisitos Técnicos

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

Todos os endpoints que modificam dados (POST, PUT, DELETE) devem incluir autenticação e autorização adequadas para garantir que apenas usuários autorizados (professores) possam realizar essas operações.

Entrega

- Código-Fonte: repositório GitHub com o código do projeto, incluindo Dockerfiles e scripts de CI/CD.
- Apresentação Gravada: demonstração em vídeo do funcionamento da aplicação, incluindo deta- Ihes técnicos de implementação.
- Documentação: documento descrevendo a arquitetura do sistema, uso da aplicação e relato de experiências e desafios enfrentados pela equipe durante o desenvolvimento.

1. Criar projeto Nest.js com express.ja
2. Criar módulo de usuário e de postagens
3. Criar Banco de dados (Postgres) usando Docker - Dados padronizados trabalhando bem em uma estrutura rígida
4. Criar Exceções, filtros, pipes, etc... 5. Segurança (guard + jwt) 6. Github Action

rodar npm i
criar .env seguindo o .env.example
criar imagem do postgres no docker
criar database no postgres via DBeaver. Usar mesmo nome definido na env POSTGRES_DB

create table "user"(
id serial primary key,
username varchar(255) not null,
email varchar(255) not null,
password varchar(255) not null,
role varchar(255) not null
);

create table post (
id uuid primary key,
title varchar(255) not null,
description text,
rating int,
date date not null,
user_id int not null,
foreign key (user_id) references "user" (id) on delete cascade
);
