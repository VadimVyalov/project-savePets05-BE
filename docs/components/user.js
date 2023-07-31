module.exports = {
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
            description: "User name",
            example: "Test01",
          },
          email: {
            type: "string",
            description: "User email",
            example: "test01@mail.com",
          },
        },
      },
      token: {
        type: "object",
        properties: {
          access: {
            type: "string",
            description: "access token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZmMWI1MDdlNzkzNjBkNWY0ZGMwOCIsImlhdCI6MTY5MDc1OTYwNSwiZXhwIjoxNjkwNzYyNjA1fQ.gyAgBYmlTdp9cVSa3oMwatrOrSv6aZwUUbqdZHXAVMA",
          },
          refresh: {
            type: "string",
            description: "refresh token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZmMWI1MDdlNzkzNjBkNWY0ZGMwOCIsImlhdCI6MTY5MDc1OTYwNSwiZXhwIjoxNjkwNzY1NjA1fQ.uK3wpExqevXtwZlkbt4VicYWuWz9lXYF6CrhNQhnowE",
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
        description: "User password",
        example: "A123456a",
      },
    },
  },
  LoginResponse: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "User name",
            example: "Test01",
          },
          email: {
            type: "string",
            description: "User email",
            example: "test01@mail.com",
          },
        },
      },
      token: {
        type: "object",
        properties: {
          access: {
            type: "string",
            description: "access token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZmMWI1MDdlNzkzNjBkNWY0ZGMwOCIsImlhdCI6MTY5MDc1OTYwNSwiZXhwIjoxNjkwNzYyNjA1fQ.gyAgBYmlTdp9cVSa3oMwatrOrSv6aZwUUbqdZHXAVMA",
          },
          refresh: {
            type: "string",
            description: "refresh token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZmMWI1MDdlNzkzNjBkNWY0ZGMwOCIsImlhdCI6MTY5MDc1OTYwNSwiZXhwIjoxNjkwNzY1NjA1fQ.uK3wpExqevXtwZlkbt4VicYWuWz9lXYF6CrhNQhnowE",
          },
        },
      },
    },
  },
  RefreshResponse: {
    type: "object",
    properties: {
      token: {
        type: "object",
        properties: {
          access: {
            type: "string",
            description: "access token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZmMWI1MDdlNzkzNjBkNWY0ZGMwOCIsImlhdCI6MTY5MDc1OTYwNSwiZXhwIjoxNjkwNzYyNjA1fQ.gyAgBYmlTdp9cVSa3oMwatrOrSv6aZwUUbqdZHXAVMA",
          },
          refresh: {
            type: "string",
            description: "refresh token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZmMWI1MDdlNzkzNjBkNWY0ZGMwOCIsImlhdCI6MTY5MDc1OTYwNSwiZXhwIjoxNjkwNzY1NjA1fQ.uK3wpExqevXtwZlkbt4VicYWuWz9lXYF6CrhNQhnowE",
          },
        },
      },
    },
  },
};
