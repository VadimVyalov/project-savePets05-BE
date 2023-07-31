const securitySchemes = require("./securitySchemes");
const user = require("./user");
module.exports = {
  components: {
    schemas: { ...user },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
