import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { sample } from 'rxjs';

// User Objects
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

// User Helper Functions
async function createUser(app, user) {
  await request(app.getHttpServer())
    .post('/user')
    .send(user);

  const userJson = await request(app.getHttpServer())
    .get('/user?email=' + user.email)

  return userJson.body
}

async function deleteUser(app, user) {
  await request(app.getHttpServer())
    .delete('/user?email=' + user.email)
    .expect(200);
}

// Posts objects
const samplePost = {
  "title": "This is a sample post title",
  "content": "This is a sample post content.",
  "id": "682fc099-534c-41ff-a8f9-eec9942b5fd0"
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


  it('[GET] /posts should return status 401 UNAUTHORIZED if auth not provided', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(401)
  });

  it('[GET] /posts should return status 200 OK and an array of posts if student auth is provided', async () => {

    await createUser(app, randomStudent);

    const loginStudent = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomStudent.email,
      "password": randomStudent.password
    });

    const response = await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${loginStudent.body.access_token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    await deleteUser(app, randomStudent);

  });

  it('[GET] /posts should return status 200 OK and an array of posts if teacher auth is provided', async () => {

    await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });


    const response = await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    await deleteUser(app, randomTeacher);

  });

  it('[POST] /posts should return status 403 FORBIDDEN if student auth is provided', async () => {

    await createUser(app, randomStudent);

    const loginStudent = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomStudent.email,
      "password": randomStudent.password
    });

    await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginStudent.body.access_token}`)
      .expect(403);

    await deleteUser(app, randomStudent);
  });
  
  it('[POST] /posts should return status 400 BAD REQUEST if provided teacher credentials but not body', async () => {
    await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .expect(400);

    await deleteUser(app, randomTeacher);
  });

  it('[POST] /posts should return status 201 CREATED if teacher credentials and complete body provided', async () => {
    const teacherJSON = await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    const response = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({...samplePost, "user_id": teacherJSON.id})

    expect(response.status).toBe(201);

    await deleteUser(app, randomTeacher);
  });
  
  it('[GET] /posts/id should return status 200 and the body with post data if valid credentials', async () => {
    // Teacher creating the post
    const teacherJSON = await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    const postResponse = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({...samplePost, "user_id": teacherJSON.id})

    // Teacher accessing the post
    const postTeacherRead = await request(app.getHttpServer())
      .get('/posts/' + samplePost.id)
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`);

    expect(postTeacherRead.status).toBe(200)
    expect(postTeacherRead.body.id).toBe(samplePost.id)
    expect(postTeacherRead.body.title).toBe(samplePost.title)
    expect(postTeacherRead.body.content).toBe(samplePost.content)

    // Student accessing the post
    await createUser(app, randomStudent);

    const loginStudent = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomStudent.email,
      "password": randomStudent.password
    });

    const studentResponse = await request(app.getHttpServer())
    .get('/posts/' + samplePost.id)
    .set('Authorization', `Bearer ${loginStudent.body.access_token}`)

    expect(studentResponse.status).toBe(200)
    expect(studentResponse.body.id).toBe(samplePost.id)
    expect(studentResponse.body.title).toBe(samplePost.title)
    expect(studentResponse.body.content).toBe(samplePost.content)

    await deleteUser(app, randomTeacher);
    await deleteUser(app, randomStudent);

  });
  
  it('[DELETE] /posts/id should return 403 FORBIDDEN if student credentials provided', async () => {
    // Teacher creating the post
    const teacherJSON = await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    const postResponse = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({...samplePost, "user_id": teacherJSON.id});

    // Student deleting the post
    await createUser(app, randomStudent);

    const loginStudent = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomStudent.email,
      "password": randomStudent.password
    });

    const studentResponse = await request(app.getHttpServer())
    .delete('/posts/' + samplePost.id)
    .set('Authorization', `Bearer ${loginStudent.body.access_token}`);

    expect(studentResponse.status).toBe(403);

    await deleteUser(app, randomTeacher);
    await deleteUser(app, randomStudent);
  });

  it('[DELETE] /posts/id should return 200 OK and delete post from database if teacher credentials provided', async () => {
    // Teacher creating the post
    const teacherJSON = await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    const postResponse = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({...samplePost, "user_id": teacherJSON.id});

    // Teacher deleting the post
    const response = await request(app.getHttpServer())
    .delete('/posts/' + samplePost.id)
    .set('Authorization', `Bearer ${loginTeacher.body.access_token}`);

    expect(response.status).toBe(200);

    // Trying to find the post again
    await request(app.getHttpServer())
      .get('/posts/' + samplePost.id)
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .expect(404);

    await deleteUser(app, randomTeacher);
  });
  
  it('[PUT] should return 403 FORBIDDEN if student credentials provided', async () => {
    // Teacher creating the post
    const teacherJSON = await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    const postResponse = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({...samplePost, "user_id": teacherJSON.id});

    // Student updating the post
    await createUser(app, randomStudent);

    const loginStudent = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomStudent.email,
      "password": randomStudent.password
    });

    const studentResponse = await request(app.getHttpServer())
    .put('/posts/' + samplePost.id)
    .set('Authorization', `Bearer ${loginStudent.body.access_token}`);


    expect(studentResponse.status).toBe(403);

    await deleteUser(app, randomTeacher);
    await deleteUser(app, randomStudent);
  });
  
  it('[PUT] should return 400 BAD REQUEST if teacher credentials provided but not body', async () => {
    // Teacher creating the post
    const teacherJSON = await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    const postResponse = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({...samplePost, "user_id": teacherJSON.id});

    const putResponse = await request(app.getHttpServer())
      .put('/posts/' + samplePost.id)
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`);

    expect(putResponse.status).toBe(400)

    await deleteUser(app, randomTeacher);
  });
  
  it('[PUT] should return 200 OK if teacher credentials provided and proper body', async () => {
    // Teacher creating the post
    const teacherJSON = await createUser(app, randomTeacher);

    const loginTeacher = await request(app.getHttpServer())
    .post('/auth')
    .send({
      "email": randomTeacher.email,
      "password": randomTeacher.password
    });

    const postResponse = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({...samplePost, "user_id": teacherJSON.id});

    const putResponse = await request(app.getHttpServer())
      .put('/posts/' + samplePost.id)
      .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)
      .send({
        "title": "new title"
      })

    expect(putResponse.status).toBe(200)

    const getResponse = await request(app.getHttpServer())
    .get('/posts/' + samplePost.id)
    .set('Authorization', `Bearer ${loginTeacher.body.access_token}`)

    expect(getResponse.body.title).toBe('new title')

    await deleteUser(app, randomTeacher);
  });
});