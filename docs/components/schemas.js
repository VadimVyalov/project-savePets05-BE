module.exports = {
  schemas: {
    RegistrationRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        name: {
          type: "string",
          description: "User's name",
          example: "User",
        },
        email: {
          type: "string",
          description: "User's email",
          example: "user@mail.com",
        },
        password: {
          type: "string",
          description: "User's password",
          example: "A123456a",
        },
      },
    },
    RegistrationResponse: {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "User's name",
              example: "User",
            },
            email: {
              type: "string",
              description: "User's email",
              example: "user@mail.com",
            },
          },
        },
      },
    },
    LoginRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          description: "User email",
          example: "user@mail.com",
        },
        password: {
          type: "string",
          description: "User's password",
          example: "A123456a",
        },
      },
    },
    LoginResponse: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "User's email",
          example: "user@mail.com",
        },
        token: {
          type: "object",
          properties: {
            access: {
              type: "string",
              description: "Token",
            },
            refresh: {
              type: "string",
              description: "Token",
            },
          },
        },
      },
    },
  },
};
