const logger = require('../../logger');
const { User } = require('../../models');
const { validate } = require('../validations/user_validation');
const { encriptionPassword } = require('../../helpers/encription_password');

exports.registerController = {
  create: async (req, res) => {
    await validate(req.query)
      .then(() => {
        req.query.password = encriptionPassword(req.query.password);
        return User.create(req.query);
      })
      .then(user => {
        logger.info(user.firstName);
        res.json(`Welcome ${user.lastName} ${user.firstName} `);
      })
      .catch(err => {
        logger.error(err);
        if (err.status === 422) res.status(err.status).json(err);
        res.status(500).json('Internal server error');
      });
  }
};
