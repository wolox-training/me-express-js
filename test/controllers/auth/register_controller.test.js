const request = require('supertest');

const app = require('../../../app');
const userFactory = require('../../factory/user_factory');
const userMapper = require('../../mappers/user_mapper');

describe('POST /users', () => {
  const attributes = ['email', 'first_name', 'last_name', 'password'];
  let response = '';

  describe('Valid user', () => {
    beforeAll(async done => {
      const user = userMapper(await userFactory.attributes());
      response = await request(app)
        .post('/users')
        .send(user);
      done();
    });

    test('status 201', () => {
      expect(response.statusCode).toBe(200);
    });

    test('response does not contain password', () => {
      expect(response.body.password).toBe(undefined);
    });
  });

  describe('Invalid user', () => {
    describe('without all attributes', () => {
      beforeAll(async done => {
        response = await request(app)
          .post('/users')
          .send('');
        done();
      });

      test('status 422', () => {
        expect(response.statusCode).toBe(422);
      });

      test('response does contain errors messages', () => {
        expect(response.body.errors).not.toBe(undefined);
      });

      test('all attributes contain error message', () => {
        const { errors } = response.body;
        Object.keys(errors).forEach(attr => {
          expect(errors[attr]).not.toHaveLength(0);
        });
      });
    });

    attributes.forEach(attribute => {
      describe(`without ${attribute}`, () => {
        beforeAll(async done => {
          const user = userMapper(await userFactory.attributes());

          delete user[attribute];

          response = await request(app)
            .post('/users')
            .send(user);
          done();
        });

        test('status 422', () => {
          expect(response.statusCode).toBe(422);
        });

        test(`response does contain errors messages of ${attribute}`, () => {
          expect(response.body.errors[attribute]).not.toEqual([null]);
        });

        test('rest of attributes does not contain errors', () => {
          const { errors } = response.body;
          Object.keys(errors).forEach(attr => {
            if (attr !== attribute) {
              expect(errors[attr]).toEqual([null]);
            }
          });
        });
      });
    });

    describe('email already exists', () => {
      beforeAll(async done => {
        const userPersistance = await userFactory.create();
        const user = userMapper(await userFactory.attributes({ email: userPersistance.email }));

        response = await request(app)
          .post('/users')
          .send(user);
        done();
      });

      test('status 422', () => {
        expect(response.statusCode).toBe(422);
      });

      test('response does contain error', () => {
        expect(response.body.errors).not.toBe(undefined);
      });

      test('error message if it already exists', () => {
        const message = response.body.errors.email.toString();
        expect(message).toMatch(/already exists/);
      });
    });
  });
});
