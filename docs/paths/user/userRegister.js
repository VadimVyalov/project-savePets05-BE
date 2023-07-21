//const createTodo = require("../../components/schemas/");
module.exports = {
  "/api/users/register": {
    post: {
      tags: ["User CRUD operations"],
      summary: "Create a new user",
      parameters: [],
      // security: [{ Bearer: [] }],
      requestBody: {
        description: "Registration's object",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegistrationRequest",
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
          description: "Bad request (invalid request body)",
          content: {},
        },
        409: {
          description: "This email is already in use",
          content: {},
        },
        500: {
          description: "Server error",
          content: {},
        },
      },
    },
  },
};
