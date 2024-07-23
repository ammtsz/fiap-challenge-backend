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

  it('[GET /user] it should return status 400 due to missing email information', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(400)
  });

  it('[GET /users] should return status 404 because endpoint does not exist', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(404)
  })

  it('[POST /user] without a body should return status 400 bad request.', () => {
    return request(app.getHttpServer())
      .post('/user')
      .expect(400)
  });

  it('[POST /user] with incomplete body should return status 400 bad request', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        "username": "user",
        "email": "user@mail.com"
      })
      .expect(400)
  });

  it('[POST /user] with proper body should return status 201 created', () => {
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
});
