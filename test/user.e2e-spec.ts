import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const randomUser = "random_" + (Math.random() + 1).toString(36).substring(6);
  const randomEmail = randomUser + "@mail.com"

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('[GET /user] it should return status 400 BAD REQUEST due to missing email information', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(400)
  });

  it('[GET /users] should return status 404 NOT FOUND because endpoint does not exist', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(404)
  })

  it('[POST /user] without a body should return status 400 BAD QUEST.', () => {
    return request(app.getHttpServer())
      .post('/user')
      .expect(400)
  });

  it('[POST /user] with incomplete body should return status 400 BAD REQUEST', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        "username": "user",
        "email": "user@mail.com"
      })
      .expect(400)
  });

  it('[POST /user] with proper body should return status 201 CREATED', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        "username": randomUser,
        "email": randomEmail,
        "password": "senha",
        "role": "teacher"
      })
      .expect(201)
  });

  it('[POST] /user with a username that exists should return status 409 CONFLICT', () => {
    return request(app.getHttpServer())
    .post('/user')
    .send({
      "username": randomUser,
      "email": randomEmail,
      "password": "senha",
      "role": "teacher"
    })
    .expect(409)
  });

  it('[GET] /user?email=' + randomEmail + ' should return recently created user (data persistance)', () => {
    return request(app.getHttpServer())
    .get('/user?email=' + randomEmail)
    .expect(200)
  });

  it('[DELETE] /user should return 400 BAD REQUEST if email not provided', async () => {
    return request(app.getHttpServer())
    .delete('/user')
    .expect(400)
  })

  it('[DELETE] /user?email=' + randomEmail + ' should delete user from database', async () => {
    const deleteRequest = await request(app.getHttpServer())
    .delete('/user?email=' + randomEmail)
    .expect(200)

    return request(app.getHttpServer())
    .get('/user?email=' + randomEmail)
    .expect(404)
  });

  it('[PATCH] /user should return 400 BAD REQUEST if email not provided', async () => {
    return request(app.getHttpServer())
    .patch('/user')
    .expect(400)
  });

  it('[PATCH] /user?email=' + randomEmail + ' should return 400 BAD REQUEST if body not provided', async () => {
    return request(app.getHttpServer())
    .patch('/user?email=' + randomEmail)
    .expect(400)
  });

  it('[PATCH] /user?email=' + randomEmail + ' should return 404 NOT FOUND if email does not exist', async () => {
    return request(app.getHttpServer())
    .patch('/user?email=' + randomEmail)
    .send({
      "username": randomUser,
      "email": randomEmail,
      "password": "senha",
      "role": "teacher"
    })
    .expect(404)
  })
});
