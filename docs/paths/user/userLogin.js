module.exports = {
  "/api/users/login": {
    post: {
      tags: ["User CRUD operations"],
      summary: "Login user",
      parameters: [],
      // security: [{ Bearer: [] }],
      requestBody: {
        description: "Login's object",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
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
        400: {
          description: "Bad request (invalid request body)",
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
