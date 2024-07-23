import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// Random users
const randomStudentUsername = "random_" + (Math.random() + 1).toString(36).substring(6);
const randomStudent = {
  "username": randomStudentUsername,
  "email": randomStudentUsername + "@mail.com",
  "password": "senha",
  "role": "student"
}

const randomTeacherUsername = "random_" + (Math.random() + 1).toString(36).substring(6);
const randomTeacher = {
  "username": randomTeacherUsername,
  "email": randomTeacherUsername + "@mail.com",
  "password": "senha",
  "role": "teacher"
}

// Helper functions
async function createUser(app: INestApplication, user: any) {
  await request(app.getHttpServer())
    .post('/user')
    .send(user);
}

async function deleteUser(app: INestApplication, user: any) {
  await request(app.getHttpServer())
      .delete('/user?email=' + user.email)
      .expect(200);
}


describe('PostsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });



  it('[GET] /auth should return 404 NOT FOUND', () => {
    return request(app.getHttpServer())
      .get('/auth')
      .expect(404)
  });

  it('[POST] /auth should return 400 if body not provided', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .expect(400)
  });

  it('[POST] /auth should return status 201 CREATED and a token if correct credentials', async () => {

    // Creating user for testing
    await createUser(app, randomStudent)

    const login = await request(app.getHttpServer())
      .post('/auth')
      .send({
        "email": randomStudent.email,
        "password": randomStudent.password
      });

    expect(login.status).toBe(201);
    expect(login.body.access_token).toBeDefined();

    // Deleting test user from database
    await deleteUser(app, randomStudent)

  });

  it('[POST] /auth should return status 401 UNAUTHORIZED if wrong credentials', async () => {
    createUser(app, randomStudent)

    // Wrong user and password
    await request(app.getHttpServer())
      .post('/auth')
      .send({
        "email": randomStudent.username + '@wrongmail.com',
        "password": "wrongpass"
      })
      .expect(401);

    // Wrong password only
    await request(app.getHttpServer())
      .post('/auth')
      .send({
        "email": randomStudent.email,
        "password": "wrongpass"
      })
      .expect(401);

    deleteUser(app, randomStudent)

  });
});