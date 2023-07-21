const securitySchemes = require("./securitySchemes");
const schemas = require("./schemas");
module.exports = {
  components: {
    ...schemas,
    ...securitySchemes,
  },
};
