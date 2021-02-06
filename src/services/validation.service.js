const validateService = {

  requiredProperties: (object, ...properties) => {
    const validation = {
      message: "Invalid Payload",
      errors: [],
    }
    properties.forEach((prop) => {
      if (!object[prop]) {
        validation.errors.push({ property: prop, message: `The property '${prop}' is required` });
      }
    });
    return validation;
  },

};

module.exports = validateService;
