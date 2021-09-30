const { factory } = require('factory-girl');
const faker = require('faker');

const { User } = require('../../app/models');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

factory.define('users', User, {
  firstName,
  lastName,
  email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@wolox.com.ar`,
  password: '12345678'
});

module.exports = {
  attributes: params => factory.attrs('users', params),
  create: params => factory.create('users', params)
};
