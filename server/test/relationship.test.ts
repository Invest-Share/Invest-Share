import request from 'supertest';
import app from '../src/utils/app';
import db from '../src/db/investWithFriendsDb';

describe('Test for Relationship Related Endpoints', () => {
  const userId = 1;
  const firstName = 'test';
  const lastName = '1';

  afterAll((done) => {
    db.query(
      `
      DELETE FROM relationships AS r
      USING users AS u
      WHERE r.follow_id = u.user_id AND r.user_id = $1 AND u.first_name = $2 AND u.last_name = $3;
    `,
      [userId, firstName, lastName]
    )
      .then(() => done())
      .catch((err) => {
        console.log('ERROR: ', err);
        throw new Error('Error encounted when cleaning up the test database.');
      });
  });

  describe('GET /relationships/:id', () => {
    it('should return an array of all relationships of the user', async () => {
      const response = await request(app).get(`/api/relationships/${userId}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(2);
      expect(response.body[0]).toMatchObject({
        user_id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
      });

      const firstRelationship = response.body.find(
        (relationship: any) => relationship.first_name === 'Upasana'
      );
      expect(firstRelationship).not.toBeUndefined();

      const secondRelationship = response.body.find(
        (relationship: any) => relationship.first_name === 'David'
      );
      expect(secondRelationship).not.toBeUndefined();
    });
  });

  describe('POST /addRelationship', () => {
    it('should reject the request if the payload is not valid', async () => {
      const response = await request(app)
        .post('/api/addRelationship')
        .send({ user_id: '1', first_name: firstName, last_name: lastName });

      expect(response.status).toEqual(400);
    });

    it('should add the new relationship and then return an array of all relationships of the user', async () => {
      const response = await request(app)
        .post('/api/addRelationship')
        .send({ user_id: userId, first_name: firstName, last_name: lastName });

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(3);
      expect(response.body[0]).toMatchObject({
        user_id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
      });

      const addedRelationship = response.body.find(
        (relationship: any) =>
          relationship.first_name === firstName &&
          relationship.last_name === lastName
      );
      expect(addedRelationship).not.toBeUndefined();
    });
  });
});
