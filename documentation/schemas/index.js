const user = require('./user');

module.exports = {
  ...user,
  Error: {
    type: 'object',
    properties: {
      status: {
        type: 'integer'
      },
      errors: {
        type: 'object',
        properties: {
          email: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          password: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          first_name: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          last_name: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};
