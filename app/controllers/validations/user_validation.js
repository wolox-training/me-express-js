const { User } = require('../../models');

const returnedPromise = (conditional, message) => (conditional ? Promise.resolve() : Promise.reject(message));

const validateFormatEmail = email => {
  const regex = /^[a-z]+[.a-z]+@wolox+(.com.ar|.co)$/;
  return returnedPromise(regex.test(email || ''), 'format invalid');
};

const validateExistsEmail = email =>
  User.findOne({ where: { email } }).then(user => returnedPromise(user === null, 'it already exists'));

const validatePassword = password => {
  const regex = /^[a-zA-z0-9]{8,200}$/;
  return returnedPromise(regex.test(password || ''), 'only alphanumeric and greater than 7 characters');
};

exports.validate = async req => {
  const { email, password, firstName, lastName } = req;

  const error = { status: 422, errors: {} };
  const emailError = await validateFormatEmail(email)
    .then(() => validateExistsEmail(email))
    .catch(err => err);

  const passwordError = await validatePassword(password).catch(err => err);

  const firstNameError = firstName ? null : 'not empty';
  const lastNameError = lastName ? null : 'not empty';

  return new Promise((resolve, reject) => {
    if (emailError || passwordError || firstNameError || lastNameError) {
      error.errors.email = [emailError];
      error.errors.password = [passwordError];
      error.errors.firstName = [firstNameError];
      error.errors.lastNameError = [lastNameError];
      return reject(error);
    }
    return resolve();
  });
};
