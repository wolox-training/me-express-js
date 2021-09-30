module.exports = user => ({
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  password: user.password
});
