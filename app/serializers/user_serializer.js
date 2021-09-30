const serializer = require('express-serializer');

const attributes = (_, user) => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});

module.exports = (req, user) => serializer(req, user, attributes);
