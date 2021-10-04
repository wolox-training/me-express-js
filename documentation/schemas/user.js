module.exports = {
  userId: {
    type: 'integer',
    example: 7
  },
  userFirstName: {
    type: 'string',
    example: 'tom'
  },
  userLastName: {
    type: 'string',
    example: 'perez'
  },
  userEmail: {
    type: 'string',
    example: 'tom.perez@wolox.com.ar'
  },
  userPassword: {
    type: 'string',
    example: 'abcd1234'
  },
  UserRequest: {
    type: 'object',
    properties: {
      first_name: {
        $ref: '#/components/schemas/userFirstName'
      },
      last_name: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      }
    }
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/userId'
      },
      first_name: {
        $ref: '#/components/schemas/userFirstName'
      },
      last_name: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      }
    }
  }
};
