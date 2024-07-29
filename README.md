<h1 align="center">FIAP - Backend Challenge</h1>

<p align="center">
  <a><img src="https://img.shields.io/badge/nestjs-v10.3.10-red"/></a>
  <a><img src="https://img.shields.io/badge/express-v4.19.2-blue"/></a>
  <a><img src="https://img.shields.io/badge/typescript-v5.5.3-yellow"/></a>
  <a><img src="https://img.shields.io/badge/@nestjs/jwt-v10.2.0-green"/></a>
  <a><img src="https://img.shields.io/badge/bcryptjs-v2.4.3-green"/></a>
  <a><img src="https://img.shields.io/badge/@nestjs/typeorm-v10.0.2-orange"/></a>
  <a><img src="https://img.shields.io/badge/pg-v8.12.0-orange"/></a>
  <a><img src="https://img.shields.io/badge/@nestjs/swagger-v7.4.0-grey"/></a>
  <a><img src="https://img.shields.io/badge/zod-v3.23.8-green"/></a>
  <a><img src="https://img.shields.io/badge/jest-v29.7.0-yellowgreen"/></a>
  <a><img src="https://img.shields.io/badge/supertest-v6.3.4-yellowgreen"/></a>
</p>

API para uma plataforma voltada a professores e alunos, onde professores podem publicar postagens visíveis para alunos e demais professores.
O projeto foi desenvolvido utilizando as seguintes tecnologias em destaque:

- **NestJS:** Framework para construir aplicações Node.js escaláveis e eficientes;
- **Express:** Framework para construir aplicações web e APIs em Node.js;
- **TypeScript:** Superconjunto de JavaScript que adiciona tipagem estática opcional;
- **JWT (JSON Web Token):** Padrão para criar tokens de acesso usados na autenticação;
- **bcryptjs:** Biblioteca para hashing seguro de senhas;
- **TypeORM:** ORM para interagir com bancos de dados de forma orientada a objetos;
- **pg:** Cliente PostgreSQL para Node.js;
- **Swagger:** Ferramenta para documentar APIs RESTful;
- **Zod:** Biblioteca de validação de esquemas para TypeScript;
- **Jest:** Framework de testes em JavaScript;
- **Supertest:** Biblioteca para testar APIs HTTP;

# Inicializando o projeto

## Opção 1: Docker

Esta aplicação foi transformada em um container contendo a aplicação em si e o PostgreSQL. Antes de iniciar a aplicação, é preciso criar um arquivo `.env` conforme sugestão em `.env.example`, ou conforme sugestão abaixo, que inclui a parametrização utilizada no docker compose:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=challenge
JWT_SECRET=mysecret
```

### Instalar os pacotes necessários

```bash
$ npm install
```

Para iniciar a aplicação, basta executar:

```bash
$ docker compose up
```

Após inicialização, a aplicação estará recebendo requisições na porta 3000.

## Opção 2: NestJS

Caso queira executar a aplicação apenas, os seguintes passos devem ser seguidos:

- Criar arquivo `.env` seguindo o exemplo de `.env.example`

### Subir uma instância ou ter o banco de dados PostgreSQL rodando localmente

Se desejar, pode utilizar o docker compose também. Sugerimos o uso do container docker db pois na inicialização ele já implementa o script `init.sql` que cria as tabelas necessárias para a aplicação e adiciona alguns registros de exemplo.

```bash
$ docker compose up db
```

### Instalar os pacotes necessários

```bash
$ npm install
```

### Inicializar a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

# Testes

Para rodar os testes unitários, testes end to end e cobertura de testes, basta rodar os respectivos comandos:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Documentação

Documentação completa no [Notion](https://beryl-sushi-951.notion.site/Documenta-o-Tech-Challenge-Fase-2-fc8d0b518132487eacf20929b1ed3a21?pvs=25)

## Swagger

`http://localhost:3000/swagger-ui#/`
