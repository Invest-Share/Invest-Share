import request from 'supertest';
import app from '../src/utils/app';
import db from '../src/db/investWithFriendsDb';

describe('Test for User Related Endpoints', () => {
  const newUser = {
    firstName: 'test',
    lastName: 'login',
    email: 'test@login.com',
    password: 'testlogin',
  };

  afterAll((done) => {
    db.query(
      `
      DELETE FROM users
      WHERE email=$1
    `,
      [newUser.email]
    )
      .then(() => done())
      .catch(() => {
        throw new Error('Error encounted when cleaning up the test database.');
      });
  });

  describe('POST /signup', () => {
    it('sign up the user and return the created user information', async () => {
      const response = await request(app).post('/api/signup').send({
        userData: newUser,
      });

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        id: expect.any(Number),
        firstName: 'test',
        lastName: 'login',
        email: 'test@login.com',
      });
    });

    it('return error if the email already exists for another user', async () => {
      const response = await request(app).post('/api/signup').send({
        userData: newUser,
      });

      expect(response.status).toEqual(400);
    });
  });

  describe('POST /login', () => {
    it("can login with correct crediential and return the user's informaiton", async () => {
      const response = await request(app).post('/api/login').send({
        userData: newUser,
      });

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        id: expect.any(Number),
        firstName: 'test',
        lastName: 'login',
        email: 'test@login.com',
        password: '',
        token: expect.any(String),
      });
    });

    it('cannot login with incorrect crediential', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          userData: { ...newUser, ...{ password: 'incorrectPW' } },
        });

      expect(response.status).toEqual(400);
    });
  });
});
