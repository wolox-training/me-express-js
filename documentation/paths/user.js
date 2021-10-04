module.exports = {
  '/users': {
    post: {
      tags: ['Sign up operation'],
      description: 'Register user',
      operationId: 'registerUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserRequest'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'New user register',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        422: {
          description: 'Unprocessable Entity',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 422,
                errors: {
                  email: ['format invalid'],
                  password: ['only alphanumeric and greater than 7 characters'],
                  first_name: ['not empty'],
                  last_name: ['not empty']
                }
              }
            }
          }
        }
      }
    }
  }
};
