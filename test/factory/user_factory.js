const { factory } = require('factory-girl');
const faker = require('faker');

const { User } = require('../../app/models');

const first_name = faker.name.firstName();
const last_name = faker.name.lastName();

factory.define('users', User, {
  first_name,
  last_name,
  email: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@wolox.com.ar`,
  password: '12345678'
});

module.exports = {
  attributes: params => factory.attrs('users', params)
};
