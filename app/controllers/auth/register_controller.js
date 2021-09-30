const logger = require('../../logger');
const userMapper = require('../../mappers/user_mapper');
const userSerializer = require('../../serializers/user_serializer');

const { User } = require('../../models');
const { validate } = require('../validations/user_validation');
const { encriptionPassword } = require('../../helpers/encription_password');

exports.registerController = {
  create: async (req, res) => {
    const userMapped = userMapper(req.body);
    await validate(userMapped)
      .then(() => {
        userMapped.password = encriptionPassword(userMapped.password);
        return User.create(userMapped);
      })
      .then(userCreated => {
        logger.info(userCreated.firstName);
        return userSerializer(req, userCreated);
      })
      .then(user => res.send(user))
      .catch(err => {
        logger.error(err);
        if (err.status === 422) return res.status(err.status).json(err);
        return res.status(500).json('Internal server error');
      });
  }
};
