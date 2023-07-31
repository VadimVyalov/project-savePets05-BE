module.exports = {
  "/api/users/register": {
    post: {
      tags: ["User CRUD operations"],
      summary: "Register",
      description: "Register",
      operationId: "register",
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegistrationRequest",
            },
            example: {
              email: "test01@mail.com",
              name: "Test01",
              password: "A123456a",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Registration Successful",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegistrationResponse",
              },
            },
          },
        },
        400: {
          description: "Registration denied)",
          content: {},
        },

        409: {
          description: "Email in use...",
          content: {},
        },
        500: {
          description: "Server error",
          content: {},
        },
      },
    },
  },
  "/api/users/login": {
    post: {
      tags: ["User CRUD operations"],
      summary: "Login user",
      description: "Login",
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "test01@mail.com",
                },
                password: {
                  type: "string",
                  example: "A123456a",
                },
              },
            },
            example: {
              email: "test01@mail.com",
              password: "A123456a",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login Successful",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
        },
        401: {
          description: "Email or password is wrong",
          content: {},
        },

        500: {
          description: "Server error",
          content: {},
        },
      },
    },
  },
  "/api/users/refresh": {
    post: {
      tags: ["User CRUD operations"],
      summary: "Refresh token",
      description: "Refresh",
      parameters: [ ],
      security: [{ bearerAuth: [] }],
      requestBody: {},
      responses: {
        200: {
          description: "Refresh token successful",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshResponse",
              },
            },
          },
        },
        401: {
          description: "Email or password is wrong",
          content: {},
        },

        500: {
          description: "Server error",
          content: {},
        },
      },
    },
  },

  "/api/users/logout": {
    post: {
      tags: ["User CRUD operations"],
      summary: "Logout",
      description: "Logout",
      operationId: "logout",
      responses: {
        200: {
          description: "",
        },
      },
    },
  },

  "/api/users/current": {
    get: {
      tags: ["User CRUD operations"],
      summary: "Current",
      description: "Current",
      operationId: "current",
      responses: {
        200: {
          description: "",
        },
      },
    },
  },
  "/api/users/info": {
    patch: {
      tags: ["User CRUD operations"],
      summary: "Info",
      description: "Info",
      operationId: "info",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                birthday: {
                  type: "string",
                  example: "10-10-2020",
                },
                city: {
                  type: "string",
                  example: "Ukraine",
                },
                email: {
                  type: "string",
                  example: "test01@mail.com",
                },
                name: {
                  type: "string",
                  example: "Test01",
                },
                phone: {
                  type: "string",
                  example: "+380667778899",
                },
              },
            },
            example: {
              birthday: "10-10-2020",
              city: "Ukraine",
              email: "test01@mail.com",
              name: "Test01",
              phone: "+380667778899",
            },
          },
        },
      },
      responses: {
        200: {
          description: "",
        },
      },
    },
  },
  "/api/users/avatars": {
    patch: {
      tags: ["User CRUD operations"],
      summary: "Avatar",
      description: "Avatar",
      operationId: "avatar",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "",
        },
      },
    },
  },
};
